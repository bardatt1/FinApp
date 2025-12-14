import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api/orderService';
import '../styles/checkout.css';

function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart, refreshCart, loading: cartLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    barangay: '',
    city: '',
    province: '',
    postalCode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    if (!cartLoading && cartItems.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, cartItems.length, cartLoading, navigate]);

  // Pre-fill user data if available
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        fullName: user.fullName || user.firstName || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = 'Full name must be less than 100 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Invalid email format';
      }
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Philippine phone number validation
      // Accepts: +639123456789, 09123456789, 9123456789, +6321234567, 021234567
      const phoneRegex = /^(\+63|0)?[9]\d{9}$|^(\+63|0)?[2-8]\d{8}$/;
      const cleanedPhone = formData.phone.trim().replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanedPhone)) {
        newErrors.phone = 'Please enter a valid Philippine phone number (e.g., +639123456789 or 09123456789)';
      }
    }
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    } else if (formData.streetAddress.trim().length > 200) {
      newErrors.streetAddress = 'Street address must be less than 200 characters';
    }
    if (!formData.barangay.trim()) {
      newErrors.barangay = 'Barangay is required';
    } else if (formData.barangay.trim().length > 100) {
      newErrors.barangay = 'Barangay must be less than 100 characters';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City/Municipality is required';
    } else if (formData.city.trim().length > 100) {
      newErrors.city = 'City/Municipality must be less than 100 characters';
    }
    if (!formData.province.trim()) {
      newErrors.province = 'Province is required';
    } else if (formData.province.trim().length > 100) {
      newErrors.province = 'Province must be less than 100 characters';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else {
      // Philippine postal code validation (4 digits)
      const postalRegex = /^\d{4}$/;
      if (!postalRegex.test(formData.postalCode.trim())) {
        newErrors.postalCode = 'Please enter a valid 4-digit Philippine postal code (e.g., 1000)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrderError('');
    
    if (!validateForm()) {
      return;
    }
    
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const order = await orderService.placeOrder(cartItems);
      
      // Clear cart from frontend state immediately
      clearCart();
      
      // Refresh cart from backend to ensure it's cleared there too
      // This ensures the cart count in navbar updates correctly
      // Small delay to ensure backend has processed the cart clearing
      setTimeout(() => {
        refreshCart();
      }, 200);
      
      // Redirect to profile page with order confirmation
      navigate(`/profile?order=${order.id}`);
    } catch (error) {
      // Sanitize error message
      if (process.env.NODE_ENV === 'development') {
        console.error('Error placing order:', error.message);
      }
      setOrderError('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartLoading || cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>{cartLoading ? 'Loading cart...' : 'Your cart is empty'}</p>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 10.00; // Fixed shipping cost
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        
        {orderError && (
          <div className="checkout-error">
            {orderError}
          </div>
        )}

        <div className="checkout-container">
          {/* Shipping Information Form */}
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                    required
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="e.g., +639123456789 or 09123456789"
                    required
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                  <small style={{ display: 'block', marginTop: '0.25rem', color: '#666' }}>
                    Philippine mobile or landline number
                  </small>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="streetAddress">Street Address *</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className={errors.streetAddress ? 'error' : ''}
                  placeholder="e.g., 123 Main Street, Building Name"
                  required
                />
                {errors.streetAddress && <span className="error-message">{errors.streetAddress}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="barangay">Barangay *</label>
                <input
                  type="text"
                  id="barangay"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  className={errors.barangay ? 'error' : ''}
                  placeholder="e.g., Barangay Poblacion"
                  required
                />
                {errors.barangay && <span className="error-message">{errors.barangay}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City/Municipality *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                    placeholder="e.g., Manila, Quezon City"
                    required
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="province">Province *</label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className={errors.province ? 'error' : ''}
                    placeholder="e.g., Metro Manila, Laguna, Cebu"
                    required
                  />
                  {errors.province && <span className="error-message">{errors.province}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={errors.postalCode ? 'error' : ''}
                    placeholder="e.g., 1000"
                    maxLength="4"
                    required
                  />
                  {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <small style={{ color: '#666' }}>
                  <strong>Country:</strong> Philippines (default)
                </small>
              </div>

              <button 
                type="submit" 
                className="checkout-submit-btn"
                disabled={submitting}
              >
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary-section">
            <h2>Order Summary</h2>
            
            <div className="order-items-list">
              {cartItems.map(item => (
                <div key={item.product.id} className="order-item-row">
                  <div className="order-item-info">
                    <img 
                      src={item.product.imageUrl || item.product.image || '/placeholder.svg'} 
                      alt={item.product.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="order-item-price">
                    ${((item.product.price || 0) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

