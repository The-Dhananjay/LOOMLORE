'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const IndiaMap = dynamic(() => import('./IndiaMap'), {
  ssr: false,
  loading: () => null
});

export default function IndiaMapLazy() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <IndiaMap />;
}
