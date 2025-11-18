import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], loading, error }) {
    if (loading) return <div>Loading products...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!products || products.length === 0) return <div>No products found.</div>;

    return (
        <div className="product-grid">
            {products.map((p) => (
                <ProductCard key={p.id || p._id} product={p} />
            ))}
        </div>
    );
}