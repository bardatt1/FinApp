import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductDetail from '../components/product/ProductDetail';

export default function ProductPage() {
    const { id } = useParams();
    const { getProduct } = useProducts();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        getProduct(id)
            .then((p) => { if (mounted) setProduct(p); })
            .catch((e) => { if (mounted) setError(e.message || 'Failed to load product'); })
            .finally(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, [id, getProduct]);

    if (loading) return <div>Loading product...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    return <ProductDetail product={product} />;
}
