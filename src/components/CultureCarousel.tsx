import Link from 'next/link';
import { cultures } from '@/data/catalog';

export function CultureCarousel() {
  return (
    <section className="my-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-earth-500">Shop by weaving cluster</p>
          <h2 className="font-display text-3xl text-maroon-deep sm:text-4xl">A loom in every state</h2>
        </div>
        <Link href="/catalog" className="hidden text-sm font-medium text-maroon-deep underline-offset-4 hover:underline sm:inline">
          View full catalog    
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cultures.map((c) => (
          <Link
            key={c.name}
            href={`/catalog   culture=${encodeURIComponent(c.name)}`}
            className="cloth-card stitched-card group flex h-full flex-col justify-between p-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-earth-500">{c.motif}</p>
              <h3 className="mt-2 font-display text-2xl text-maroon-deep">{c.name}</h3>
              <p className="mt-2 text-sm text-earth-700">{c.tagline}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span
                className={`inline-block h-2 w-24 rounded-full bg-gradient-to-r ${c.accent}`}
                aria-hidden
              />
              <span className="text-xs font-semibold text-maroon-deep">Shop    </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
