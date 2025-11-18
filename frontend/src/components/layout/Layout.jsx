import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  
  // Don't render Layout for landing page (it has its own navigation and footer)
  if (location.pathname === '/') {
    return <>{children}</>;
  }
  
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
