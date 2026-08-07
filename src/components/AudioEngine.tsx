'use client';
import { useEffect, useRef, useState } from 'react';
import { useJourney } from '@/lib/journey';
import { STATES } from '@/data/india';

// A lightweight in-browser audio engine. We don't ship MP3s (no rights) - we
// synthesise a continuous ambient drone using the Web Audio API. Each state
// has its own oscillator tuning, so the "music" actually changes when the
// active state changes. The user can mute/unmute at any time.

type Engine = {
  ctx: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

export function AudioEngine() {
  const [muted, setMuted] = useState(true);
  const [supported, setSupported] = useState(true);
  const engine = useRef<Engine | null>(null);
  const activeState = useJourney((s) => s.activeState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('AudioContext' in window || 'webkitAudioContext' in window)) {
      setSupported(false);
      return;
    }
  }, []);

  function ensureEngine(): Engine {
    if (engine.current) return engine.current;
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    const ctx = new Ctx();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    const oscillators: OscillatorNode[] = [];
    const seedFreqs = [110, 165, 220, 330]; // a quiet drone stack
    for (const f of seedFreqs) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.06;
      osc.connect(g);
      g.connect(gain);
      osc.start();
      oscillators.push(osc);
    }
    engine.current = { ctx, gain, oscillators };
    return engine.current;
  }

  function play() {
    const e = ensureEngine();
    if (e.ctx.state === 'suspended') e.ctx.resume();
    e.gain.gain.cancelScheduledValues(e.ctx.currentTime);
    e.gain.gain.linearRampToValueAtTime(muted ? 0 : 0.18, e.ctx.currentTime + 1.5);
    setMuted(false);
  }
  function pause() {
    const e = engine.current;
    if (!e) return;
    e.gain.gain.cancelScheduledValues(e.ctx.currentTime);
    e.gain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 0.6);
    setMuted(true);
  }

  // Re-tune the drone when the active state changes
  useEffect(() => {
    const e = engine.current;
    if (!e) return;
    const state = STATES.find((s) => s.id === activeState);
    if (!state) return;
    // Use the state id hash to nudge the drone intervals slightly per state
    const seed = (state.id || '').split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    const baseFreq = 90 + (seed % 40);
    e.oscillators.forEach((osc, i) => {
      const f = baseFreq * [1, 1.5, 2, 3][i] + ((seed >> (i + 1)) & 3);
      osc.frequency.linearRampToValueAtTime(f, e.ctx.currentTime + 1.2);
    });
  }, [activeState]);

  if (!supported) return null;

  return (
    <button
      onClick={() => (muted ? play() : pause())}
      aria-label={muted ? 'Play ambient music' : 'Mute ambient music'}
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-ink/80 backdrop-blur"
      title={muted ? 'Play ambient music' : 'Mute ambient music'}
    >
      <span className={`text-gold-shimmer transition-transform ${muted ? '' : 'animate-bloom'}`}>
        {muted ? '~' : '\u266B'}
      </span>
    </button>
  );
}
