import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { CustomerReviews } from '@/components/CustomerReviews';
import { findProduct, products } from '@/data/catalog';
import { formatINR, splitGST, deliveryEtaDays, INDIAN_PAYMENTS } from '@/lib/india';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = findProduct(params.slug);
  if (!product) notFound();

  const { base, gst } = splitGST(product.priceINR, product.gstPct);
  const eta = deliveryEtaDays(product.state);
  const related = products.filter((item) => item.id !== product.id && item.culture === product.culture).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-10 bg-[#faeee7] text-[#33272a] font-sans">
      <nav className="text-xs text-[#594a4e]">
        <Link href="/catalog" className="transition hover:text-[#ff8ba7]">Catalog</Link>
        <span className="mx-2 text-[#33272a]/30">/</span>
        <Link href={`/catalog?culture=${encodeURIComponent(product.culture)}`} className="transition hover:text-[#ff8ba7]">{product.culture}</Link>
        <span className="mx-2 text-[#33272a]/30">/</span>
        <span className="text-[#33272a] font-semibold">{product.name}</span>
      </nav>

      <section className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
        <div className="overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] shadow-md">
          <img src={product.image} alt={product.name} className="aspect-[3/4] h-full w-full object-cover" fetchPriority="high" />
        </div>

        <div className="max-w-2xl">
          <span className="label-eyebrow text-xs">{product.culture} · {product.region}</span>
          <h1 className="display-h mt-2 text-5xl leading-tight text-[#33272a] sm:text-6xl">{product.name}</h1>
          <p className="mt-3 text-xs text-[#594a4e] font-medium">
            Handwoven by {product.artisan} · ★ {product.rating.toFixed(1)} rating from {product.reviewCount} verified reviews
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="display-h text-4xl font-bold text-[#33272a]">{formatINR(product.priceINR)}</p>
            <span className="text-base text-[#594a4e]/60 line-through">
              {formatINR(product.originalPriceINR || Math.round(product.priceINR * 1.25))}
            </span>
            <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
              {Math.round((((product.originalPriceINR || Math.round(product.priceINR * 1.25)) - product.priceINR) / (product.originalPriceINR || Math.round(product.priceINR * 1.25))) * 100)}% OFF
            </span>
            <p className="text-xs uppercase tracking-[.16em] text-[#ff8ba7] font-bold ml-2">Inclusive of GST</p>
          </div>
          <p className="mt-1 text-xs text-[#594a4e]">Taxable value {formatINR(base)} · GST @{product.gstPct}% {formatINR(gst)} · HSN {product.hsnCode}</p>

          <div className="my-6 h-px bg-[#33272a]/15" />
          <p className="text-base leading-relaxed text-[#594a4e]">{product.story}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            {product.highlights.map((item) => (
              <li key={item} className="rounded-xl border border-[#33272a]/15 bg-[#fffffe] px-3.5 py-2.5 text-xs text-[#33272a] font-medium shadow-2xs">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <label className="text-[10px] uppercase tracking-[.18em] text-[#ff8ba7] font-bold" htmlFor="size">Size</label>
            <select id="size" className="rounded-xl border border-[#33272a]/20 bg-[#fffffe] px-3.5 py-2 text-xs text-[#33272a] outline-none focus:border-[#ff8ba7]">
              {product.sizes.map((size) => <option key={size}>{size}</option>)}
            </select>
            <button className="wax-button px-6 py-3 text-xs">Add to Bag</button>
            <button className="ghost-button px-5 py-2.5 text-xs">Save Wishlist</button>
          </div>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ['Fabric', product.fabric], ['Occasion', product.occasion],
              ['Colours', product.colors.join(' · ')], ['Ships from', `${product.shipsFromCity}, ${product.state}`],
              ['Delivery', `${eta.min}–${eta.max} business days`], ['COD & returns', 'COD available · 7-day returns']
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#33272a]/15 bg-[#fffffe] p-4 shadow-2xs">
                <dt className="text-[10px] uppercase tracking-[.16em] text-[#ff8ba7] font-bold">{label}</dt>
                <dd className="mt-1 text-xs text-[#33272a] font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-2xl border border-[#33272a]/15 bg-[#fffffe] p-4 shadow-2xs">
            <p className="text-[10px] uppercase tracking-[.16em] text-[#ff8ba7] font-bold">Pan-India Accepted Payment Gateways</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {INDIAN_PAYMENTS.slice(0, 6).map((method) => (
                <span key={method.id} className="rounded-full border border-[#33272a]/20 bg-[#faeee7] px-3 py-1 text-[10px] font-semibold text-[#33272a]">
                  {method.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Add Review Section */}
      <CustomerReviews
        productId={product.id}
        productName={product.name}
        initialRating={product.rating}
        initialReviewCount={product.reviewCount}
      />

      {related.length > 0 && (
        <section className="mt-20 border-t border-[#33272a]/15 pt-12">
          <span className="label-eyebrow text-xs">More from this region</span>
          <h2 className="display-h mt-2 text-4xl text-[#33272a]">You May Also Love</h2>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
    </div>
  );
}
