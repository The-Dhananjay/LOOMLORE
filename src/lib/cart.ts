import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products, type Product } from '@/data/catalog';
import { splitGST } from './india';

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
};

type CartState = {
  items: CartItem[];
  giftWrap: boolean;
  couponCode: string;
  discountPct: number;
  isOpen: boolean;
  
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleGiftWrap: () => void;
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  getSubtotal: () => number;
  getDiscount: () => number;
  getGiftWrapCost: () => number;
  getShippingCost: () => number;
  getTaxBreakdown: () => { base: number; gst: number };
  getTotal: () => number;
  getItemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        { product: products[0], quantity: 1, selectedSize: 'Free Size' },
        { product: products[1], quantity: 1, selectedSize: 'Free Size' }
      ],
      giftWrap: false,
      couponCode: '',
      discountPct: 0,
      isOpen: false,

      addItem: (product, size = 'Free Size') => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, selectedSize: size }],
            isOpen: true
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId)
        }));
      },

      updateQuantity: (productId, delta) => {
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.product.id === productId) {
                const nextQty = i.quantity + delta;
                return nextQty > 0 ? { ...i, quantity: nextQty } : null;
              }
              return i;
            })
            .filter(Boolean) as CartItem[]
        }));
      },

      toggleGiftWrap: () => set((state) => ({ giftWrap: !state.giftWrap })),

      applyCoupon: (code) => {
        const clean = code.toUpperCase().trim();
        if (clean === 'HEIRLOOM10' || clean === 'WELCOME500') {
          set({ couponCode: clean, discountPct: 10 });
          return true;
        }
        return false;
      },

      clearCart: () => set({ items: [], giftWrap: false, couponCode: '', discountPct: 0 }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPct) / 100;
      },

      getGiftWrapCost: () => (get().giftWrap ? 199 : 0),

      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 1500 || subtotal === 0 ? 0 : 150;
      },

      getTaxBreakdown: () => {
        const total = get().getTotal();
        return splitGST(total, 5);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const giftWrap = get().getGiftWrapCost();
        const shipping = get().getShippingCost();
        return Math.max(0, subtotal - discount + giftWrap + shipping);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'loomlore-cart-storage'
    }
  )
);
