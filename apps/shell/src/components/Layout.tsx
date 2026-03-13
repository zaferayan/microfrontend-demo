// This file renders the shell layout, navigation, and shared cart badge.
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { classNames, eventBus, type CartCountUpdatedPayload } from '@mf-demo/shared';
import { Badge, Button } from '@mf-demo/ui-kit';
import { useAppShell } from '../context/AppShellContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme, user } = useAppShell();
  const [cartCount, setCartCount] = React.useState(0);
  const isDark = theme === 'dark';

  React.useEffect(() => {
    const unsubscribe = eventBus.on('cart:count-updated', (data) => {
      const payload = data as CartCountUpdatedPayload;
      setCartCount(payload.count);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen">
      <header
        className={classNames(
          'sticky top-0 z-40 border-b backdrop-blur',
          isDark ? 'border-white/10 bg-slate-950/70' : 'border-white/60 bg-white/80'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link className={classNames('text-lg font-semibold', isDark ? 'text-white' : 'text-ink-900')} to="/products">
              MF Enterprise Demo
            </Link>
            <nav className="hidden items-center gap-4 md:flex">
              <NavLink className={classNames('text-sm font-medium hover:text-brand-600', isDark ? 'text-slate-200' : 'text-ink-700')} to="/products">
                Products
              </NavLink>
              <NavLink className={classNames('text-sm font-medium hover:text-brand-600', isDark ? 'text-slate-200' : 'text-ink-700')} to="/cart">
                Cart
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className={classNames('text-sm font-semibold', isDark ? 'text-white' : 'text-ink-900')}>{user.name}</p>
              <p className={classNames('text-xs', isDark ? 'text-slate-300' : 'text-ink-500')}>{user.role}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </Button>
            <Link
              className={classNames(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
                isDark ? 'bg-white text-slate-900' : 'bg-ink-900 text-white'
              )}
              to="/cart"
            >
              <span>Cart</span>
              <Badge count={cartCount} color="danger" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>

      <footer
        className={classNames(
          'border-t px-4 py-6 backdrop-blur',
          isDark ? 'border-white/10 bg-slate-950/50' : 'border-black/5 bg-white/70'
        )}
      >
        <div className={classNames('mx-auto flex max-w-7xl flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between', isDark ? 'text-slate-300' : 'text-ink-700')}>
          <span>Shell container orchestrates routing, theme, and remote integration.</span>
          <span>Theme: {theme}</span>
        </div>
      </footer>
    </div>
  );
};
