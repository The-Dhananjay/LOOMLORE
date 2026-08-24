import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { cultures, products, type Culture, type GarmentType, type Occasion, type Fabric, type Gender } from '@/data/catalog';
import { INDIAN_FESTIVALS, RUPEE_SIGN } from '@/lib/india';

type Search = { [key: string]: string | string[] | undefined };

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const fieldClass =
  'mt-1 w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-sm text-[#831843] font-sans outline-none transition focus:border-[#f43f5e] focus:ring-2 focus:ring-[#f43f5e]/20 shadow-xs';
const labelClass = 'text-[10px] uppercase tracking-[0.2em] text-[#f43f5e] font-sans font-semibold';

export default function CatalogPage({ searchParams }: { searchParams: Search }) {
  const gender = asString(searchParams.gender) as Gender | undefined;
  const culture = asString(searchParams.culture) as Culture | undefined;
  const garment = asString(searchParams.garment) as GarmentType | undefined;
  const occasion = asString(searchParams.occasion) as Occasion | undefined;
  const fabric = asString(searchParams.fabric) as Fabric | undefined;
  const state = asString(searchParams.state);
  const maxINR = asString(searchParams.maxINR);
  const q = asString(searchParams.q)?.toLowerCase();

  const filtered = products.filter((product) => {
    if (gender && product.gender !== gender && product.gender !== 'Unisex') return false;
    if (culture && product.culture !== culture) return false;
    if (garment && product.garment !== garment) return false;
    if (occasion && product.occasion !== occasion) return false;
    if (fabric && product.fabric !== fabric) return false;
    if (state && product.state !== state) return false;
    if (maxINR && product.priceINR > Number(maxINR)) return false;
    return !q || `${product.name} ${product.region} ${product.state} ${product.artisan} ${product.gender}`.toLowerCase().includes(q);
  });

  const garments = Array.from(new Set(products.map((product) => product.garment)));
  const occasions = Array.from(new Set(products.map((product) => product.occasion)));
  const fabrics = Array.from(new Set(products.map((product) => product.fabric)));
  const states = Array.from(new Set(products.map((product) => product.state)));

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-10 bg-[#fff5f7] text-[#2b0914]">
      <header className="max-w-3xl">
        <p className="label-eyebrow font-sans text-xs">The Complete Indian Collection</p>
        <h1 className="display-h mt-3 text-5xl text-[#831843] sm:text-6xl">Every State. Women &amp; Men.</h1>
        <p className="mt-4 text-base leading-relaxed text-[#4c0519]/75 font-sans">
          Discover traditional handwoven clothing for Women and Men across all 28 states of India — Sarees, Lehengas, Sherwanis, Bandhgalas, Kurtas, Anarkalis, Kasavu, and Pashminas.
        </p>

        {/* Quick Category Toggle Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3 font-sans">
          <Link
            href="/catalog"
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              !gender && !garment ? 'bg-[#831843] text-white shadow-md' : 'border border-rose-200 bg-white text-[#831843] hover:border-[#f43f5e]'
            }`}
          >
            All Products ({products.length})
          </Link>
          <Link
            href="/catalog?gender=Women"
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              gender === 'Women' ? 'bg-[#831843] text-white shadow-md' : 'border border-rose-200 bg-white text-[#831843] hover:border-[#f43f5e]'
            }`}
          >
            Women's Drapes ({products.filter((p) => p.gender === 'Women' && p.garment !== 'Jewelry' && p.garment !== 'Kamarbandh').length})
          </Link>
          <Link
            href="/catalog?gender=Men"
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              gender === 'Men' ? 'bg-[#831843] text-white shadow-md' : 'border border-rose-200 bg-white text-[#831843] hover:border-[#f43f5e]'
            }`}
          >
            Men's Royal Wear ({products.filter((p) => p.gender === 'Men').length})
          </Link>
          <Link
            href="/catalog?garment=Jewelry"
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              garment === 'Jewelry' || garment === 'Kamarbandh' ? 'bg-[#f43f5e] text-white shadow-md' : 'border border-rose-200 bg-white text-[#831843] hover:border-[#f43f5e]'
            }`}
          >
            Traditional Jewelry ({products.filter((p) => p.garment === 'Jewelry' || p.garment === 'Kamarbandh').length})
          </Link>
        </div>
      </header>

      {/* Clean White & Pink Search Filter Suite */}
      <form className="mt-10 grid gap-5 rounded-3xl border border-rose-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4 shadow-md font-sans" method="get">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="q">Search Heirlooms</label>
          <input id="q" name="q" defaultValue={q ?? ''} placeholder="Search Banarasi, Sherwani, Kurta, Kanjeevaram..." className={fieldClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="gender">Category</label>
          <select id="gender" name="gender" defaultValue={gender ?? ''} className={fieldClass}>
            <option value="">All (Men &amp; Women)</option>
            <option value="Women">Women's Collection</option>
            <option value="Men">Men's Collection</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="culture">Cluster</label>
          <select id="culture" name="culture" defaultValue={culture ?? ''} className={fieldClass}>
            <option value="">All Clusters</option>
            {cultures.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="garment">Garment</label>
          <select id="garment" name="garment" defaultValue={garment ?? ''} className={fieldClass}>
            <option value="">All Garments</option>
            {garments.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" defaultValue={occasion ?? ''} className={fieldClass}>
            <option value="">Any Occasion</option>
            {INDIAN_FESTIVALS.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            {occasions.filter((item) => !INDIAN_FESTIVALS.some((festival) => festival.name === item)).map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="fabric">Fabric</label>
          <select id="fabric" name="fabric" defaultValue={fabric ?? ''} className={fieldClass}>
            <option value="">All Fabrics</option>
            {fabrics.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="state">State</label>
          <select id="state" name="state" defaultValue={state ?? ''} className={fieldClass}>
            <option value="">All 28 States</option>
            {states.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="maxINR">Max Price (INR)</label>
          <input id="maxINR" type="number" name="maxINR" defaultValue={maxINR ?? ''} placeholder="45000" className={fieldClass} />
        </div>
        <div className="flex items-end gap-3">
          <button type="submit" className="wax-button flex-1 px-4 py-2.5 text-xs">Apply Filters</button>
          <Link href="/catalog" className="ghost-button px-4 py-2.5 text-xs">Reset</Link>
        </div>
      </form>

      <p className="mt-8 text-sm text-[#4c0519]/70 font-sans">
        Showing <span className="font-semibold text-[#f43f5e]">{filtered.length}</span> of {products.length} garments.
      </p>

      {filtered.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-rose-200 bg-white p-12 text-center shadow-md font-sans">
          <p className="display-h text-3xl text-[#831843]">No garments match your filters.</p>
          <p className="mt-2 text-sm text-[#4c0519]/70">Try clearing filters or switching between Women and Men collections.</p>
        </div>
      )}
    </div>
  );
}
