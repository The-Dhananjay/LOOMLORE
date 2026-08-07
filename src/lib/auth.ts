import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'seller' | 'admin';
export type SellerStatus = 'pending' | 'approved' | 'rejected';
export type OrderStatus = 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered';

export type UserAddress = {
  id: string;
  name: string;
  mobile: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
  isDefault: boolean;
};

export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  image: string;
  priceINR: number;
  quantity: number;
  size: string;
};

export type UserOrder = {
  id: string;
  trackingId: string;
  courierPartner: string;
  date: string;
  totalINR: number;
  paymentMethod: string;
  status: OrderStatus;
  estimatedDelivery: string;
  shippingAddress: UserAddress;
  items: OrderItem[];
};

export type SellerRegistration = {
  id: string;
  firmName: string;
  ownerName: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  panNumber: string;
  gstinNumber: string;
  bankAccount: string;
  ifscCode: string;
  craftSpecialty: string;
  status: SellerStatus;
  submittedAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  sellerStatus?: SellerStatus;
  sellerDetails?: SellerRegistration;
  addresses: UserAddress[];
  orders: UserOrder[];
  purchasedProductIds?: string[];
};

type AuthState = {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  pendingSellers: SellerRegistration[];
  
  openLoginModal: () => void;
  closeLoginModal: () => void;
  
  registerBuyer: (name: string, mobile: string, email: string) => boolean;
  registerSeller: (data: Omit<SellerRegistration, 'id' | 'status' | 'submittedAt'>) => SellerRegistration;
  approveSeller: (sellerId: string) => void;
  rejectSeller: (sellerId: string) => void;
  
  loginWithMobile: (mobile: string, email?: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  
  addOrder: (order: {
    items: OrderItem[];
    totalINR: number;
    paymentMethod: string;
    shippingAddress: UserAddress;
  }) => UserOrder;
  recordPurchasedProducts: (productIds: string[]) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoginModalOpen: false,

      pendingSellers: [
        {
          id: 'sel-req-101',
          firmName: 'Bhopa Handloom Cooperative',
          ownerName: 'Sunita Devi Bhopa',
          mobile: '9123456789',
          email: 'artisan@bhopacoop.in',
          state: 'Rajasthan',
          city: 'Jodhpur',
          panNumber: 'BHPPD1234F',
          gstinNumber: '08BHPPD1234F1Z5',
          bankAccount: '98765432101234',
          ifscCode: 'SBIN0001234',
          craftSpecialty: 'Bandhani Rai Bandhej Georgette Sarees',
          status: 'pending',
          submittedAt: new Date().toLocaleDateString('en-IN')
        }
      ],

      openLoginModal: () => set({ isLoginModalOpen: true }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),

      registerBuyer: (name, mobile, email) => {
        const cleanMobile = mobile.replace(/\D/g, '');
        const newUser: UserProfile = {
          id: `cust-${Date.now()}`,
          name: name || 'Valued Customer',
          mobile: cleanMobile,
          email: email || 'customer@loomlore.in',
          role: 'customer',
          addresses: [
            {
              id: `addr-${Date.now()}`,
              name: name || 'Valued Customer',
              mobile: cleanMobile || '9876543210',
              pincode: '110001',
              addressLine: 'Flat 402, Royal Residency, Connaught Place',
              city: 'New Delhi',
              state: 'Delhi',
              isDefault: true
            }
          ],
          orders: [],
          purchasedProductIds: []
        };
        set({ user: newUser, isLoggedIn: true, isLoginModalOpen: false });
        return true;
      },

      registerSeller: (data) => {
        const newSeller: SellerRegistration = {
          ...data,
          id: `sel-req-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toLocaleDateString('en-IN')
        };

        set((state) => ({
          pendingSellers: [newSeller, ...state.pendingSellers]
        }));

        return newSeller;
      },

      approveSeller: (sellerId) => {
        set((state) => {
          const sellerReq = state.pendingSellers.find((s) => s.id === sellerId);
          const updatedPending = state.pendingSellers.map((s) =>
            s.id === sellerId ? { ...s, status: 'approved' as SellerStatus } : s
          );

          if (sellerReq && state.user && state.user.email === sellerReq.email) {
            return {
              pendingSellers: updatedPending,
              user: {
                ...state.user,
                role: 'seller',
                sellerStatus: 'approved',
                sellerDetails: { ...sellerReq, status: 'approved' }
              }
            };
          }

          return { pendingSellers: updatedPending };
        });
      },

      rejectSeller: (sellerId) => {
        set((state) => ({
          pendingSellers: state.pendingSellers.map((s) =>
            s.id === sellerId ? { ...s, status: 'rejected' as SellerStatus } : s
          )
        }));
      },

      loginWithMobile: (mobile, email) => {
        const cleanMobile = mobile.replace(/\D/g, '');
        const currentUser = get().user;
        if (currentUser && currentUser.mobile === cleanMobile) {
          set({ isLoggedIn: true, isLoginModalOpen: false });
          return true;
        }

        const newUser: UserProfile = {
          id: `cust-${Date.now()}`,
          name: 'Verified Customer',
          mobile: cleanMobile,
          email: email || 'customer@loomlore.in',
          role: 'customer',
          addresses: [],
          orders: [],
          purchasedProductIds: []
        };
        set({ user: newUser, isLoggedIn: true, isLoginModalOpen: false });
        return true;
      },

      logout: () => set({ user: null, isLoggedIn: false, isLoginModalOpen: false }),

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      },

      addAddress: (newAddr) => {
        set((state) => {
          if (!state.user) return state;
          const created: UserAddress = {
            ...newAddr,
            id: `addr-${Date.now()}`,
            isDefault: state.user.addresses.length === 0 ? true : newAddr.isDefault
          };

          let updatedAddresses = [...state.user.addresses];
          if (created.isDefault) {
            updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
          }
          updatedAddresses.push(created);

          return {
            user: { ...state.user, addresses: updatedAddresses }
          };
        });
      },

      deleteAddress: (addressId) => {
        set((state) => {
          if (!state.user) return state;
          const filtered = state.user.addresses.filter((a) => a.id !== addressId);
          if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
            filtered[0].isDefault = true;
          }
          return {
            user: { ...state.user, addresses: filtered }
          };
        });
      },

      setDefaultAddress: (addressId) => {
        set((state) => {
          if (!state.user) return state;
          const updated = state.user.addresses.map((a) => ({
            ...a,
            isDefault: a.id === addressId
          }));
          return {
            user: { ...state.user, addresses: updated }
          };
        });
      },

      addOrder: (orderData) => {
        const newOrder: UserOrder = {
          id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          trackingId: `LL-TRACK-${Math.floor(1000 + Math.random() * 9000)}`,
          courierPartner: 'BlueDart Express (Handloom Priority)',
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          totalINR: orderData.totalINR,
          paymentMethod: orderData.paymentMethod,
          status: 'Processing',
          estimatedDelivery: '3–5 Business Days',
          shippingAddress: orderData.shippingAddress,
          items: orderData.items
        };

        set((state) => {
          if (!state.user) return state;
          const purchasedIds = new Set([
            ...(state.user.purchasedProductIds || []),
            ...orderData.items.map((i) => i.productId)
          ]);
          return {
            user: {
              ...state.user,
              orders: [newOrder, ...(state.user.orders || [])],
              purchasedProductIds: Array.from(purchasedIds)
            }
          };
        });

        return newOrder;
      },

      recordPurchasedProducts: (productIds) => {
        set((state) => {
          if (!state.user) return state;
          const existing = new Set(state.user.purchasedProductIds || []);
          productIds.forEach((id) => existing.add(id));
          return {
            user: {
              ...state.user,
              purchasedProductIds: Array.from(existing)
            }
          };
        });
      }
    }),
    {
      name: 'loomlore-auth-storage'
    }
  )
);
