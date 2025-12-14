import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/product-card.css';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  // Support both 'image' and 'imageUrl' for compatibility
  const productImage = product.image || product.imageUrl || "/placeholder.svg";
  const inStock = product.inStock !== undefined ? product.inStock : (product.stock > 0);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!inStock) return;

    setAdding(true);
    try {
      await addToCart(product, 1);
      // Show success feedback (could add toast notification here)
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!inStock) return;

    setAdding(true);
    try {
      await addToCart(product, 1);
      // Show success feedback
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img 
            src={productImage} 
            alt={product.name}
            className="product-image"
          />
        </Link>
        {!inStock && <span className="out-of-stock">Out of Stock</span>}
        {inStock && (
          <button 
            className="quick-add-btn" 
            onClick={handleQuickAdd}
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Quick Add'}
          </button>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        {product.rating && (
          <div className="product-rating">
            <span className="stars">{'★'.repeat(Math.floor(product.rating))} </span>
            <span className="rating-text">{product.rating} ({product.reviews || 0})</span>
          </div>
        )}

        <div className="product-footer">
          <span className="product-price">${(product.price || 0).toFixed(2)}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={adding || !inStock}
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);