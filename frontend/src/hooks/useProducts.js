import { useEffect, useMemo, useState, useCallback } from 'react';
import { productService } from '../services/api/productService';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // filter state
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('default'); // default, price-asc, price-desc, name-asc, name-desc

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getAll();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const createProduct = async (payload) => {
        const newProduct = await productService.create(payload);
        setProducts((p) => [newProduct, ...p]);
        return newProduct;
    };

    const updateProduct = async (id, payload) => {
        const updated = await productService.update(id, payload);
        setProducts((p) => p.map((x) => (x.id === id ? updated : x)));
        return updated;
    };

    const deleteProduct = async (id) => {
        await productService.remove(id);
        setProducts((p) => p.filter((x) => x.id !== id));
    };

    const getProduct = async (id) => {
        const found = products.find((p) => String(p.id) === String(id));
        if (found) return found;
        return await productService.getById(id);
    };

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => (p.category || 'Uncategorized')));
        return ['all', ...Array.from(set)];
    }, [products]);

    const filtered = useMemo(() => {
        let list = products.slice();

        // search
        if (search && search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter((p) =>
                (p.name || p.title || '').toLowerCase().includes(q) ||
                (p.description || '').toLowerCase().includes(q)
            );
        }

        // category
        if (category && category !== 'all') {
            list = list.filter((p) => (p.category || '').toLowerCase() === category.toLowerCase());
        }

        // sorting
        if (sort === 'price-asc') list.sort((a, b) => (a.price || 0) - (b.price || 0));
        else if (sort === 'price-desc') list.sort((a, b) => (b.price || 0) - (a.price || 0));
        else if (sort === 'name-asc') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        else if (sort === 'name-desc') list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        // default: leave as returned from server

        return list;
    }, [products, search, category, sort]);

    const clearFilters = () => {
        setSearch('');
        setCategory('all');
        setSort('default');
    };

    return {
        products,
        filteredProducts: filtered,
        loading,
        error,
        fetchProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        search,
        setSearch,
        category,
        setCategory,
        sort,
        setSort,
        categories,
        clearFilters,
    };
}