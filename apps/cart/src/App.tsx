// This file exposes the cart remote application routes and provider setup.
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CartPage } from './components/CartPage';
import { CartProvider } from './context/CartContext';

export const App: React.FC = () => {
  React.useEffect(() => {
    console.log('Cart remote loaded');
  }, []);

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/cart" replace />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
