import React, { useState, useEffect, useMemo } from 'react';
import { productService } from '../services/api/productService';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilterSidebar from '../components/product/ProductFilterSidebar';
import AdminProductForm from '../components/admin/AdminProductForm';
import '../styles/shop.css';
import '../styles/admin-products.css';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .map(product => ({
        ...product,
        image: product.imageUrl || product.image,
        inStock: true, // Admin view - all products are in stock
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

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const updated = await productService.update(editingProduct.id, productData);
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
      } else {
        // Create new product
        const newProduct = await productService.create(productData);
        setProducts(prev => [newProduct, ...prev]);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error saving product:', err);
      // Re-throw to be handled by the form
      throw err;
    }
  };

  const handleDelete = async (productId) => {
    try {
      await productService.remove(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      setDeleteConfirm(null);
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="shop-page">
        <div className="shop-header">
          <div className="shop-header-content">
            <h1>Manage</h1>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page admin-products-page">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-header-content">
          <div className="admin-header-row">
            <div>
              <h1>Manage</h1>
              <p>Manage your product catalog</p>
            </div>
            <button className="admin-create-btn" onClick={handleCreate}>
              Create New Product
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="admin-error-banner">
          <p>Error: {error}</p>
          <button onClick={fetchProducts}>Retry</button>
        </div>
      )}

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
              <p>{filteredProducts.length} products found</p>
            </div>
          </div>

          {loading ? (
            <div className="admin-loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="admin-empty-state">
              <p>No products found. {search || category !== 'all' ? 'Try adjusting your filters.' : 'Create your first product!'}</p>
            </div>
          ) : (
            <div className="admin-product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="admin-product-card">
                  <div className="admin-product-image">
                    <img 
                      src={product.imageUrl || product.image || '/placeholder.svg'} 
                      alt={product.name}
                    />
                  </div>
                  <div className="admin-product-info">
                    <h3>{product.name}</h3>
                    <p className="admin-product-category">{product.category}</p>
                    <p className="admin-product-price">${(product.price || 0).toFixed(2)}</p>
                    <div className="admin-product-actions">
                      <button 
                        className="admin-edit-btn"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="admin-delete-btn"
                        onClick={() => setDeleteConfirm(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Create/Edit Form Modal */}
      <AdminProductForm
        product={editingProduct}
        onSave={handleSave}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        isOpen={isFormOpen}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-delete-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="admin-delete-actions">
              <button 
                className="admin-delete-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="admin-delete-confirm"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

