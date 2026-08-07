import type { StateScene } from '@/data/india';

// A lightweight visual backdrop. The original WebGL scene made every state page
// expensive to open, especially on phones and lower-powered laptops.
export default function StateCanvas({ state }: { state: StateScene }) {
  return (
    <div
      aria-hidden
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${state.palette.ground}, ${state.palette.primary})` }}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at 74% 32%, ${state.palette.accent} 0%, transparent 22%), radial-gradient(ellipse at 18% 84%, rgba(0,0,0,.58) 0%, transparent 48%)`
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,.48),transparent_60%,rgba(0,0,0,.3))]" />
      <p className="absolute bottom-8 right-8 max-w-[13rem] text-right font-serif text-[clamp(2rem,6vw,5rem)] italic leading-none text-white/15">
        {state.signatureGarment}
      </p>
    </div>
  );
}
