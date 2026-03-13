// This file renders the cart page and order completion interactions.
import React from 'react';
import { formatCurrency } from '@mf-demo/shared';
import { Button, Modal, Toast } from '@mf-demo/ui-kit';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { items, increment, decrement, remove, clear } = useCart();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const confirmCheckout = () => {
    clear();
    setIsModalOpen(false);
    setToastMessage('Order completed successfully');
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-ink-500">Cart micro app</p>
        <h1 className="text-4xl font-semibold text-ink-900">Your cart</h1>
        <p className="max-w-2xl text-base leading-7 text-ink-700">This remote listens to product events, owns cart state, and reports cart count back to the shell header.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4 rounded-[32px] bg-white p-6 shadow-panel">
          {items.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-lg font-semibold text-ink-900">Your cart is empty</p>
              <p className="mt-2 text-sm text-ink-700">Add products from the product remote to see event-driven updates here.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-ink-900">{item.name}</h2>
                  <p className="text-sm text-ink-700">{formatCurrency(item.price)} each</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                    <button className="px-3 text-lg font-semibold text-ink-900" onClick={() => decrement(item.productId)} type="button">
                      -
                    </button>
                    <span className="w-10 text-center text-base font-semibold text-ink-900">{item.quantity}</span>
                    <button className="px-3 text-lg font-semibold text-ink-900" onClick={() => increment(item.productId)} type="button">
                      +
                    </button>
                  </div>
                  <p className="min-w-28 text-right text-base font-semibold text-ink-900">{formatCurrency(item.price * item.quantity)}</p>
                  <Button variant="danger" size="sm" onClick={() => remove(item.productId)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="rounded-[32px] bg-ink-900 p-6 text-white shadow-panel">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Summary</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>Items</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xl font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <Button className="mt-8 w-full" disabled={items.length === 0} size="lg" onClick={handleCheckout}>
            Complete order
          </Button>
        </aside>
      </div>

      {isModalOpen ? (
        <Modal title="Confirm order" onClose={() => setIsModalOpen(false)}>
          <div className="space-y-5">
            <p className="text-sm leading-6 text-ink-700">This demo does not call a backend, but it shows how a remote can own checkout-related UI and state transitions.</p>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-ink-700">Order total</p>
              <p className="mt-2 text-2xl font-semibold text-ink-900">{formatCurrency(total)}</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmCheckout}>Confirm</Button>
            </div>
          </div>
        </Modal>
      ) : null}

      <Toast message={toastMessage} type="success" onClose={() => setToastMessage('')} />
    </section>
  );
};
