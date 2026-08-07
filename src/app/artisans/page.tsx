import { STATES } from '@/data/india';

export const metadata = { title: 'Master Artisans — Loomlore' };

export default function ArtisansPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 bg-[#faeee7] text-[#33272a] font-sans">
      <header className="max-w-3xl">
        <p className="label-eyebrow text-xs">The Hands Behind The Looms</p>
        <h1 className="display-h mt-3 text-5xl text-[#33272a] sm:text-6xl">Master Artisans.</h1>
        <p className="mt-4 text-base leading-relaxed text-[#594a4e]">
          Every Loomlore garment is signed by the artisan who handwove it. Direct fair-trade partnerships across 28 weaver clusters.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STATES.map((s) => (
          <div key={s.id} className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs font-sans">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ff8ba7] font-bold">{s.name}</p>
            <h2 className="display-h mt-2 text-2xl text-[#33272a]">{s.artisan}</h2>
            <p className="mt-3 text-sm text-[#594a4e] leading-relaxed font-medium">{s.artisanStory}</p>
            <p className="mt-4 text-xs text-[#33272a] font-semibold">{s.fabric} · {s.signatureGarment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
