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
    if (!cartDto || !cartDto.items) return [];
    if (!Array.isArray(cartDto.items)) return [];
    
    const transformed = cartDto.items.map(item => {
      if (!item) return null;
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
    }).filter(item => item !== null);
    
    return transformed;
  }, []);

  // Load cart from backend or localStorage
  const fetchCart = useCallback(async (retryCount = 0) => {
    const savedToken = localStorage.getItem('token');
    const authenticated = savedToken && isAuthenticated();
    
    if (authenticated && savedToken) {
      try {
        setLoading(true);
        const cartDto = await cartService.getCart();
        let items = [];
        if (cartDto && cartDto.items) {
          items = transformCartItems(cartDto);
        } else if (Array.isArray(cartDto)) {
          items = cartDto;
        }
        setCartItems(items);
        localStorage.setItem('cart', JSON.stringify(items));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart from backend:', error);
        if (retryCount === 0 && (error.message.includes('Unauthorized') || error.message.includes('401'))) {
          setTimeout(() => {
            const tokenCheck = localStorage.getItem('token');
            if (tokenCheck && isAuthenticated()) {
              fetchCart(1);
            } else {
              setCartItems([]);
              setLoading(false);
            }
          }, 300);
          return;
        }
        setCartItems([]);
        setLoading(false);
      }
    } else {
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
  }, [transformCartItems, isAuthenticated]);

  const { user, token, loading: authLoading } = useAuth();
  const [previousUserId, setPreviousUserId] = useState(null);
  const [emptyCartRefetched, setEmptyCartRefetched] = useState(false);
  
  useEffect(() => {
    if (authLoading) {
      return;
    }
    
    const handleCartFetch = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const savedToken = localStorage.getItem('token');
      const currentUserId = user?.id;
      
      if (!savedToken || !user || !token) {
        if (previousUserId !== null) {
          setCartItems([]);
          localStorage.removeItem('cart');
          setInitialized(false);
          setPreviousUserId(null);
          setEmptyCartRefetched(false);
        } else if (!initialized) {
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
      
      if (savedToken && token) {
        if (!user?.id) {
          return;
        }
        
        const isNewLogin = previousUserId === null || previousUserId !== currentUserId;
        
        if (isNewLogin) {
          await fetchCart();
          setInitialized(true);
          setPreviousUserId(currentUserId);
        } else if (!initialized) {
          await fetchCart();
          setInitialized(true);
          setPreviousUserId(currentUserId);
        }
      }
    };
    
    handleCartFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id, token]);

  useEffect(() => {
    if (initialized && isAuthenticated() && user?.id && cartItems.length === 0 && !loading && !emptyCartRefetched) {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setEmptyCartRefetched(true);
        const timer = setTimeout(() => {
          fetchCart();
        }, 500);
        return () => clearTimeout(timer);
      }
    }
    if (previousUserId !== user?.id) {
      setEmptyCartRefetched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length, initialized, user?.id, previousUserId]);

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
        if (response && response.items) {
          const items = transformCartItems(response);
          setCartItems(items);
          localStorage.setItem('cart', JSON.stringify(items));
        } else {
          await fetchCart();
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
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
