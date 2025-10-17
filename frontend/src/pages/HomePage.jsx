import React from 'react';
import Banner from '../components/ui/Banner';
import CategoryCard from '../components/ui/CategoryCard';

function HomePage() {
  return (
    <div>
      <Banner />
      <div style={{ marginTop: 24 }}>
        <div className="category-grid">
          <CategoryCard name="Apparel" />
          <CategoryCard name="Accessories" />
          <CategoryCard name="Collectibles" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
