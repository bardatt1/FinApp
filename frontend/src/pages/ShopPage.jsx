import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockProducts, mockCategories } from '../data/mockData';

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(product => product.category.name === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <main className="page shop-page">
      <h1>Shop</h1>
      
      <div className="shop-layout">
        <div className="shop-filters">
          <h3>Filter by Category:</h3>
          <div className="category-filters">
            <button 
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {mockCategories.map(category => (
              <button
                key={category.id}
                className={selectedCategory === category.name ? 'active' : ''}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="shop-content">
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-rating">⭐ {product.rating} ({product.reviews} reviews)</p>
                <p className="product-stock">Stock: {product.stock}</p>
                <div className="product-actions">
                  <Link to={`/products/${product.id}`} className="btn-secondary">
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary"
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ShopPage;
