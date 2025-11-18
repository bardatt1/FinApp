import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    // Add your API call here using Axios
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%201-Mh6COknUw9YylXJOr3ozA7DnM2p0Sf.png" alt="FinApp Logo" />
          <span>FinApp</span>
        </Link>
        <ul className="nav-links">
          <li><a href="#collections">Collections</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="cta-button">Shop Now</button>
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
            <button className="btn-primary">Shop Collection</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/premium-apparel-fashion-model.jpg" alt="Premium apparel collection" />
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
              <a href="#shop">Explore Collection →</a>
            </div>
          </div>

          <div className="collection-card">
            <div className="collection-image">🧥</div>
            <div className="collection-content">
              <h3>Premium Outerwear</h3>
              <p>Statement layers for every season</p>
              <a href="#shop">Explore Collection →</a>
            </div>
          </div>

          <div className="collection-card">
            <div className="collection-image">🎽</div>
            <div className="collection-content">
              <h3>Active Wear</h3>
              <p>Performance meets style</p>
              <a href="#shop">Explore Collection →</a>
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

        {/* Newsletter */}
        <div className="newsletter">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive offers and new collection launches</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About</h3>
            <ul>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Shop</h3>
            <ul>
              <li><a href="#mens">Mens</a></li>
              <li><a href="#womens">Womens</a></li>
              <li><a href="#accessories">Accessories</a></li>
              <li><a href="#sale">Sale</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookie">Cookie Policy</a></li>
              <li><a href="#disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FinApp Apparel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
