'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const StateSceneCanvas = dynamic(() => import('./StateScene'), {
  ssr: false,
  loading: () => null
});

export default function StateSceneLazy(props: { state: import('@/data/india').StateScene }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <StateSceneCanvas {...props} />;
}
