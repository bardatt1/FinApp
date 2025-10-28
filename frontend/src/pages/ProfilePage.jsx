import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/mockData';

function ProfilePage() {
  const { user, logout } = useAuth();
  const userOrders = mockOrders.filter(order => order.userId === user?.id);

  return (
    <div className="page profile-page">
      <div className="container">
        <h1>Profile</h1>
        
        <div className="profile-content">
          <div className="profile-info">
            <h2>Account Information</h2>
            <div className="info-card">
              <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
            </div>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>
          
          <div className="order-history">
            <h2>Order History</h2>
            {userOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div className="orders-list">
                {userOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h3>Order #{order.id}</h3>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="order-date">Ordered on: {order.orderDate}</p>
                    <p className="order-total">Total: ${order.totalAmount}</p>
                    <div className="order-items">
                      <h4>Items:</h4>
                      {order.items.map((item, index) => (
                        <p key={index}>
                          {item.product.name} x {item.quantity}
                        </p>
                      ))}
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
