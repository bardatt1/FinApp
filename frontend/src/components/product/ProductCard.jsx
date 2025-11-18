import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    if (!product) return null;
    const { id, name, price, imageUrl, category, description } = product;

    return (
        <div className="product-card">
            <Link to={`/product/${id}`} className="product-image-link">
                <img src={imageUrl || '/placeholder.png'} alt={name} className="product-image" />
            </Link>
            <div className="product-body">
                <h3 className="product-title">
                    <Link to={`/product/${id}`}>{name}</Link>
                </h3>
                <p className="product-category">{category}</p>
                <p className="product-desc">{description?.slice(0, 80)}</p>
                <div className="product-meta">
                    <strong className="product-price">${Number(price || 0).toFixed(2)}</strong>
                    <Link to={`/product/${id}`} className="btn btn-sm">View</Link>
                </div>
            </div>
        </div>
    );
}