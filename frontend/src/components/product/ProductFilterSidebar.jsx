import React from 'react';
import '../../styles/filter-sidebar.css';

export default function ProductFilterSidebar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  priceRange,
  setPriceRange,
  categories = [],
  clearFilters,
  activeFilters
}) {
  return (
    <aside className="filter-sidebar">
      <div className="sidebar-header">
        <h2>Filters</h2>
        {activeFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
        )}
      </div>

      {/* Search */}
      <div className="filter-section">
        <label htmlFor="search" className="filter-label">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Categories */}
      <div className="filter-section">
        <label className="filter-label">Category</label>
        <div className="category-list">
          {categories.map(cat => (
            <label key={cat} className="category-item">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={(e) => setCategory(e.target.value)}
              />
              <span className="category-name">
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <label className="filter-label">Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            min="0"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            className="price-input"
            placeholder="Min"
          />
          <span className="price-separator">—</span>
          <input
            type="number"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
            className="price-input"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="filter-section">
        <label htmlFor="sort" className="filter-label">Sort By</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sort-select"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </aside>
  );
}