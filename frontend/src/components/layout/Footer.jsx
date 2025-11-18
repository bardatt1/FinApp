import React from 'react';
import '../../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FinApp Apparel. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
