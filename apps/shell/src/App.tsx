// This file wires shell routing, remote loading, and shell-owned layout state.
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShellProvider } from './context/AppShellContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { RemoteSkeleton } from './components/RemoteSkeleton';

const ProductApp = React.lazy(async () => {
  console.log('Loading product remote');
  return import('product/App');
});

const CartApp = React.lazy(async () => {
  console.log('Loading cart remote');
  return import('cart/App');
});

const ShellHome: React.FC = () => <Navigate to="/products" replace />;

export const App: React.FC = () => {
  React.useEffect(() => {
    console.log('Shell app mounted');
    import('cart/App')
      .then(() => {
        console.log('Cart remote preloaded for event bridge');
      })
      .catch((error) => {
        console.warn('Cart remote preload failed', error);
      });
  }, []);

  return (
    <AppShellProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<ShellHome />} />
          <Route
            path="/products/*"
            element={
              <ErrorBoundary title="Product remote">
                <React.Suspense fallback={<RemoteSkeleton />}>
                  <ProductApp />
                </React.Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/cart/*"
            element={
              <ErrorBoundary title="Cart remote">
                <React.Suspense fallback={<RemoteSkeleton />}>
                  <CartApp />
                </React.Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </Layout>
    </AppShellProvider>
  );
};

export default App;
