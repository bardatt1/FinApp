import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart, loading, refreshCart } = useCart();
  const [updating, setUpdating] = useState(null);

  // Force refresh cart when cart page loads
  const { user } = useAuth();
  
  useEffect(() => {
    // Always refresh cart when cart page loads to ensure it's up to date
    if (user?.id && localStorage.getItem('token')) {
      console.log('CartPage: Force refreshing cart on mount');
      const timer = setTimeout(() => {
        refreshCart();
      }, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  if (loading && cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty!</p>
            <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-items">
          {cartItems.map(item => {
            const isUpdating = updating === item.product.id;
            const handleUpdateQuantity = async (newQuantity) => {
              setUpdating(item.product.id);
              try {
                await updateQuantity(item.product.id, newQuantity);
              } catch (error) {
                console.error('Failed to update quantity:', error);
              } finally {
                setUpdating(null);
              }
            };

            const handleRemove = async () => {
              setUpdating(item.product.id);
              try {
                await removeFromCart(item.product.id);
              } catch (error) {
                console.error('Failed to remove item:', error);
              } finally {
                setUpdating(null);
              }
            };

            return (
              <div key={item.product.id} className="cart-item">
                <Link to={`/product/${item.product.id}`}>
                  <img 
                    src={item.product.imageUrl || item.product.image || '/placeholder.svg'} 
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = '/placeholder.svg';
                    }}
                  />
                </Link>
                <div className="item-details">
                  <Link to={`/product/${item.product.id}`}>
                    <h3>{item.product.name}</h3>
                  </Link>
                  <p className="item-price">${(item.product.price || 0).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleUpdateQuantity(item.quantity - 1)}
                      disabled={item.quantity <= 1 || isUpdating}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.quantity + 1)}
                      disabled={isUpdating}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleRemove}
                    className="remove-btn"
                    disabled={isUpdating}
                  >
                    {isUpdating ? '...' : 'Remove'}
                  </button>
                </div>
                <div className="item-total">
                  ${((item.product.price || 0) * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
          </div>
          <div className="cart-actions">
            <button onClick={clearCart} className="btn-secondary">
              Clear Cart
            </button>
            <Link to="/checkout" className="btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
