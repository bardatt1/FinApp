import React from 'react';

function Banner({ title = 'Welcome to FinApp', subtitle = 'Discover premium merch and collectibles.' }) {
  return (
    <section className="banner" aria-label="Hero banner">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </section>
  );
}

export default Banner;
