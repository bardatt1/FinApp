import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} FinApp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
