import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/product-detail.css';

export default function ProductDetail({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!product) return <div className="product-detail-error">Product not found.</div>;
    
    const { name, price, imageUrl, image, description, category, inStock } = product;
    const productImage = image || imageUrl || '/placeholder.png';
    const isInStock = inStock !== undefined ? inStock : true;

    const handleAddToCart = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        if (!isInStock) return;

        setAdding(true);
        try {
            await addToCart(product, quantity);
            // Could add toast notification here
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setAdding(false);
        }
    };

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                {/* Image Section */}
                <div className="product-detail-image-section">
                    <div className="product-image-wrapper-detail">
                        <img 
                            src={productImage} 
                            alt={name}
                            className="product-detail-image"
                        />
                        {!isInStock && (
                            <div className="out-of-stock-badge">Out of Stock</div>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className="product-detail-info-section">
                    <div className="product-breadcrumb">
                        <Link to="/shop">Shop</Link>
                        <span> / </span>
                        <span>{category || 'Product'}</span>
                    </div>

                    <h1 className="product-detail-title">{name}</h1>
                    
                    {category && (
                        <p className="product-detail-category">{category}</p>
                    )}

                    <div className="product-detail-price">
                        ${Number(price || 0).toFixed(2)}
                    </div>

                    {description && (
                        <div className="product-detail-description">
                            <h3>Description</h3>
                            <p>{description}</p>
                        </div>
                    )}

                    {isInStock ? (
                        <div className="product-detail-actions">
                            <div className="quantity-selector-detail">
                                <label>Quantity</label>
                                <div className="quantity-controls-detail">
                                    <button 
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="quantity-btn"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="quantity-input"
                                    />
                                    <button 
                                        onClick={() => handleQuantityChange(1)}
                                        className="quantity-btn"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button 
                                className="add-to-cart-btn-detail"
                                onClick={handleAddToCart}
                                disabled={adding}
                            >
                                {adding ? 'Adding to Cart...' : 'Add to Cart'}
                            </button>
                        </div>
                    ) : (
                        <div className="product-out-of-stock-message">
                            <p>This product is currently out of stock.</p>
                        </div>
                    )}

                    <div className="product-detail-footer">
                        <Link to="/shop" className="back-to-shop-link">
                            ← Back to Shop
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}