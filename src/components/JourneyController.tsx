'use client';
import { useEffect } from 'react';
import { useJourney } from '@/lib/journey';
import { STATES } from '@/data/india';

// Watches the homepage scroll position and updates the active state in the
// Zustand journey store. This is what feeds the audio engine and the
// 3D camera dolly. Runs on the client only.
export function JourneyController() {
  const setActiveState = useJourney((s) => s.setActiveState);
  useEffect(() => {
    function onScroll() {
      const panels = document.querySelectorAll('[data-state-panel]');
      const trigger = window.innerHeight * 0.5;
      let bestId: string | null = null;
      let bestDist = Infinity;
      panels.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - trigger);
        if (rect.top < window.innerHeight && rect.bottom > 0 && dist < bestDist) {
          bestDist = dist;
          bestId = (el as HTMLElement).dataset.statePanel || null;
        }
      });
      if (bestId) setActiveState(bestId);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [setActiveState]);
  // Render an invisible list of named anchors so the controller can find them.
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {STATES.map((s) => (
        <div key={s.id} data-state-panel={s.id} className="absolute inset-0" aria-hidden />
      ))}
    </div>
  );
}
