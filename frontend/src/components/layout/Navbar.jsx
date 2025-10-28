import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand"><Link to="/">FinApp</Link></div>
        <div className="nav-links">
          <Link to="/shop">Shop</Link>
          
          {isAuthenticated() ? (
            <>
              <Link to="/cart" className="cart-link">
                Cart ({getCartItemsCount()})
              </Link>
              <Link to="/profile">Profile</Link>
              <span className="user-info">
                Welcome, {user?.firstName}!
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
