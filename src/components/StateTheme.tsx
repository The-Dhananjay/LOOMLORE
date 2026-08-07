'use client';

import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { STATES, type StateScene } from '@/data/india';
import { findProduct } from '@/data/catalog';

const defaultTheme = {
  bg: '#faeee7',
  surface: '#fffffe',
  primary: '#33272a',
  accent: '#ff8ba7'
};

function stateForPath(pathname: string): StateScene | undefined {
  const stateMatch = pathname.match(/^\/states\/([^/]+)/);
  if (stateMatch) return STATES.find((state) => state.id === stateMatch[1]);

  const productMatch = pathname.match(/^\/catalog\/([^/]+)/);
  if (productMatch) {
    const product = findProduct(productMatch[1]);
    return product ? STATES.find((state) => state.name === product.state) : undefined;
  }
}

export function StateTheme() {
  const pathname = usePathname() ?? '/';
  const state = useMemo(() => stateForPath(pathname), [pathname]);

  useEffect(() => {
    const theme = state
      ? {
          bg: '#faeee7',
          surface: '#fffffe',
          primary: '#33272a',
          accent: '#ff8ba7'
        }
      : defaultTheme;
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-surface', theme.surface);
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-accent', theme.accent);
    root.dataset.stateTheme = state?.id ?? 'default';
  }, [state]);

  return null;
}
