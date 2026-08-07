'use client';
import { useEffect } from 'react';
import { useJourney } from '@/lib/journey';
import { JourneyController } from './JourneyController';
import { AudioEngine } from './AudioEngine';

// Cinematic scroll-progress bar pinned to the top of the viewport.
// Reads window.scrollY and exposes a 0..1 progress value for the scroll-bound 3D scenes.
export function CinematicShell({ children }: { children: React.ReactNode }) {
  const setProgress = useJourney((s) => s.setProgress);
  useEffect(() => {
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      setProgress(p);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [setProgress]);
  return (
    <>
      <ProgressBar />
      <JourneyController />
      {children}
      <AudioEngine />
    </>
  );
}

function ProgressBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        className="h-full"
        style={{
          background: 'linear-gradient(90deg, #caa14a 0%, #f1d68a 50%, #caa14a 100%)',
          width: 'var(--progress, 0%)',
          boxShadow: '0 0 10px rgba(202,161,74,0.6)'
        }}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            "setInterval(function(){var p=(window.__loomlore_progress||0)*100;document.documentElement.style.setProperty('--progress',p+'%')},40);"
        }}
      />
    </div>
  );
}
