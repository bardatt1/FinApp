import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;


