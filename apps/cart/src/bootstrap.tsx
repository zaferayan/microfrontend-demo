// This file mounts the cart app in standalone mode for local development.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (container) {
  console.log('Bootstrapping standalone cart app');
  createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <div className="min-h-screen px-4 py-8 md:px-8">
          <Routes>
            <Route path="/" element={<Navigate to="/cart" replace />} />
            <Route path="/cart/*" element={<App />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}
