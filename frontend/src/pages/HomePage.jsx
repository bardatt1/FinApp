import React from 'react';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import Banner from '../components/ui/Banner';
import CategoryCard from '../components/ui/CategoryCard';

function HomePage() {
  const { products, loading } = useProducts({ limit: 8 }); // backend can support limit/query params

  // take first 8 if backend doesn't honor limit
  const featured = products.slice(0, 8);

  return (
    <main className="page home-page">
      <header className="hero">
        <h1>Welcome to FinApp Shop</h1>
        <p>Find the best products curated for you.</p>
      </header>

      <Banner />
      <div style={{ marginTop: 24 }}>
        <div className="category-grid">
          <CategoryCard name="Apparel" />
          <CategoryCard name="Accessories" />
          <CategoryCard name="Collectibles" />
        </div>
      </div>

      <section className="section">
        <h2>Featured Products</h2>
        <ProductGrid products={featured} loading={loading} />
      </section>
    </main>
  );
}

export default HomePage;
