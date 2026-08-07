'use client';
import { create } from 'zustand';

type Journey = {
  progress: number;
  activeState: string | null;
  cartOpen: boolean;
  setProgress: (n: number) => void;
  setActiveState: (id: string | null) => void;
  setCartOpen: (v: boolean) => void;
};

export const useJourney = create<Journey>((set) => ({
  progress: 0,
  activeState: null,
  cartOpen: false,
  setProgress: (n) => {
    if (typeof window !== 'undefined') (window as any).__loomlore_progress = n;
    set({ progress: n });
  },
  setActiveState: (id) => set({ activeState: id }),
  setCartOpen: (v) => set({ cartOpen: v })
}));
