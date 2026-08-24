import Link from 'next/link';
import { STATES, stateById, type StateId } from '@/data/india';
import { products } from '@/data/catalog';
import { ProductCard } from '@/components/ProductCard';
import { StateProductsGrid } from '@/components/StateProductsGrid';
import { formatINR, splitGST, deliveryEtaDays, INDIAN_PAYMENTS } from '@/lib/india';

export default function StatePage({ params }: { params: { id: string } }) {
  const state = stateById(params.id as StateId);
  if (!state) return <div className="p-32 text-center text-[#33272a] bg-[#faeee7]">State not found.</div>;

  // STRICT REGION ISOLATION: Show ONLY garments belonging to this specific state!
  const stateProducts = products.filter(
    (item) => item.state.toLowerCase().trim() === state.name.toLowerCase().trim()
  );

  const womenProduct = stateProducts.find((p) => p.gender === 'Women') ?? stateProducts[0];
  const menProduct = stateProducts.find((p) => p.gender === 'Men') ?? stateProducts[1] ?? stateProducts[0];

  const eta = deliveryEtaDays(state.capital);
  const gst = splitGST(state.priceINR, 5);

  return (
    <div className="bg-[#faeee7] text-[#33272a] font-sans">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden border-b border-[#33272a]/15 bg-gradient-to-b from-[#ffc6c7]/40 via-[#faeee7] to-[#fffffe] px-6 pb-16 pt-32 lg:px-10 lg:pb-20">
        <div className="mx-auto w-full max-w-7xl">
          <p className="label-eyebrow text-xs">The {state.name} Heritage Archive</p>
          <h1 className="display-h mt-3 text-[clamp(3.5rem,7vw,6.5rem)] leading-none text-[#33272a]">{state.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-[#594a4e] leading-relaxed">
            {state.weather}. {state.architecture}.
          </p>
        </div>
      </section>

      {/* Signature Craft Overview Section — Balanced 2-Column Layout */}
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
        {/* Left Column: Heritage Story & Traditional Garment Details */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="label-eyebrow text-xs">Signature Handloom Craft</p>
            <h2 className="display-h mt-3 text-4xl leading-tight text-[#33272a] sm:text-5xl">{state.signatureGarment}</h2>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">
              {state.fabric} · {state.embroidery}
            </p>
            <p className="mt-6 text-base leading-8 text-[#594a4e]">{state.artisanStory}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#33272a]/70 font-semibold">
              Handcrafted by {state.artisan}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="royal-card p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Women Traditional</p>
              <p className="mt-1.5 text-base leading-snug text-[#33272a] font-semibold">{state.womenGarment}</p>
            </div>
            <div className="royal-card p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Men Traditional</p>
              <p className="mt-1.5 text-base leading-snug text-[#33272a] font-semibold">{state.menGarment}</p>
            </div>
            <div className="royal-card p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Occasion</p>
              <p className="mt-1.5 text-sm leading-snug text-[#33272a] font-medium">{state.occasion}</p>
            </div>
            <div className="royal-card p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Music &amp; Atmosphere</p>
              <p className="mt-1.5 text-sm leading-snug text-[#33272a] font-medium">{state.music}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Women & Men Garments Showcase Cards */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="label-eyebrow text-xs">Featured {state.name} Garments</p>
            <span className="text-xs text-[#594a4e]">Handloom Authenticated</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Featured Women Garment Card */}
            {womenProduct && (
              <div className="group overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-3 shadow-md transition hover:-translate-y-1 hover:border-[#ff8ba7] hover:shadow-xl">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#faeee7]">
                  <img src={womenProduct.image} alt={womenProduct.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#ff8ba7] px-3 py-1 text-[9px] uppercase tracking-wider text-[#33272a] font-bold">
                    Women's Heirloom
                  </span>
                </div>
                <div className="p-3 pt-4">
                  <h3 className="display-h text-xl text-[#33272a] line-clamp-1">{womenProduct.name}</h3>
                  <p className="mt-1 text-xs text-[#594a4e]">{womenProduct.fabric}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="display-h text-xl font-bold text-[#33272a]">{formatINR(womenProduct.priceINR)}</span>
                    <Link
                      href={`/catalog/${womenProduct.slug}`}
                      className="rounded-full bg-[#ff8ba7] px-4 py-1.5 text-[10px] uppercase tracking-wider text-[#33272a] font-bold transition hover:bg-[#ffc6c7]"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Featured Men Garment Card */}
            {menProduct && (
              <div className="group overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-3 shadow-md transition hover:-translate-y-1 hover:border-[#ff8ba7] hover:shadow-xl">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#faeee7]">
                  <img src={menProduct.image} alt={menProduct.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#33272a] px-3 py-1 text-[9px] uppercase tracking-wider text-[#fffffe] font-bold">
                    Men's Heirloom
                  </span>
                </div>
                <div className="p-3 pt-4">
                  <h3 className="display-h text-xl text-[#33272a] line-clamp-1">{menProduct.name}</h3>
                  <p className="mt-1 text-xs text-[#594a4e]">{menProduct.fabric}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="display-h text-xl font-bold text-[#33272a]">{formatINR(menProduct.priceINR)}</span>
                    <Link
                      href={`/catalog/${menProduct.slug}`}
                      className="rounded-full bg-[#ff8ba7] px-4 py-1.5 text-[10px] uppercase tracking-wider text-[#33272a] font-bold transition hover:bg-[#ffc6c7]"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3 STATE OPTIONS GRID SECTION (1. CLOTHES, 2. JEWELRY, 3. FULL COMBOS) */}
      <section className="border-t border-[#33272a]/15 bg-[#fffffe] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-eyebrow text-xs">State Options &amp; Combos</p>
              <h2 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">
                3 Options of {state.name}: Clothes, Jewelry &amp; Royal Combos.
              </h2>
              <p className="mt-2 text-sm text-[#594a4e] max-w-2xl">
                Choose between traditional garments, authentic state ornaments, or complete royal heritage combo sets!
              </p>
            </div>
            <Link href="/catalog" className="ghost-button text-xs">
              View All 28 States Catalog →
            </Link>
          </div>

          {/* Interactive 3-Option Tabbed Product Grid */}
          <StateProductsGrid stateName={state.name} products={stateProducts} />
        </div>
      </section>

      {/* Pricing & Payments Bar */}
      <section className="border-y border-[#33272a]/15 bg-[#faeee7]">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-12 lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#ff8ba7] font-bold">State Craft Price Range</p>
            <p className="display-h mt-1 text-3xl text-[#33272a]">{formatINR(state.priceINR)}</p>
            <p className="mt-1 text-xs text-[#594a4e]">{formatINR(gst.base)} + {formatINR(gst.gst)} GST</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {INDIAN_PAYMENTS.slice(0, 5).map((method) => (
              <span key={method.id} className="rounded-full border border-[#33272a]/15 bg-[#fffffe] px-3.5 py-1.5 text-[11px] text-[#33272a] font-semibold shadow-xs">
                {method.label}
              </span>
            ))}
          </div>
          <Link href="/catalog" className="wax-button text-xs px-7 py-3">
            Shop All Traditional Clothes
          </Link>
        </div>
      </section>

      {/* Continue Exploring */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="label-eyebrow text-xs">Explore Other Indian States</p>
        <div className="mt-6 flex flex-wrap gap-3 font-sans">
          {STATES.filter((item) => item.id !== state.id).slice(0, 10).map((item) => (
            <Link key={item.id} href={`/states/${item.id}`} className="ghost-button text-xs">
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
