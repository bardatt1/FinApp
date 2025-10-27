import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // Image path convention:
  // Place product images in: public/images/products/
  // Use product.image as filename (e.g. "phone.jpg") and reference: /images/products/{product.image}
  // If product.image is an absolute URL, that will work too.
  const imageSrc = product.image ? `/images/products/${product.image}` : '/images/products/placeholder.png';

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-card__img">
          <img src={imageSrc} alt={product.name} />
        </div>
        <div className="product-card__info">
          <h4 className="product-card__title">{product.name}</h4>
          <p className="product-card__category">{product.category}</p>
          <div className="product-card__price">${product.price?.toFixed(2)}</div>
        </div>
      </Link>
    </div>
  );
}