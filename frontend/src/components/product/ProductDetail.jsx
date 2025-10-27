import React from 'react';

export default function ProductDetail({ product }) {
  if (!product) return <div>Product not found.</div>;

  const imageSrc = product.image ? `/images/products/${product.image}` : '/images/products/placeholder.png';

  return (
    <div className="product-detail">
      <div className="product-detail__media">
        <img src={imageSrc} alt={product.name} />
      </div>
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <p className="muted">{product.category}</p>
        <h2>${product.price?.toFixed(2)}</h2>
        <p>{product.description}</p>
        {/* Hook up Add to Cart / actions as needed */}
        <button className="btn">Add to cart</button>
      </div>
    </div>
  );
}