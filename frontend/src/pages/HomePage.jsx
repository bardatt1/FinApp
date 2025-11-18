import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/ui/Banner';
import CategoryCard from '../components/ui/CategoryCard';
import { mockCategories } from '../data/mockData';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';

function HomePage() {
  const { products, loading, error } = useProducts();
  const featuredProducts = (products || []).slice(0, 8);
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = 280 + 32; // card width + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  return (
    <main className="page home-page">
      <header className="home-hero">
        <h1>Welcome to FinApp Shop</h1>
        <p>Discover products curated for you</p>
        <Link to="/shop" className="btn">Shop all</Link>
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

      <section className="featured-products">
        <h2>Featured Products</h2>
        
        <div className="products-scroll-container">
          <div className="products-scroll" ref={scrollRef}>
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-rating">⭐ {product.rating} ({product.reviews} reviews)</p>
                <div className="product-actions">
                  <Link to={`/products/${product.id}`} className="view-product-btn">
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicators">
          {featuredProducts.map((_, index) => (
            <div
              key={index}
              className={`scroll-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>

        <div className="view-all">
          <Link to="/shop" className="btn-primary">View All Products</Link>
        </div>
      </section>

      <section className="home-featured">
        <h2>Featured products</h2>
        <ProductGrid products={featuredProducts} loading={loading} error={error} />
      </section>
    </main>
  );
}

export default HomePage;
