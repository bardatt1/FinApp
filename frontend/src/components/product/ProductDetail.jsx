import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductDetail({ product }) {
    if (!product) return <div>Product not found.</div>;
    const { name, price, imageUrl, description, category } = product;

    return (
        <div className="product-detail page">
            <div className="product-detail-inner">
                <div className="product-detail-media">
                    <img src={imageUrl || '/placeholder.png'} alt={name} />
                </div>
                <div className="product-detail-info">
                    <h1>{name}</h1>
                    <p className="product-category">{category}</p>
                    <p className="product-price">${Number(price || 0).toFixed(2)}</p>
                    <p className="product-desc">{description}</p>
                    <div className="product-actions">
                        <button className="btn">Add to cart</button>
                        <Link to="/shop" className="btn btn-link">Back to shop</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}