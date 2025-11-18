import React, { useState, useMemo, useEffect } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilterSidebar from '../components/product/ProductFilterSidebar';
import { productService } from '../services/api/productService';
import '../styles/shop.css';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get all unique category names from products
  const categories = useMemo(() => {
    const categoryNames = products
      .map(p => p.category || 'Uncategorized')
      .filter((name, index, self) => self.indexOf(name) === index);
    return ['all', ...categoryNames];
  }, [products]);

  // Filter and sort products - transform to match reference structure
  const filteredProducts = useMemo(() => {
    return products
      .map(product => ({
        ...product,
        image: product.imageUrl || product.image,
        inStock: true, // All products from API are in stock
        category: product.category || 'Uncategorized'
      }))
      .filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase()) ||
                             (product.description || '').toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = (product.price || 0) >= priceRange[0] && (product.price || 0) <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === 'price-low') return (a.price || 0) - (b.price || 0);
        if (sort === 'price-high') return (b.price || 0) - (a.price || 0);
        if (sort === 'newest') return (b.id || 0) - (a.id || 0);
        return 0; // featured/default
      });
  }, [products, search, category, sort, priceRange]);

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('featured');
    setPriceRange([0, 200]);
  };

  const activeFilters = search || category !== 'all' || sort !== 'featured' || priceRange[0] !== 0 || priceRange[1] !== 200;

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-header-content">
          <h1>Our Collection</h1>
          <p>Discover our premium selection of casual wear</p>
        </div>
      </div>

      <div className="shop-container">
        {/* Sidebar */}
        <ProductFilterSidebar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
          clearFilters={clearFilters}
          activeFilters={activeFilters}
        />

        {/* Main Content */}
        <main className="shop-main">
          <div className="results-header">
            <div className="results-info">
              <p>{loading ? 'Loading...' : `${filteredProducts.length} products found`}</p>
            </div>
          </div>

          {error && (
            <div style={{ padding: '1rem', background: '#fee', color: '#c33', borderRadius: '4px', marginBottom: '1rem' }}>
              Error: {error}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </main>
      </div>
    </div>
  );
}
