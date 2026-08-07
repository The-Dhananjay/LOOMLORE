import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/catalog';

const featured = [
  products[0], // Banarasi Zardozi Saree
  products[1], // Kanjeevaram Bridal Saree
  products[6], // Mughal Court Sherwani
  products[7], // Kashmir Sozni Pashmina Shawl
  products[2], // Lucknowi Chikankari Anarkali
  products[8]  // Yeola Paithani Saree
];

const regions = [
  { state: 'uttar-pradesh', label: 'North India', title: 'The Romance of Banarasi', text: 'Rich silk, fine chikankari and zardozi handwork passed between generations.', image: products[0].image },
  { state: 'tamil-nadu', label: 'South India', title: 'Temple Silk & Korvai Borders', text: 'Luminous Kanjeevaram borders hand-twisted by master weavers.', image: products[1].image },
  { state: 'rajasthan', label: 'West India', title: 'Bandhani & Mirror Work', text: 'Hand-tied bandhej dots and mirror work built for celebration.', image: products[3].image }
];

export default function HomePage() {
  return (
    <div className="bg-[#fff5f7] text-[#2b0914]">
      {/* Clean, Minimal Hero Section (Pink, White & Deep Wine Palette) */}
      <section className="relative isolate overflow-hidden border-b border-rose-200/60 bg-gradient-to-b from-[#fff0f3] via-[#fff5f7] to-[#ffffff] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
            <div>
              <p className="label-eyebrow font-sans text-xs tracking-[0.35em]">
                A Living Archive of Indian Textiles
              </p>
              <h1 className="display-h mt-4 text-[clamp(3.8rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#831843]">
                INDIA
              </h1>
              <p className="display-h mt-2 text-[clamp(1.8rem,4vw,3.2rem)] italic text-[#f43f5e] font-normal">
                Every Thread Has A Story.
              </p>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#4c0519]/80 sm:text-lg">
                Discover traditional Indian clothing from all 28 states — handwoven sarees, lehengas, sherwanis, anarkalis, and cashmere pashminas crafted by master artisans.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/catalog" className="wax-button px-8 py-3.5 text-xs">
                  Shop New Collection
                </Link>
                <Link href="/states" className="ghost-button px-8 py-3.5 text-xs">
                  Explore 28 States
                </Link>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-rose-200/80 pt-6 text-xs text-[#831843]">
                <div>
                  <span className="block display-h text-xl sm:text-2xl text-[#be123c]">28 States</span>
                  <span className="text-[#4c0519]/70 font-sans">Craft Lineages</span>
                </div>
                <div>
                  <span className="block display-h text-xl sm:text-2xl text-[#be123c]">100% Authentic</span>
                  <span className="text-[#4c0519]/70 font-sans">Named Artisan Co-ops</span>
                </div>
                <div>
                  <span className="block display-h text-xl sm:text-2xl text-[#be123c]">INR & GST</span>
                  <span className="text-[#4c0519]/70 font-sans">Pan-India Delivery</span>
                </div>
              </div>
            </div>

            {/* Clean Editorial Hero Image Frame */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="overflow-hidden rounded-3xl border border-rose-200 bg-white p-3 shadow-[0_30px_60px_-20px_rgba(131,24,67,0.15)]">
                <img
                  src={products[0].image}
                  alt="Banarasi Zardozi Saree"
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 max-w-[17rem] rounded-2xl border border-rose-200 bg-white/95 p-4 shadow-xl backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#f43f5e] font-sans font-semibold">Heirloom Highlight</p>
                <p className="display-h mt-1 text-xl text-[#831843]">{products[0].name}</p>
                <p className="mt-1 text-xs text-[#4c0519]/70 font-sans">Pit-loom woven in Varanasi →</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clothing Variety Section (Pink & White Cards Grid) */}
      <section className="border-y border-rose-200/60 bg-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="label-eyebrow font-sans text-xs">Curated Textile Heirlooms</p>
              <h2 className="display-h mt-2 text-4xl text-[#831843] sm:text-5xl">Traditional Clothing Variety.</h2>
              <p className="mt-2 text-sm text-[#4c0519]/70 max-w-xl font-sans">
                Handwoven Sarees, Lehengas, Zardozi Sherwanis, Anarkalis, and Pashmina Cashmere Shawls.
              </p>
            </div>
            <Link href="/catalog" className="ghost-button">View All Clothing ({products.length}) →</Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Regional Exploration Cards */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <p className="label-eyebrow font-sans text-xs">Interactive Regional Discovery</p>
          <h2 className="display-h mt-2 text-4xl text-[#831843] sm:text-5xl">28 States. 28 Unique Textures.</h2>
          <p className="mt-4 leading-7 text-[#4c0519]/75 font-sans">Every region brings its own weavers, colors, embroidery styles, and regional heritage.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {regions.map((region) => (
            <Link
              key={region.state}
              href={`/states/${region.state}`}
              className="group relative min-h-[28rem] overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-lg transition duration-300 hover:border-[#f43f5e]"
            >
              <img
                src={region.image}
                alt={region.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4c0519]/90 via-[#4c0519]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#fbcfe8] font-sans font-semibold">{region.label}</p>
                <h3 className="display-h mt-2 text-3xl text-white group-hover:text-[#fbcfe8] transition">{region.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/85 font-sans">{region.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-white group-hover:text-[#fbcfe8] transition font-sans font-semibold">
                  Explore Craft →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Loom to Wardrobe Quality Section */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-8 rounded-3xl border border-rose-200 bg-white p-8 sm:p-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end shadow-lg">
          <div>
            <p className="label-eyebrow font-sans text-xs">Pure Craftsmanship</p>
            <h2 className="display-h mt-3 text-4xl leading-tight text-[#831843]">The details should feel as beautiful as the cloth.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 font-sans">
            <p className="border-l-2 border-[#f43f5e] pl-4 text-sm leading-6 text-[#4c0519]/80">
              <strong className="block font-semibold text-[#831843] text-base mb-1">Named Maker Co-ops</strong>
              Know the artisan atelier, loom location, and heritage story behind every thread.
            </p>
            <p className="border-l-2 border-[#f43f5e] pl-4 text-sm leading-6 text-[#4c0519]/80">
              <strong className="block font-semibold text-[#831843] text-base mb-1">GST & Fair Pay</strong>
              Direct artisan partnerships ensuring fair wages and official GST invoice breakdown.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
