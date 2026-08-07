import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/catalog';
import { formatINR } from '@/lib/india';

const featured = [
  products[0], // Bandhani Saree
  products[1], // Kanjeevaram Saree
  products[6], // Mughal Sherwani
  products[7], // Sozni Pashmina Shawl
  products[2], // Chikankari Anarkali
  products[8]  // Yeola Paithani Saree
];

const regions = [
  { state: 'uttar-pradesh', label: 'North India', title: 'The Romance of Banarasi', text: 'Rich silk, fine chikankari and zardozi handwork passed between generations.', image: products[0].image },
  { state: 'tamil-nadu', label: 'South India', title: 'Temple Silk & Korvai Borders', text: 'Luminous Kanjeevaram borders hand-twisted by master weavers.', image: products[1].image },
  { state: 'rajasthan', label: 'West India', title: 'Bandhani & Mirror Work', text: 'Hand-tied bandhej dots and mirror work built for celebration.', image: products[3].image }
];

export default function HomePage() {
  const heroProduct = products[0];

  return (
    <div className="bg-[#faeee7] text-[#33272a] font-sans">
      {/* Clean, High-Fashion Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-[#33272a]/15 bg-[#faeee7] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Left Column: Editorial Headline & Value Props */}
            <div>
              <span className="label-eyebrow text-xs tracking-[0.35em]">
                A Living Archive of Indian Textiles
              </span>
              <h1 className="display-h mt-4 text-[clamp(3.8rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#33272a]">
                INDIA
              </h1>
              <p className="display-h mt-2 text-[clamp(1.8rem,4vw,3.2rem)] italic text-[#ff8ba7] font-normal">
                Every Thread Has A Story.
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#594a4e] sm:text-lg">
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

              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[#33272a]/15 pt-6 text-xs">
                <div>
                  <span className="block display-h text-xl sm:text-2xl text-[#33272a]">28 States</span>
                  <span className="text-[#594a4e]">Craft Lineages</span>
                </div>
                <div>
                  <span className="block display-h text-xl sm:text-2xl text-[#33272a]">100% Authentic</span>
                  <span className="text-[#594a4e]">Named Artisan Co-ops</span>
                </div>
                <div>
                  <span className="block display-h text-xl sm:text-2xl text-[#33272a]">INR &amp; GST</span>
                  <span className="text-[#594a4e]">Pan-India Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fashion Integrated Hero Photo Card */}
            <div className="relative mx-auto w-full max-w-md">
              <Link
                href={`/catalog/${heroProduct.slug}`}
                className="group relative block overflow-hidden rounded-[32px] border border-[#33272a]/15 bg-[#fffffe] shadow-2xl transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Photo aspect 3/4 */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#faeee7]">
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    fetchPriority="high"
                  />

                  {/* Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#33272a]/90 via-[#33272a]/30 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute left-4 top-4 z-10">
                    <span className="rounded-full border border-[#fffffe]/30 bg-[#fffffe]/90 px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#33272a] font-bold shadow-xs backdrop-blur">
                      ✨ Heirloom Highlight · {heroProduct.fabric}
                    </span>
                  </div>

                  {/* Bottom Integrated Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-[#fffffe]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">
                      {heroProduct.state} · {heroProduct.artisan}
                    </span>

                    <h3 className="display-h mt-1 text-2xl text-[#fffffe] group-hover:text-[#ff8ba7] transition">
                      {heroProduct.name}
                    </h3>

                    <div className="mt-3 flex items-baseline justify-between border-t border-[#fffffe]/20 pt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="display-h text-2xl font-bold text-[#fffffe]">
                          {formatINR(heroProduct.priceINR)}
                        </span>
                        <span className="text-xs text-[#fffffe]/60 line-through">
                          {formatINR(heroProduct.originalPriceINR || Math.round(heroProduct.priceINR * 1.25))}
                        </span>
                        <span className="rounded-md bg-rose-500/90 px-2 py-0.5 text-[9px] font-bold text-white">
                          25% OFF
                        </span>
                      </div>

                      <span className="text-xs uppercase tracking-wider text-[#ff8ba7] font-bold group-hover:translate-x-1 transition">
                        Explore Drape →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Clothing Variety Section */}
      <section className="border-b border-[#33272a]/15 bg-[#fffffe] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="label-eyebrow text-xs">Curated Textile Heirlooms</span>
              <h2 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">Traditional Clothing Variety.</h2>
              <p className="mt-2 text-sm text-[#594a4e] max-w-xl">
                Handwoven Sarees, Lehengas, Zardozi Sherwanis, Anarkalis, and Pashmina Cashmere Shawls.
              </p>
            </div>
            <Link href="/catalog" className="ghost-button text-xs">View All Clothing ({products.length}) →</Link>
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
          <span className="label-eyebrow text-xs">Interactive Regional Discovery</span>
          <h2 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">28 States. 28 Unique Textures.</h2>
          <p className="mt-3 leading-relaxed text-[#594a4e]">Every region brings its own weavers, colors, embroidery styles, and regional heritage.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {regions.map((region) => (
            <Link
              key={region.state}
              href={`/states/${region.state}`}
              className="group relative min-h-[28rem] overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] shadow-md transition duration-500 hover:-translate-y-1 hover:border-[#ff8ba7] hover:shadow-xl"
            >
              <img
                src={region.image}
                alt={region.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#33272a]/90 via-[#33272a]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-[#fffffe]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">{region.label}</span>
                <h3 className="display-h mt-2 text-3xl text-[#fffffe] group-hover:text-[#ff8ba7] transition">{region.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#fffffe]/85">{region.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-[#fffffe] font-bold group-hover:text-[#ff8ba7] transition">
                  Explore Craft →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Loom to Wardrobe Quality Section */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-8 rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 sm:p-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end shadow-md">
          <div>
            <span className="label-eyebrow text-xs">Pure Craftsmanship</span>
            <h2 className="display-h mt-3 text-4xl leading-tight text-[#33272a]">The details should feel as beautiful as the cloth.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="border-l-2 border-[#ff8ba7] pl-4 text-xs leading-relaxed text-[#594a4e]">
              <strong className="block font-semibold text-[#33272a] text-sm mb-1">Named Maker Co-ops</strong>
              Know the artisan atelier, loom location, and heritage story behind every thread.
            </p>
            <p className="border-l-2 border-[#ff8ba7] pl-4 text-xs leading-relaxed text-[#594a4e]">
              <strong className="block font-semibold text-[#33272a] text-sm mb-1">GST &amp; Fair Pay</strong>
              Direct artisan partnerships ensuring fair wages and official GST invoice breakdown.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
