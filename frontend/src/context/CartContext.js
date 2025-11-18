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
  const { isAuthenticated } = useAuth();

  // Transform backend cart format to frontend format
  const transformCartItems = useCallback((cartDto) => {
    if (!cartDto || !cartDto.items) return [];
    return cartDto.items.map(item => ({
      product: {
        id: item.productId,
        name: item.name,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl || null
      },
      quantity: item.quantity
    }));
  }, []);

  // Load cart from backend or localStorage
  const fetchCart = useCallback(async () => {
    const authenticated = isAuthenticated();
    if (authenticated) {
      try {
        setLoading(true);
        const cartDto = await cartService.getCart();
        const items = transformCartItems(cartDto);
        setCartItems(items);
        // Also save to localStorage as backup
        localStorage.setItem('cart', JSON.stringify(items));
      } catch (error) {
        console.error('Error fetching cart from backend:', error);
        // Fallback to localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            const localItems = JSON.parse(savedCart);
            setCartItems(localItems);
          } catch (e) {
            console.error('Error loading cart from localStorage:', e);
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Not authenticated, use localStorage only
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, [transformCartItems]); // isAuthenticated is called inside, not in deps

  // Reload cart when authentication state changes
  const { user, token } = useAuth();
  
  // Load cart on mount and when user/token changes
  useEffect(() => {
    // Clear cart when user changes (different user = different cart)
    if (user?.id) {
      setCartItems([]);
      fetchCart();
    } else {
      // User logged out, clear cart
      setCartItems([]);
      localStorage.removeItem('cart');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token]); // Reload when user or token changes
  
  // Also fetch cart on initial mount if user is already authenticated
  useEffect(() => {
    if (isAuthenticated() && cartItems.length === 0 && !loading) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Save cart to localStorage whenever cart changes (for unauthenticated users)
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

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
