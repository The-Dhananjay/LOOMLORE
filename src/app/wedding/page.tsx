import Link from 'next/link';
import { STATES } from '@/data/india';

export const metadata = { title: 'Bridal & Wedding Collection — Loomlore' };

export default function WeddingPage() {
  const states = STATES.filter((s) => s.occasion === 'Wedding');

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 bg-[#faeee7] text-[#33272a] font-sans">
      <header className="max-w-3xl">
        <p className="label-eyebrow text-xs">The Heirloom Wedding Reserve</p>
        <h1 className="display-h mt-3 text-5xl text-[#33272a] sm:text-6xl">Bridal &amp; Wedding Collection.</h1>
        <p className="mt-4 text-base leading-relaxed text-[#594a4e]">
          Handwoven Kanjeevaram silk sarees, Banarasi zardozi drapes, Mughal velvet sherwanis, and Kashmir pashminas for the bride, groom, and wedding party.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((s) => (
          <Link
            key={s.id}
            href={`/states/${s.id}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8ba7] hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#ff8ba7] font-bold">{s.capital}</span>
                <span className="rounded-full bg-[#faeee7] px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-[#33272a] font-bold">
                  {s.fabric}
                </span>
              </div>

              <h2 className="display-h mt-3 text-3xl text-[#33272a] group-hover:text-[#ff8ba7] transition">{s.name}</h2>
              <p className="mt-2 text-sm text-[#594a4e] font-medium leading-snug">{s.signatureGarment}</p>

              <div className="mt-5 space-y-1.5 border-t border-[#33272a]/10 pt-4 text-xs">
                <p className="text-[11px] text-[#594a4e]">
                  <strong className="text-[#33272a]">Women:</strong> {s.womenGarment}
                </p>
                <p className="text-[11px] text-[#594a4e]">
                  <strong className="text-[#33272a]">Men:</strong> {s.menGarment}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#33272a]/10 pt-4">
              <span className="text-xs uppercase tracking-wider text-[#33272a] font-bold group-hover:text-[#ff8ba7] transition">
                Explore Wedding Craft →
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#594a4e]/60">
                {s.artisan}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
