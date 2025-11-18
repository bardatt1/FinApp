import React from 'react';

export default function ProductFilterSidebar({
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    categories = [],
    clearFilters,
}) {
    return (
        <aside className="product-filter-sidebar">
            <div className="filter-group">
                <label>Search</label>
                <input
                    value={search || ''}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                />
            </div>

            <div className="filter-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Sort</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A → Z</option>
                    <option value="name-desc">Name: Z → A</option>
                </select>
            </div>

            <div className="filter-actions">
                <button className="btn" onClick={clearFilters}>Clear</button>
            </div>
        </aside>
    );
}