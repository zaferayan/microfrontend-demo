// This file mounts the shell app for local development.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const AppRouter = __USE_HASH_ROUTER__ ? HashRouter : BrowserRouter;

if (container) {
  console.log('Bootstrapping shell app');
  createRoot(container).render(
    <React.StrictMode>
      <AppRouter>
        <App />
      </AppRouter>
    </React.StrictMode>
  );
}
