'use client';
import { useEffect, useRef } from 'react';

export function NeedleCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    let raf = 0;
    let mx = 0, my = 0;
    let tx = 0, ty = 0;
    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }
    function loop() {
      mx += (tx - mx) * 0.18;
      my += (ty - my) * 0.18;
      const target = el;
      if (target) target.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="needle-dot" aria-hidden />;
}
