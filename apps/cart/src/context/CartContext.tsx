// This file manages the cart store, event bus bridge, and React context bindings.
import React from 'react';
import { eventBus, type CartAddItemPayload, type CartItem } from '@mf-demo/shared';

declare global {
  interface Window {
    __MF_DEMO_CART_LISTENER__?: boolean;
  }
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'add'; payload: CartAddItemPayload }
  | { type: 'increment'; payload: { productId: string } }
  | { type: 'decrement'; payload: { productId: string } }
  | { type: 'remove'; payload: { productId: string } }
  | { type: 'clear' };

interface CartContextValue {
  items: CartItem[];
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'add': {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);

      if (!existingItem) {
        return {
          items: [...state.items, action.payload]
        };
      }

      return {
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      };
    }
    case 'increment':
      return {
        items: state.items.map((item) =>
          item.productId === action.payload.productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    case 'decrement':
      return {
        items: state.items
          .map((item) =>
            item.productId === action.payload.productId ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      };
    case 'remove':
      return {
        items: state.items.filter((item) => item.productId !== action.payload.productId)
      };
    case 'clear':
      return { items: [] };
    default:
      return state;
  }
};

const store = {
  state: { items: [] } as CartState,
  listeners: new Set<() => void>()
};

const notify = () => {
  eventBus.emit('cart:count-updated', {
    count: store.state.items.reduce((total, item) => total + item.quantity, 0)
  });
  store.listeners.forEach((listener) => listener());
};

const dispatch = (action: CartAction) => {
  store.state = reducer(store.state, action);
  notify();
};

if (typeof window !== 'undefined' && !window.__MF_DEMO_CART_LISTENER__) {
  window.__MF_DEMO_CART_LISTENER__ = true;

  eventBus.on('cart:add-item', (data) => {
    console.log('Cart event received', data);
    dispatch({ type: 'add', payload: data as CartAddItemPayload });
  });
}

const subscribe = (listener: () => void) => {
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
};

const getSnapshot = () => store.state;

const CartContext = React.createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items: state.items,
      increment: (productId) => dispatch({ type: 'increment', payload: { productId } }),
      decrement: (productId) => dispatch({ type: 'decrement', payload: { productId } }),
      remove: (productId) => {
        eventBus.emit('cart:remove-item', { productId });
        dispatch({ type: 'remove', payload: { productId } });
      },
      clear: () => dispatch({ type: 'clear' })
    }),
    [state.items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
