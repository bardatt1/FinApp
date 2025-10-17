import React from 'react';

function CategoryCard({ name, imageUrl = 'https://via.placeholder.com/400x200?text=Category' }) {
  return (
    <article className="category-card">
      <img src={imageUrl} alt={`${name} category`} />
      <h4>{name}</h4>
    </article>
  );
}

export default CategoryCard;
