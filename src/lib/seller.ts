import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products, type Product } from '@/data/catalog';

export type SellerOrder = {
  orderId: string;
  customerName: string;
  customerMobile: string;
  shippingAddress: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    priceINR: number;
    image: string;
  }[];
  totalAmountINR: number;
  paymentMethod: string;
  orderedAt: string;
  status: 'Received' | 'In Production' | 'Dispatched' | 'Delivered';
};

type SellerState = {
  sellerProducts: Product[];
  sellerOrders: SellerOrder[];
  
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => Product;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, data: Partial<Product>) => void;
  addOrderNotification: (order: SellerOrder) => void;
  updateOrderStatus: (orderId: string, status: SellerOrder['status']) => void;
};

export const useSellerStore = create<SellerState>()(
  persist(
    (set, get) => ({
      sellerProducts: products.slice(0, 12),
      sellerOrders: [
        {
          orderId: 'LL-ORD-98421',
          customerName: 'Rohan Sharma',
          customerMobile: '9876543210',
          shippingAddress: 'Flat 402, Royal Residency, Connaught Place, New Delhi 110001',
          items: [
            {
              productId: products[0].id,
              productName: products[0].name,
              quantity: 1,
              priceINR: products[0].priceINR,
              image: products[0].image
            }
          ],
          totalAmountINR: products[0].priceINR,
          paymentMethod: 'UPI (GPay / PhonePe)',
          orderedAt: new Date(Date.now() - 3600000 * 4).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          status: 'Received'
        }
      ],

      addProduct: (newProductData) => {
        const id = `prod-seller-${Date.now()}`;
        const slug = newProductData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        const newProduct: Product = {
          ...newProductData,
          id,
          slug,
          rating: 5.0,
          reviewCount: 1
        };

        set((state) => ({
          sellerProducts: [newProduct, ...state.sellerProducts]
        }));

        return newProduct;
      },

      removeProduct: (productId) => {
        set((state) => ({
          sellerProducts: state.sellerProducts.filter((p) => p.id !== productId)
        }));
      },

      updateProduct: (productId, data) => {
        set((state) => ({
          sellerProducts: state.sellerProducts.map((p) =>
            p.id === productId ? { ...p, ...data } : p
          )
        }));
      },

      addOrderNotification: (newOrder) => {
        set((state) => ({
          sellerOrders: [newOrder, ...state.sellerOrders]
        }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          sellerOrders: state.sellerOrders.map((o) =>
            o.orderId === orderId ? { ...o, status } : o
          )
        }));
      }
    }),
    {
      name: 'loomlore-seller-storage'
    }
  )
);
