// This file exposes the product remote application routes.
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { ProductListPage } from './components/ProductListPage';

export const App: React.FC = () => {
  React.useEffect(() => {
    console.log('Product remote loaded');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path=":id" element={<ProductDetailsPage />} />
    </Routes>
  );
};

export default App;
