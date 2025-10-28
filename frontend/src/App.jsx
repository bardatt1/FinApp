import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './styles/global.css';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


