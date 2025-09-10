import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#browse">What’s More?</a>
            <a className="btn secondary" href="#contact">Contact us!</a>
          </div>
        </div>
        <div className="hero-graphic" aria-label="Graphics placeholder">
          <span>(Graphics)</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;


