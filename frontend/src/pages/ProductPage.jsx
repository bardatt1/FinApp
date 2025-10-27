import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductDetail from '../components/product/ProductDetail';

function ProductPage() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProductById(id)
      .then((p) => {
        if (mounted) setProduct(p);
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Failed to load product');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id, getProductById]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <main className="page product-page">
      <ProductDetail product={product} />
    </main>
  );
}

export default ProductPage;
