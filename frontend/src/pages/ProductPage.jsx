import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api/productService';
import ProductDetail from '../components/product/ProductDetail';

import { validateProductId } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Validate product ID
        const validation = validateProductId(id);
        if (!validation.valid) {
            setError(validation.error || 'Invalid product ID');
            setLoading(false);
            // Redirect to shop after a short delay
            setTimeout(() => navigate('/shop'), 2000);
            return;
        }

        let mounted = true;
        setLoading(true);
        productService.getById(validation.id)
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
    }, [id, navigate]);

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
