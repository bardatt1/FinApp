import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount, refreshCart } = useCart();
  const navigate = useNavigate();

  // Refresh cart when user is authenticated to ensure count is accurate
  useEffect(() => {
    if (user?.id && localStorage.getItem('token')) {
      console.log('Navbar: Refreshing cart count');
      const timer = setTimeout(() => {
        refreshCart();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [user?.id, refreshCart]); // Refresh when user changes or refreshCart function changes

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%201-Mh6COknUw9YylXJOr3ozA7DnM2p0Sf.png" 
            alt="FinApp Logo" 
            width={40}
            height={40}
          />
          <span>FinApp</span>
        </Link>
        <div className="nav-links">
          <Link to="/shop">Shop</Link>
          
          {isAuthenticated() ? (
            <>
              <Link to="/cart" className="cart-link">
                Cart ({getCartItemsCount()})
              </Link>
              <Link to="/profile">Profile</Link>
              {user?.role === 'ADMIN' && (
                <Link to="/admin/products">Admin</Link>
              )}
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
