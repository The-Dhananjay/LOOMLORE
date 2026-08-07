'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP-driven camera dolly. On every state panel, the camera position is
// translated on the Y axis as the user scrolls through the panel, giving a
// true "scrolling moves the camera, not the page" experience.
export function GsapCameraDolly() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const panels = el.querySelectorAll('[data-gsap-dolly]');
    const triggers: ScrollTrigger[] = [];
    panels.forEach((panel) => {
      const tween = gsap.fromTo(
        panel,
        { y: 60, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true
          }
        }
      );
      triggers.push(tween.scrollTrigger!);
    });
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);
  return <div ref={root} className="contents" />;
}
