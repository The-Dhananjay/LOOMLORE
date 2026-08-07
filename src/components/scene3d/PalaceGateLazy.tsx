'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const PalaceGate = dynamic(() => import('./PalaceGate'), {
  ssr: false,
  loading: () => null
});

export default function PalaceGateLazy() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <PalaceGate />;
}
