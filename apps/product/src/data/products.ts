// This file stores mock product data and a delayed fetch helper for the demo.
import { Product } from '@mf-demo/shared';
import { wait } from '@mf-demo/shared';

const products: Product[] = [
  {
    id: '1',
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday essentials, and more.',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png'
  },
  {
    id: '2',
    name: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style with contrast raglan long sleeves, a three-button henley placket, and breathable soft fabric for durable casual wear.',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png'
  },
  {
    id: '3',
    name: 'Mens Cotton Jacket',
    price: 55.99,
    description: 'Great outerwear jacket for spring, autumn, and winter. Works well for hiking, travel, camping, or everyday use.',
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png'
  },
  {
    id: '4',
    name: 'Mens Casual Slim Fit',
    price: 15.99,
    description: 'Casual slim-fit everyday shirt. Please review the detailed sizing information since body builds vary by person.',
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png'
  },
  {
    id: '5',
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From the Legends Collection, inspired by the mythical water dragon that protects the ocean's pearl.",
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png'
  },
  {
    id: '6',
    name: 'Solid Gold Petite Micropave',
    price: 168,
    description: 'Delicate micropave jewelry piece sold by Hafeez Center with a 30-day satisfaction guarantee.',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png'
  },
  {
    id: '7',
    name: 'White Gold Plated Princess',
    price: 9.99,
    description: "Classic created wedding and engagement solitaire ring designed as a gift-forward everyday statement.",
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png'
  },
  {
    id: '8',
    name: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
    price: 10.99,
    description: 'Rose gold plated double flared tunnel plug earrings made from durable 316L stainless steel.',
    image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png'
  },
  {
    id: '9',
    name: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
    price: 64,
    description: 'Portable external hard drive with USB 3.0 support, fast transfers, and broad Windows compatibility.',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png'
  },
  {
    id: '10',
    name: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 109,
    description: 'Reliable SATA SSD that improves boot, shutdown, and application load times for everyday PC workloads.',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png'
  },
  {
    id: '11',
    name: 'Silicon Power 256GB SSD 3D NAND A55 SATA III 2.5',
    price: 109,
    description: '3D NAND SSD with SLC cache technology, TRIM support, and slim 7mm form factor for notebooks and ultrabooks.',
    image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png'
  },
  {
    id: '12',
    name: 'WD 4TB Gaming Drive Works with Playstation 4',
    price: 114,
    description: 'Portable external hard drive built to expand PlayStation 4 storage with fast setup and a compact design.',
    image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png'
  },
  {
    id: '13',
    name: 'Acer SB220Q bi 21.5 inches Full HD Monitor',
    price: 599,
    description: '21.5-inch Full HD IPS display with Radeon FreeSync, ultra-thin design, and 75Hz refresh rate over HDMI.',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png'
  },
  {
    id: '14',
    name: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor',
    price: 999.99,
    description: 'Super ultrawide curved gaming monitor with QLED panel, HDR support, 144Hz refresh rate, and 1ms response time.',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png'
  },
  {
    id: '15',
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description: '3-in-1 winter jacket with detachable fleece liner, adjustable hood, and multiple zippered pockets.',
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png'
  },
  {
    id: '16',
    name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description: 'Faux leather moto jacket with removable hood, front pockets, and stitched side details for casual layering.',
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png'
  },
  {
    id: '17',
    name: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
    price: 39.99,
    description: 'Lightweight hooded rain jacket with adjustable waist, striped lining, and roomy side pockets.',
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png'
  },
  {
    id: '18',
    name: "MBJ Women's Solid Short Sleeve Boat Neck V",
    price: 9.85,
    description: 'Lightweight short sleeve top with stretch fabric, ribbed sleeve details, and double-stitched hem.',
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png'
  },
  {
    id: '19',
    name: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description: 'Lightweight moisture-wicking performance tee with a comfortable V-neck and slim feminine silhouette.',
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png'
  },
  {
    id: '20',
    name: 'DANVOUY Womens T Shirt Casual Cotton Short',
    price: 12.99,
    description: 'Soft casual V-neck tee with stretch cotton blend fabric designed for everyday wear across multiple seasons.',
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png'
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
