import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand"><Link to="/">FinApp</Link></div>
        <div className="nav-links">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
