import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/shop');
  };

  const handleShopCollection = () => {
    navigate('/shop');
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%201-Mh6COknUw9YylXJOr3ozA7DnM2p0Sf.png" 
            alt="FinApp Logo" 
            width={40}
            height={40}
          />
          <span>FinApp</span>
        </Link>
        <ul className="nav-links">
          <li><a href="#collections">Collections</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <button className="cta-button" onClick={handleShopNow}>Shop Now</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Elevate Your <span className="highlight">Style</span>
          </h1>
          <p>
            Discover premium apparel that combines cutting-edge design with exceptional comfort. Our curated collections bring you the finest in modern fashion.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleShopCollection}>Shop Collection</button>
            <button className="btn-secondary" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/premium-apparel-collection.jpg" alt="Premium apparel collection" />
        </div>
      </section>

      {/* Featured Collections */}
      <section className="collections" id="collections">
        <h2 className="section-title">Featured Collections</h2>
        <p className="section-subtitle">Explore our latest and most beloved pieces</p>
        
        <div className="collection-grid">
          <div className="collection-card">
            <div className="collection-image">👕</div>
            <div className="collection-content">
              <h3>Essential Basics</h3>
              <p>Timeless pieces for everyday wear</p>
              <a href="#shop" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>Explore Collection →</a>
            </div>
          </div>

          <div className="collection-card">
            <div className="collection-image">🧥</div>
            <div className="collection-content">
              <h3>Premium Outerwear</h3>
              <p>Statement layers for every season</p>
              <a href="#shop" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>Explore Collection →</a>
            </div>
          </div>

          <div className="collection-card">
            <div className="collection-image">🎽</div>
            <div className="collection-content">
              <h3>Active Wear</h3>
              <p>Performance meets style</p>
              <a href="#shop" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>Explore Collection →</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-content">
          <div className="about-image">
            <img src="/luxury-fashion-studio-workspace.jpg" alt="About FinApp" />
          </div>
          <div className="about-text">
            <h2>Crafted for Excellence</h2>
            <p>
              At FinApp, we believe that great apparel is more than just clothing—it's a reflection of who you are. Each piece in our collection is carefully selected and designed to inspire confidence and comfort.
            </p>
            <p>
              With over a decade of fashion expertise, we combine traditional craftsmanship with modern innovation to bring you products you'll love wearing.
            </p>
            
            <div className="features">
              <div className="feature">
                <h4>Premium Quality</h4>
                <p>Sourced from the finest materials worldwide</p>
              </div>
              <div className="feature">
                <h4>Sustainable</h4>
                <p>Committed to ethical and eco-conscious production</p>
              </div>
              <div className="feature">
                <h4>Expert Design</h4>
                <p>Created by award-winning fashion designers</p>
              </div>
              <div className="feature">
                <h4>Perfect Fit</h4>
                <p>Tailored sizing for all body types</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bottom">
          <p>&copy; 2025 FinApp Apparel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

