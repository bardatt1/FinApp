import React from 'react';
import ProductCard from './ProductCard';
import '../../styles/product-grid.css';

function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default React.memo(ProductGrid);