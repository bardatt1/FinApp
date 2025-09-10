import React from 'react';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">BUSINESS NAME</div>
        <nav className="main-nav" aria-label="Main">
          <a href="#browse">Browse</a>
          <a href="#pricing">Pricing</a>
          <a href="#how">How it works</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;


