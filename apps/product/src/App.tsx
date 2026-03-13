// This file exposes the product remote application routes.
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { ProductListPage } from './components/ProductListPage';

export const App: React.FC = () => {
  React.useEffect(() => {
    console.log('Product remote loaded');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
    </Routes>
  );
};

export default App;
