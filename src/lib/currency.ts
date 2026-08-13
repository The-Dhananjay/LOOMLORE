import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export type CurrencyInfo = {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateVsINR: number; // 1 INR = X Currency
};

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateVsINR: 1 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateVsINR: 0.012 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateVsINR: 0.011 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateVsINR: 0.0094 },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rateVsINR: 0.044 }
};

type CurrencyState = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceINR: number) => string;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'INR',
      setCurrency: (code: CurrencyCode) => set({ currency: code }),
      formatPrice: (priceINR: number) => {
        const activeCode = get().currency || 'INR';
        const info = CURRENCIES[activeCode] || CURRENCIES.INR;
        const converted = Math.round(priceINR * info.rateVsINR);

        if (activeCode === 'INR') {
          return `₹${priceINR.toLocaleString('en-IN')}`;
        }
        return `${info.symbol}${converted.toLocaleString('en-US')}`;
      }
    }),
    {
      name: 'loomlore-currency-storage'
    }
  )
);

export function formatPriceWithCurrency(priceINR: number, currencyCode: CurrencyCode = 'INR'): string {
  const info = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = Math.round(priceINR * info.rateVsINR);

  if (currencyCode === 'INR') {
    return `₹${priceINR.toLocaleString('en-IN')}`;
  }
  return `${info.symbol}${converted.toLocaleString('en-US')}`;
}
