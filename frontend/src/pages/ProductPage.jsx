import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api/productService';
import ProductDetail from '../components/product/ProductDetail';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        productService.getById(id)
            .then((p) => { 
                if (mounted) {
                    setProduct({
                        ...p,
                        image: p.imageUrl || p.image,
                        inStock: true
                    });
                }
            })
            .catch((e) => { 
                if (mounted) setError(e.message || 'Failed to load product'); 
            })
            .finally(() => { 
                if (mounted) setLoading(false); 
            });
        return () => { mounted = false; };
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p>Loading product...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#c62828' }}>
                <p>Error: {error}</p>
            </div>
        );
    }
    return <ProductDetail product={product} />;
}
