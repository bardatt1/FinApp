import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], loading }) {
  if (loading) return <div>Loading products...</div>;
  if (!products.length) return <div>No products found.</div>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}