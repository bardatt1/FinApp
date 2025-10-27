import React, { useState, useEffect } from 'react';

export default function ProductFilterSidebar({
  filters = {},
  onChangeFilters,
  categories = [],
}) {
  const [search, setSearch] = useState(filters.search || '');
  const [category, setCategory] = useState(filters.category || '');
  const [sort, setSort] = useState(filters.sort || '');

  useEffect(() => {
    const t = setTimeout(() => {
      onChangeFilters({ ...filters, search, category, sort });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, sort]);

  return (
    <aside className="product-filter">
      <div className="filter-group">
        <label>Search</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Sort</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Default</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name_asc">Name A → Z</option>
          <option value="name_desc">Name Z → A</option>
        </select>
      </div>
    </aside>
  );
}