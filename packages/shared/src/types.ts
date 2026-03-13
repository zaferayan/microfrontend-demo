// This file defines the shared domain and event types used by all apps.
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartEvent {
  type: 'cart:add-item' | 'cart:remove-item' | 'cart:count-updated';
  payload: unknown;
}

export interface CartAddItemPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartCountUpdatedPayload {
  count: number;
}
