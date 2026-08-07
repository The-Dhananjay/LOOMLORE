import Link from 'next/link';
import { INDIAN_FESTIVALS } from '@/lib/india';

export const metadata = { title: 'Festival Edits — Loomlore' };

export default function FestivalsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 bg-[#fff5f7] text-[#2b0914] font-sans">
      <header className="max-w-3xl">
        <p className="label-eyebrow font-sans text-xs">The Indian Festival Calendar</p>
        <h1 className="display-h mt-3 text-5xl text-[#831843] sm:text-6xl">Festival Edits.</h1>
        <p className="mt-4 text-base leading-relaxed text-[#4c0519]/75 font-sans">
          From Diwali bandhani to Onam kasavu, Baisakhi phulkari, and Navratri mirror work garba lehengas.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INDIAN_FESTIVALS.map((f) => (
          <Link
            key={f.id}
            href={`/catalog?occasion=${encodeURIComponent(f.name)}`}
            className="royal-card group p-6 transition-all duration-300 hover:border-[#f43f5e] hover:shadow-lg"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#f43f5e] font-semibold">{f.date}</p>
            <h2 className="display-h mt-2 text-3xl text-[#831843] group-hover:text-[#be123c] transition">{f.name}</h2>
            <p className="mt-3 text-sm text-[#4c0519]/80 font-medium">{f.tagline}</p>
            <span className="mt-4 inline-flex text-xs uppercase tracking-wider text-[#f43f5e] font-semibold group-hover:translate-x-1 transition">
              Explore {f.name} Edits →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
