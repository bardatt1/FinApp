import React from 'react';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilterSidebar from '../components/product/ProductFilterSidebar';

export default function ShopPage() {
  const { products, categories, filters, setFilters, loading, error } = useProducts();

  const handleFiltersChange = (next) => {
    setFilters(next);
  };

  return (
    <main className="page shop-page">
      <h1>Shop</h1>
      <div className="shop-layout">
        <ProductFilterSidebar
          filters={filters}
          onChangeFilters={handleFiltersChange}
          categories={categories}
        />
        <div className="shop-content">
          {error && <div className="error">{error}</div>}
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </main>
  );
}
