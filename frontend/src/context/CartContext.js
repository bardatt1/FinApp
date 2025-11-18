import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '../services/api/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { isAuthenticated } = useAuth();

  // Transform backend cart format to frontend format
  const transformCartItems = useCallback((cartDto) => {
    if (!cartDto) {
      console.warn('CartDto is null or undefined');
      return [];
    }
    if (!cartDto.items) {
      console.warn('CartDto.items is missing, cartDto:', cartDto);
      return [];
    }
    if (!Array.isArray(cartDto.items)) {
      console.warn('CartDto.items is not an array:', cartDto.items);
      return [];
    }
    
    const transformed = cartDto.items.map(item => {
      if (!item) {
        console.warn('Cart item is null or undefined');
        return null;
      }
      return {
        product: {
          id: item.productId,
          name: item.name || 'Unknown Product',
          price: item.price || 0,
          category: item.category || null,
          imageUrl: item.imageUrl || null
        },
        quantity: item.quantity || 0
      };
    }).filter(item => item !== null); // Remove any null items
    
    return transformed;
  }, []);

  // Load cart from backend or localStorage
  const fetchCart = useCallback(async (retryCount = 0) => {
    // Check if token exists in localStorage (more reliable than context)
    const savedToken = localStorage.getItem('token');
    const authenticated = savedToken && isAuthenticated();
    
    if (authenticated && savedToken) {
      try {
        setLoading(true);
        console.log('Fetching cart from backend...');
        const cartDto = await cartService.getCart();
        console.log('Cart response from backend:', cartDto);
        
        // Handle both CartDto format and direct response
        let items = [];
        if (cartDto && cartDto.items) {
          items = transformCartItems(cartDto);
          console.log('Transformed cart items:', items);
        } else if (Array.isArray(cartDto)) {
          // If response is already an array (shouldn't happen, but handle it)
          items = cartDto;
        }
        
        console.log('Setting cart items:', items);
        setCartItems(items);
        // Also save to localStorage as backup
        localStorage.setItem('cart', JSON.stringify(items));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart from backend:', error);
        // Retry once if it's an auth error and we haven't retried yet
        if (retryCount === 0 && (error.message.includes('Unauthorized') || error.message.includes('401'))) {
          // Wait a bit and retry (token might not be fully set yet)
          setTimeout(() => {
            const tokenCheck = localStorage.getItem('token');
            if (tokenCheck && isAuthenticated()) {
              fetchCart(1);
            } else {
              setCartItems([]);
              setLoading(false);
            }
          }, 300);
          // Keep loading true for retry
          return;
        }
        // Don't fallback to localStorage for authenticated users
        // If fetch fails, cart should be empty
        setCartItems([]);
        setLoading(false);
      }
    } else {
      // Not authenticated, use localStorage only
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [transformCartItems, isAuthenticated]); // Include isAuthenticated in deps

  // Reload cart when authentication state changes
  const { user, token, loading: authLoading } = useAuth();
  
  // Track previous user ID to detect user changes
  const [previousUserId, setPreviousUserId] = useState(null);
  // Track if we've already tried to refetch empty cart to prevent infinite loops
  const [emptyCartRefetched, setEmptyCartRefetched] = useState(false);
  
  // Handle cart fetching on auth state changes
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }
    
    const handleCartFetch = async () => {
      // Wait a bit to ensure token is in localStorage
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const savedToken = localStorage.getItem('token');
      const currentUserId = user?.id;
      
      // User logged out - clear cart
      if (!savedToken || !user || !token) {
        if (previousUserId !== null) {
          // User was logged in before, now logged out
          setCartItems([]);
          localStorage.removeItem('cart');
          setInitialized(false);
          setPreviousUserId(null);
          setEmptyCartRefetched(false); // Reset refetch flag on logout
        } else if (!initialized) {
          // Not authenticated and not initialized - load from localStorage
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            try {
              setCartItems(JSON.parse(savedCart));
            } catch (error) {
              console.error('Error loading cart from localStorage:', error);
              setCartItems([]);
            }
          }
          setInitialized(true);
        }
        return;
      }
      
      // User is authenticated - ALWAYS fetch cart if user ID is available
      if (savedToken && token && user?.id) {
        // Check if this is a new user login (user ID changed or first login)
        const isNewLogin = previousUserId === null || previousUserId !== currentUserId;
        
        // ALWAYS fetch on new login - this is the key fix
        // Also fetch if not initialized yet
        // Also fetch if cart is empty (might have items in DB that weren't loaded)
        const shouldFetch = isNewLogin || !initialized || cartItems.length === 0;
        
        if (shouldFetch) {
          console.log('Fetching cart for user:', currentUserId, 'isNewLogin:', isNewLogin, 'initialized:', initialized, 'cartItems.length:', cartItems.length);
          try {
            await fetchCart();
            setInitialized(true);
            setPreviousUserId(currentUserId);
          } catch (error) {
            console.error('Failed to fetch cart:', error);
            // Don't set initialized if fetch failed, so it will retry
          }
        } else {
          console.log('Skipping cart fetch - same user, already initialized, cart has items');
        }
      } else if (savedToken && token && !user?.id) {
        // Token exists but user data not loaded yet - wait for it
        console.log('Waiting for user data to load...');
      }
    };
    
    handleCartFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, token]); // fetchCart is stable, don't include it

  // Refetch cart if it's empty but user is authenticated (cart might have items in DB)
  useEffect(() => {
    if (initialized && isAuthenticated() && user?.id && cartItems.length === 0 && !loading && !emptyCartRefetched) {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        console.log('Cart is empty but user is authenticated - refetching cart once');
        setEmptyCartRefetched(true); // Prevent infinite refetches
        const timer = setTimeout(() => {
          fetchCart();
        }, 500);
        return () => clearTimeout(timer);
      }
    }
    // Reset flag when user changes
    if (previousUserId !== user?.id) {
      setEmptyCartRefetched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length, initialized, user?.id, previousUserId]); // Watch cartItems.length

  // Save cart to localStorage whenever cart changes (for unauthenticated users)
  useEffect(() => {
    if (!isAuthenticated() && initialized) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, initialized]);

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated()) {
      try {
        setLoading(true);
        const response = await cartService.addItem(product.id, quantity);
        // Use the response directly - it contains the updated cart
        if (response && response.items) {
          const items = transformCartItems(response);
          setCartItems(items);
          localStorage.setItem('cart', JSON.stringify(items));
        } else {
          // Fallback to fetching if response format is unexpected
          await fetchCart();
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      // Not authenticated, use localStorage
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.product.id === product.id);
        
        if (existingItem) {
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevItems, { product, quantity }];
        }
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated()) {
      try {
        setLoading(true);
        const response = await cartService.removeItem(productId);
        // Use the response directly
        if (response && response.items) {
          const items = transformCartItems(response);
          setCartItems(items);
          localStorage.setItem('cart', JSON.stringify(items));
        } else {
          await fetchCart();
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated()) {
      try {
        setLoading(true);
        const response = await cartService.updateItem(productId, quantity);
        // Use the response directly
        if (response && response.items) {
          const items = transformCartItems(response);
          setCartItems(items);
          localStorage.setItem('cart', JSON.stringify(items));
        } else {
          await fetchCart();
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItem = (productId) => {
    return cartItems.find(item => item.product.id === productId);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartItem,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
