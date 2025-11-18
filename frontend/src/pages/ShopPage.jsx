import React from 'react';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilterSidebar from '../components/product/ProductFilterSidebar';

export default function ShopPage() {
    const {
        filteredProducts,
        loading,
        error,
        search,
        setSearch,
        category,
        setCategory,
        sort,
        setSort,
        categories,
        clearFilters,
    } = useProducts();

    return (
        <div className="page shop-page">
            <h1>Shop</h1>
            <div className="shop-layout">
                <ProductFilterSidebar
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    sort={sort}
                    setSort={setSort}
                    categories={categories}
                    clearFilters={clearFilters}
                />
                <main className="shop-main">
                    <ProductGrid products={filteredProducts} loading={loading} error={error} />
                </main>
            </div>
        </div>
    );
}
