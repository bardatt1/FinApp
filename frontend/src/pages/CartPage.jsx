import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

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
          {cartItems.map(item => (
            <div key={item.product.id} className="cart-item">
              <img src={item.product.imageUrl} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p className="item-price">${item.product.price}</p>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
              <div className="item-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
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
