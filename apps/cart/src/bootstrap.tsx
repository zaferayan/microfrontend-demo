// This file mounts the cart app in standalone mode for local development.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const AppRouter = __USE_HASH_ROUTER__ ? HashRouter : BrowserRouter;

if (container) {
  console.log('Bootstrapping standalone cart app');
  createRoot(container).render(
    <React.StrictMode>
      <AppRouter>
        <div className="min-h-screen px-4 py-8 md:px-8">
          <Routes>
            <Route path="/" element={<Navigate to="/cart" replace />} />
            <Route path="/cart/*" element={<App />} />
          </Routes>
        </div>
      </AppRouter>
    </React.StrictMode>
  );
}
