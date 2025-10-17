import React from 'react';

function FeatureCard({ title }) {
  return (
    <article className="product-card">
      <h3 className="product-title">{title}</h3>
      <div className="product-image" aria-hidden="true" />
      <p className="product-desc">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.
      </p>
      <div className="product-actions">
        <button className="btn primary">Explore</button>
      </div>
    </article>
  );
}

function FeatureGrid() {
  return (
    <section id="browse" className="features" aria-label="Browse products">
      <div className="container features-grid">
        <FeatureCard title="Product 1" />
        <FeatureCard title="Product 2" />
        <FeatureCard title="Product 3" />
      </div>
    </section>
  );
}

export default FeatureGrid;


