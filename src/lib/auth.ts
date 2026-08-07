import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'seller' | 'admin';
export type SellerStatus = 'pending' | 'approved' | 'rejected';

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
  
  sendOTP: (mobile: string) => boolean;
  verifyOTP: (mobile: string, otp: string) => boolean;
  loginWithMobile: (mobile: string, email?: string) => boolean;
  loginAsDemoCustomer: () => void;
  loginAsDemoSeller: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  recordPurchasedProducts: (productIds: string[]) => void;
};

export const DEMO_CUSTOMER_MOBILE = '9876543210';
export const DEMO_SELLER_MOBILE = '9123456789';
export const DEMO_ADMIN_MOBILE = '9999999999';
export const DEMO_OTP = '123456';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        id: 'usr-demo-01',
        name: 'Rohan Sharma',
        mobile: DEMO_CUSTOMER_MOBILE,
        email: 'rohan.sharma@example.com',
        role: 'customer',
        addresses: [
          {
            id: 'addr-01',
            name: 'Rohan Sharma',
            mobile: '9876543210',
            pincode: '110001',
            addressLine: 'Flat 402, Royal Residency, Connaught Place',
            city: 'New Delhi',
            state: 'Delhi',
            isDefault: true
          }
        ],
        purchasedProductIds: ['raj-w-01']
      },
      isLoggedIn: true,
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
          submittedAt: new Date(Date.now() - 3600000 * 2).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        }
      ],

      openLoginModal: () => set({ isLoginModalOpen: true }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),

      registerBuyer: (name, mobile, email) => {
        const cleanMobile = mobile.replace(/\D/g, '');
        if (cleanMobile.length !== 10 || !email.includes('@')) return false;

        const newUser: UserProfile = {
          id: `cust-${Date.now()}`,
          name,
          mobile: cleanMobile,
          email,
          role: 'customer',
          addresses: []
        };

        set({ user: newUser, isLoggedIn: true, isLoginModalOpen: false });
        return true;
      },

      registerSeller: (sellerData) => {
        const id = `sel-req-${Date.now()}`;
        const registration: SellerRegistration = {
          ...sellerData,
          id,
          status: 'pending',
          submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        const sellerUser: UserProfile = {
          id: `user-sel-${Date.now()}`,
          name: sellerData.ownerName,
          mobile: sellerData.mobile,
          email: sellerData.email,
          role: 'seller',
          sellerStatus: 'pending',
          sellerDetails: registration,
          addresses: []
        };

        set((state) => ({
          pendingSellers: [registration, ...state.pendingSellers],
          user: sellerUser,
          isLoggedIn: true,
          isLoginModalOpen: false
        }));

        return registration;
      },

      approveSeller: (sellerId) => {
        set((state) => {
          const updatedSellers = state.pendingSellers.map((s) =>
            s.id === sellerId ? { ...s, status: 'approved' as SellerStatus } : s
          );
          const currentIsThisSeller = state.user?.sellerDetails?.id === sellerId;
          return {
            pendingSellers: updatedSellers,
            user: currentIsThisSeller && state.user
              ? {
                  ...state.user,
                  sellerStatus: 'approved',
                  sellerDetails: state.user.sellerDetails ? { ...state.user.sellerDetails, status: 'approved' } : undefined
                }
              : state.user
          };
        });
      },

      rejectSeller: (sellerId) => {
        set((state) => ({
          pendingSellers: state.pendingSellers.map((s) =>
            s.id === sellerId ? { ...s, status: 'rejected' as SellerStatus } : s
          )
        }));
      },

      sendOTP: (mobile) => {
        const clean = mobile.replace(/\D/g, '');
        return clean.length === 10;
      },

      verifyOTP: (mobile, otp) => {
        const cleanMobile = mobile.replace(/\D/g, '');
        const cleanOtp = otp.trim();
        if (cleanOtp === DEMO_OTP || cleanOtp === '654321') {
          return get().loginWithMobile(cleanMobile);
        }
        return false;
      },

      loginWithMobile: (mobile, email) => {
        const cleanMobile = mobile.replace(/\D/g, '');
        if (cleanMobile === DEMO_SELLER_MOBILE) {
          get().loginAsDemoSeller();
          return true;
        }
        if (cleanMobile === DEMO_ADMIN_MOBILE) {
          get().loginAsDemoAdmin();
          return true;
        }

        const newUser: UserProfile = {
          id: `cust-${Date.now()}`,
          name: 'Verified Customer',
          mobile: cleanMobile,
          email: email || 'customer@loomlore.in',
          role: 'customer',
          addresses: []
        };
        set({ user: newUser, isLoggedIn: true, isLoginModalOpen: false });
        return true;
      },

      loginAsDemoCustomer: () => {
        set({
          user: {
            id: 'usr-demo-01',
            name: 'Rohan Sharma',
            mobile: DEMO_CUSTOMER_MOBILE,
            email: 'rohan.sharma@example.com',
            role: 'customer',
            addresses: [
              {
                id: 'addr-01',
                name: 'Rohan Sharma',
                mobile: DEMO_CUSTOMER_MOBILE,
                pincode: '110001',
                addressLine: 'Flat 402, Royal Residency, Connaught Place',
                city: 'New Delhi',
                state: 'Delhi',
                isDefault: true
              }
            ]
          },
          isLoggedIn: true,
          isLoginModalOpen: false
        });
      },

      loginAsDemoSeller: () => {
        set({
          user: {
            id: 'usr-seller-01',
            name: 'Bhopa Handloom Cooperative',
            mobile: DEMO_SELLER_MOBILE,
            email: 'artisan@bhopacoop.in',
            role: 'seller',
            sellerStatus: 'approved',
            sellerDetails: {
              id: 'sel-req-101',
              firmName: 'Bhopa Handloom Cooperative',
              ownerName: 'Sunita Devi Bhopa',
              mobile: DEMO_SELLER_MOBILE,
              email: 'artisan@bhopacoop.in',
              state: 'Rajasthan',
              city: 'Jodhpur',
              panNumber: 'BHPPD1234F',
              gstinNumber: '08BHPPD1234F1Z5',
              bankAccount: '98765432101234',
              ifscCode: 'SBIN0001234',
              craftSpecialty: 'Bandhani Rai Bandhej Georgette Sarees',
              status: 'approved',
              submittedAt: 'Verified 2026'
            },
            addresses: []
          },
          isLoggedIn: true,
          isLoginModalOpen: false
        });
      },

      loginAsDemoAdmin: () => {
        set({
          user: {
            id: 'usr-admin-01',
            name: 'Loomlore Review Team (Admin)',
            mobile: DEMO_ADMIN_MOBILE,
            email: 'audit@loomlore.in',
            role: 'admin',
            addresses: []
          },
          isLoggedIn: true,
          isLoginModalOpen: false
        });
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
          const id = `addr-${Date.now()}`;
          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, { ...newAddr, id }]
            }
          };
        });
      },

      recordPurchasedProducts: (productIds) => {
        set((state) => {
          if (!state.user) return state;
          const current = state.user.purchasedProductIds || [];
          const updated = Array.from(new Set([...current, ...productIds]));
          return {
            user: {
              ...state.user,
              purchasedProductIds: updated
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
