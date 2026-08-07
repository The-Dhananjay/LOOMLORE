'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StateScene } from '@/data/india';

type Stage = 'idle' | 'folding' | 'boxed' | 'sealed' | 'ribbon';

export default function ProductViewer({ state }: { state: StateScene }) {
  const [angle, setAngle] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [ar, setAr] = useState(false);
  const [stage, setStage] = useState<Stage>('idle');

  function startAddToCart() {
    setStage('folding');
    setTimeout(() => setStage('boxed'), 700);
    setTimeout(() => setStage('sealed'), 1400);
    setTimeout(() => setStage('ribbon'), 2100);
    setTimeout(() => setStage('idle'), 3200);
  }

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl" style={{ background: `radial-gradient(circle at center, ${state.palette.primary} 0%, ${state.palette.ground} 70%)` }}>
        <motion.div
          className="absolute inset-0 grid place-items-center text-ivory"
          animate={{ rotateY: angle, scale: zoom }}
          transition={{ type: 'spring', stiffness: 80, damping: 14 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(_, info) => setAngle((prev) => prev + info.delta.x * 0.6)}
        >
          <div className="text-center">
            <p className="label-eyebrow">360  viewer</p>
            <p className="display-h mt-3 text-3xl">{state.signatureGarment}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold-shimmer">{state.embroidery}</p>
          </div>
        </motion.div>

        <AnimatePresence>
          {stage !== 'idle' && (
            <motion.div
              className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StageIllustration stage={stage} state={state} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-ivory/80">
          <span>{state.highlight}</span>
          <button onClick={() => setAr((v) => !v)} className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
            {ar ? 'AR on' : 'AR ready'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))} className="ghost-button">-</button>
        <div className="h-1 flex-1 rounded-full bg-gold/20">
          <div className="h-full rounded-full bg-gold-shimmer" style={{ width: `${Math.min(100, zoom * 40)}%` }} />
        </div>
        <button onClick={() => setZoom((z) => Math.min(2, z + 0.2))} className="ghost-button">+</button>
        <button onClick={() => setAngle((a) => a + 45)} className="ghost-button">Spin 45 </button>
      </div>

      <button onClick={startAddToCart} className="wax-button mt-6 w-full">
        Add to cart - cinematic animation
      </button>
    </div>
  );
}

function StageIllustration({ stage, state }: { stage: Stage; state: StateScene }) {
  const labels: Record<Stage, string> = {
    idle: '',
    folding: 'Artisan folds the cloth ',
    boxed: 'Placed inside a handcrafted box.',
    sealed: 'A wax seal is pressed in gold.',
    ribbon: 'A silk ribbon is tied. Cart updated.'
  };
  return (
    <div className="text-center">
      <motion.div
        className="mx-auto h-40 w-40 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${state.palette.primary}, ${state.palette.ground})`,
          boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.4)'
        }}
        animate={{
          scale: stage === 'folding' ? 0.6 : stage === 'boxed' ? 0.9 : 1,
          rotate: stage === 'sealed' ? 0 : stage === 'ribbon' ? -3 : 0,
          borderRadius: stage === 'folding' ? '40%' : '12px'
        }}
        transition={{ duration: 0.6 }}
      />
      <p className="display-h mt-6 text-2xl italic text-gold-shimmer">{labels[stage]}</p>
      <div className="mx-auto mt-6 flex items-center justify-center gap-2">
        {(['folding', 'boxed', 'sealed', 'ribbon'] as Stage[]).map((s, i) => (
          <span
            key={s}
            className={`h-1.5 w-8 rounded-full ${stage === s ? 'bg-gold-shimmer' : 'bg-ivory/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
