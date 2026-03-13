// This file renders the product catalog grid and cart add interactions.
import React from "react";
import { Link } from "react-router-dom";
import {
  eventBus,
  formatCurrency,
  Product,
  type CartAddItemPayload,
} from "@mf-demo/shared";
import { Button, Card, Skeleton, Toast } from "@mf-demo/ui-kit";
import { getProducts } from "../data/products";

export const ProductListPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [toastMessage, setToastMessage] = React.useState("");

  React.useEffect(() => {
    console.log("Product list mounted");

    getProducts().then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, []);

  const addToCart = (product: Product) => {
    const payload: CartAddItemPayload = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    eventBus.emit("cart:add-item", payload);
    setToastMessage(`${product.name} added to cart`);
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-ink-500">
          Product micro app
        </p>
        <h1 className="text-4xl font-semibold text-ink-900">
          Explore the catalog
        </h1>
        <p className="max-w-2xl text-base leading-7 text-ink-700">
          This remote exposes a product list and detail page while broadcasting
          cart events through the shared event bus.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-[28px] bg-white p-5 shadow-panel"
            >
              <Skeleton height={220} />
              <Skeleton height={28} width="70%" />
              <Skeleton height={16} width="100%" />
              <Skeleton height={16} width="80%" />
              <Skeleton height={40} width="45%" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              title={product.name}
              description={product.description}
              footer={
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-ink-900">
                      {formatCurrency(product.price)}
                    </p>
                    <Link
                      className="text-sm font-medium text-brand-600 hover:text-brand-700"
                      to={`/products/${product.id}`}
                    >
                      View details
                    </Link>
                  </div>
                  <Button onClick={() => addToCart(product)}>
                    Add to cart
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      )}

      <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage("")}
      />
    </section>
  );
};
