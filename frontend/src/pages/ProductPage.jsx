import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <main className="page product-page">
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} (${quantity}) added to cart!`);
  };

  return (
    <main className="page product-page">
      <div className="container">
        <div className="product-details">
          <div className="product-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category.name}</p>
            <p className="product-description">{product.description}</p>
            
            <div className="product-rating">
              ⭐ {product.rating} ({product.reviews} reviews)
            </div>
            
            <div className="product-price">
              ${product.price}
            </div>
            
            <div className="product-stock">
              Stock: {product.stock} available
            </div>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max={product.stock}
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn-primary add-to-cart"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
            
            <div className="product-navigation">
              <Link to="/shop" className="btn-secondary">Back to Shop</Link>
              <Link to="/cart" className="btn-secondary">View Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
