import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api/orderService';
import ConfirmModal from '../components/ui/ConfirmModal';
import '../styles/profile.css';

function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await orderService.getMyOrders();
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PLACED':
        return '#ffa500';
      case 'SHIPPED':
        return '#2196F3';
      case 'DELIVERED':
        return '#4CAF50';
      case 'CANCELLED':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const handleCancelOrderClick = (orderId) => {
    setOrderToCancel(orderId);
    setCancelModalOpen(true);
  };

  const handleCancelOrderConfirm = async () => {
    if (!orderToCancel) return;

    try {
      setCancellingOrderId(orderToCancel);
      setCancelModalOpen(false);
      await orderService.cancelOrder(orderToCancel);
      
      // Refresh orders list
      const ordersData = await orderService.getMyOrders();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err) {
      console.error('Error cancelling order:', err);
      setError(err.message || 'Failed to cancel order. Please try again.');
    } finally {
      setCancellingOrderId(null);
      setOrderToCancel(null);
    }
  };

  const handleCancelModalClose = () => {
    setCancelModalOpen(false);
    setOrderToCancel(null);
  };

  const canCancelOrder = (status) => {
    return status?.toUpperCase() === 'PLACED';
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-container">
          {/* User Details Section */}
          <div className="profile-details-section">
            <div className="profile-card">
              <h2>Account Information</h2>
              
              <div className="profile-info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <div className="info-value">{user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}</div>
                </div>
                
                <div className="info-item">
                  <label>Email</label>
                  <div className="info-value">{user.email || 'N/A'}</div>
                </div>
                
                <div className="info-item">
                  <label>Role</label>
                  <div className="info-value role-badge">{user.role || 'USER'}</div>
                </div>
              </div>

              <div className="profile-actions">
                <Link to="/profile/change-password" className="btn-change-password">
                  Change Password
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="profile-orders-section">
            <div className="profile-card">
              <h2>My Orders</h2>
              
              {loading ? (
                <div className="orders-loading">
                  <p>Loading orders...</p>
                </div>
              ) : error ? (
                <div className="orders-error">
                  <p>Error: {error}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="orders-empty">
                  <p>You haven't placed any orders yet.</p>
                  <Link to="/shop" className="btn-shop-now">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3 className="order-date">{formatDate(order.createdAt)}</h3>
                        </div>
                        <div className="order-status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                          {order.status || 'PLACED'}
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              <div className="order-item-info">
                                <span className="order-item-name">{item.name || 'Product'}</span>
                                <span className="order-item-quantity">Qty: {item.quantity}</span>
                              </div>
                              <div className="order-item-price">
                                ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No items in this order</p>
                        )}
                      </div>
                      
                      <div className="order-footer">
                        <div className="order-total">
                          <span>Total:</span>
                          <span className="total-amount">${(order.total || 0).toFixed(2)}</span>
                        </div>
                        {canCancelOrder(order.status) && (
                          <button
                            onClick={() => handleCancelOrderClick(order.id)}
                            disabled={cancellingOrderId === order.id}
                            className="btn-cancel-order"
                          >
                            {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel Order'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Confirmation Modal */}
      <ConfirmModal
        isOpen={cancelModalOpen}
        onClose={handleCancelModalClose}
        onConfirm={handleCancelOrderConfirm}
        title="Cancel Order"
        message={[
          "Are you sure you want to cancel this order?",
          "This action cannot be undone. Once cancelled, you will not be able to retrieve or modify this order."
        ]}
        confirmText="Yes, Cancel Order"
        cancelText="Keep Order"
        type="danger"
      />
    </div>
  );
}

export default ProfilePage;
