import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/api/productService';

export default function useProducts(initialFilters = {}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(params);
      setProducts(data || []);
      const cats = Array.from(new Set((data || []).map((p) => p.category).filter(Boolean)));
      setCategories(cats);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const p = await productService.getProductById(id);
      return p;
    } catch (err) {
      setError(err.message || 'Failed to load product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    categories,
    filters,
    setFilters,
    loading,
    error,
    fetchProducts,
    getProductById,
  };
}