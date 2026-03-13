// This file stores mock product data and a delayed fetch helper for the demo.
import { Product } from '@mf-demo/shared';
import { wait } from '@mf-demo/shared';

const products: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Wireless Headphones',
    price: 4299,
    description: 'Immersive over-ear headphones with adaptive noise cancellation and 40-hour battery life.',
    image: 'https://via.placeholder.com/640x480/f4e8d8/102033?text=Aurora+Headphones'
  },
  {
    id: 'atlas-watch',
    name: 'Atlas Smart Watch',
    price: 3199,
    description: 'A lightweight health-focused smartwatch with GPS, sleep tracking, and bright AMOLED display.',
    image: 'https://via.placeholder.com/640x480/d9ecff/102033?text=Atlas+Watch'
  },
  {
    id: 'luna-speaker',
    name: 'Luna Portable Speaker',
    price: 1899,
    description: 'Compact Bluetooth speaker with stereo pairing and splash-resistant fabric shell.',
    image: 'https://via.placeholder.com/640x480/e8f6f4/102033?text=Luna+Speaker'
  },
  {
    id: 'nova-keyboard',
    name: 'Nova Mechanical Keyboard',
    price: 2499,
    description: 'Hot-swappable wireless keyboard with tactile switches and per-key white backlight.',
    image: 'https://via.placeholder.com/640x480/f7f1e8/102033?text=Nova+Keyboard'
  },
  {
    id: 'stride-backpack',
    name: 'Stride Tech Backpack',
    price: 1599,
    description: 'Weather-resistant commuter backpack with laptop sleeve and modular compartments.',
    image: 'https://via.placeholder.com/640x480/e5edf8/102033?text=Stride+Backpack'
  },
  {
    id: 'halo-lamp',
    name: 'Halo Desk Lamp',
    price: 1199,
    description: 'Minimal LED desk lamp with touch controls, USB-C power, and warm-cool modes.',
    image: 'https://via.placeholder.com/640x480/fef3c7/102033?text=Halo+Lamp'
  },
  {
    id: 'pulse-mouse',
    name: 'Pulse Ergonomic Mouse',
    price: 999,
    description: 'Ergonomic productivity mouse with silent switches and customizable side buttons.',
    image: 'https://via.placeholder.com/640x480/dcfce7/102033?text=Pulse+Mouse'
  },
  {
    id: 'glide-stand',
    name: 'Glide Laptop Stand',
    price: 749,
    description: 'Foldable aluminum stand that lifts your laptop into a healthier desk posture.',
    image: 'https://via.placeholder.com/640x480/e0f2fe/102033?text=Glide+Stand'
  },
  {
    id: 'zen-camera',
    name: 'Zen Home Camera',
    price: 2799,
    description: 'Indoor home camera with privacy shutter, 2K video, and AI motion alerts.',
    image: 'https://via.placeholder.com/640x480/ede9fe/102033?text=Zen+Camera'
  }
];

export const getProducts = async (): Promise<Product[]> => {
  await wait(300);
  return products;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await wait(300);
  return products.find((product) => product.id === id);
};
