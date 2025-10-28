import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/mockData';

function ProfilePage() {
  const { user, logout } = useAuth();
  const userOrders = mockOrders.filter(order => order.userId === user?.id);

  return (
    <div className="page profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account and view your order history</p>
        </div>
        
        <div className="profile-content">
          <div className="profile-info">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <h2>{user?.firstName} {user?.lastName}</h2>
              <p className="user-role">{user?.role}</p>
            </div>
            
            <div className="info-card">
              <h3>Account Information</h3>
              <div className="info-item">
                <span className="info-label">Full Name:</span>
                <span className="info-value">{user?.firstName} {user?.lastName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Type:</span>
                <span className="info-value">{user?.role}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">January 2024</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="btn-secondary">
                Edit Profile
              </button>
              <button onClick={logout} className="btn-primary logout-btn">
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="order-history">
            <div className="section-header">
              <h2>Order History</h2>
              <p>Track your recent purchases and orders</p>
            </div>
            
            {userOrders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No Orders Yet</h3>
                <p>You haven't placed any orders yet. Start shopping to see your order history here.</p>
                <a href="/shop" className="btn-primary">Start Shopping</a>
              </div>
            ) : (
              <div className="orders-list">
                {userOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.id}</h3>
                        <p className="order-date">Ordered on {order.orderDate}</p>
                      </div>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="order-content">
                      <div className="order-items">
                        <h4>Items Ordered:</h4>
                        <div className="items-list">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              <span className="item-name">{item.product.name}</span>
                              <span className="item-quantity">x {item.quantity}</span>
                              <span className="item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="order-summary">
                        <div className="order-total">
                          <span>Total Amount:</span>
                          <span className="total-price">${order.totalAmount}</span>
                        </div>
                        <div className="shipping-info">
                          <h4>Shipping Address:</h4>
                          <p>
                            {order.shippingAddress.street}<br/>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br/>
                            {order.shippingAddress.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="order-actions">
                      <button className="btn-secondary">Track Order</button>
                      <button className="btn-secondary">Reorder</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
