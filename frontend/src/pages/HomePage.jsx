import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/ui/Banner';
import CategoryCard from '../components/ui/CategoryCard';
import { productService } from '../services/api/productService';
import ProductGrid from '../components/product/ProductGrid';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    const categorySet = new Set();
    products.forEach(p => {
      if (p.category) categorySet.add(p.category);
    });
    return Array.from(categorySet).map((cat, idx) => ({
      id: idx + 1,
      name: cat,
      description: `${cat} collection`,
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
    }));
  }, [products]);

  const featuredProducts = products.slice(0, 8).map(product => ({
    ...product,
    image: product.imageUrl || product.image,
    inStock: true,
    rating: 4.5, // Default rating since API doesn't provide it
    reviews: 0
  }));

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
      
      {categories.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div className="category-grid">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                name={category.name}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        </div>
      )}

      <section className="featured-products">
        <h2>Featured Products</h2>
        
        <div className="products-scroll-container">
          <div className="products-scroll" ref={scrollRef}>
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl || product.image || '/placeholder.svg'} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${(product.price || 0).toFixed(2)}</p>
                {product.rating && (
                  <p className="product-rating">⭐ {product.rating} ({product.reviews || 0} reviews)</p>
                )}
                <div className="product-actions">
                  <Link to={`/product/${product.id}`} className="view-product-btn">
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
