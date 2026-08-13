import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StoreSettings = {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  noticeBanner: string;
  enableNoticeBanner: boolean;
  currency: string;
  gstRatePct: number;
  freeShippingThresholdINR: number;
};

type StoreSettingsState = {
  settings: StoreSettings;
  updateSettings: (partial: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
};

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'LOOMLORE',
  tagline: 'Heirlooms of India',
  supportEmail: 'care@loomlore.in',
  supportPhone: '+91 98765 43210',
  address: 'Heritage Textile Pavilion, Janpath, New Delhi - 110001',
  noticeBanner: '✨ Pan-India Free Shipping on Handloom Orders Above ₹1,500 | 100% Authentic Weaver Co-Op Certified',
  enableNoticeBanner: true,
  currency: 'INR',
  gstRatePct: 5,
  freeShippingThresholdINR: 1500
};

export const useStoreSettings = create<StoreSettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial }
        })),
      resetToDefaults: () => set({ settings: DEFAULT_SETTINGS })
    }),
    {
      name: 'loomlore-store-settings'
    }
  )
);
