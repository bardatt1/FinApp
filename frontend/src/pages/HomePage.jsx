import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/ui/Banner';
import CategoryCard from '../components/ui/CategoryCard';
import { mockCategories, mockProducts } from '../data/mockData';

function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <main className="page home-page">
      <header className="hero">
        <h1>Welcome to FinApp Shop</h1>
        <p>Find the best products curated for you.</p>
      </header>

      <Banner />
      
      <div style={{ marginTop: 24 }}>
        <div className="category-grid">
          {mockCategories.map(category => (
            <CategoryCard
              key={category.id}
              name={category.name}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </div>

      <section className="section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-rating">⭐ {product.rating} ({product.reviews} reviews)</p>
              <Link to={`/products/${product.id}`} className="view-product-btn">
                View Product
              </Link>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/shop" className="btn-primary">View All Products</Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
