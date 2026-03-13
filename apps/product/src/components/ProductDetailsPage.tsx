// This file renders a single product detail view with quantity selection.
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { eventBus, formatCurrency, Product, type CartAddItemPayload } from '@mf-demo/shared';
import { Button, Skeleton, Toast } from '@mf-demo/ui-kit';
import { getProductById } from '../data/products';

export const ProductDetailsPage: React.FC = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [toastMessage, setToastMessage] = React.useState('');

  React.useEffect(() => {
    console.log(`Product details mounted for ${id}`);

    getProductById(id).then((response) => {
      setProduct(response ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Skeleton height={420} />
        <div className="space-y-4">
          <Skeleton height={28} width="70%" />
          <Skeleton height={18} width="40%" />
          <Skeleton height={18} width="100%" />
          <Skeleton height={18} width="90%" />
          <Skeleton height={48} width="50%" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-panel">
        <h2 className="text-2xl font-semibold text-ink-900">Product not found</h2>
        <p className="mt-3 text-ink-700">The requested product does not exist in this mock catalog.</p>
        <Link className="mt-6 inline-flex text-sm font-semibold text-brand-600" to="/products">
          Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const payload: CartAddItemPayload = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity
    };

    eventBus.emit('cart:add-item', payload);
    setToastMessage(`${quantity} item(s) added to cart`);
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex items-center justify-center overflow-hidden rounded-[32px] bg-white p-8 shadow-panel">
        <img className="max-h-[420px] w-full object-contain" src={product.image} alt={product.name} />
      </div>

      <div className="rounded-[32px] bg-white p-8 shadow-panel">
        <p className="text-sm uppercase tracking-[0.3em] text-ink-500">Product detail</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink-900">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold text-brand-600">{formatCurrency(product.price)}</p>
        <p className="mt-5 text-base leading-7 text-ink-700">{product.description}</p>

        <div className="mt-8 flex items-center gap-4">
          <label className="text-sm font-medium text-ink-700" htmlFor="quantity">
            Quantity
          </label>
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <button className="px-3 text-lg font-semibold text-ink-900" onClick={() => setQuantity((current) => Math.max(1, current - 1))} type="button">
              -
            </button>
            <input
              className="w-12 border-0 bg-transparent text-center text-base font-semibold text-ink-900 focus:outline-none"
              id="quantity"
              min={1}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              type="number"
              value={quantity}
            />
            <button className="px-3 text-lg font-semibold text-ink-900" onClick={() => setQuantity((current) => current + 1)} type="button">
              +
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={handleAddToCart}>
            Add to cart
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/products')}>
            Back
          </Button>
        </div>
      </div>

      <Toast message={toastMessage} type="success" onClose={() => setToastMessage('')} />
    </section>
  );
};
