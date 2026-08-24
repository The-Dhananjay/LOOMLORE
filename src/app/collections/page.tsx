'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/catalog';

const CURATED_CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'jewelry', label: 'Traditional Jewelry & Ornaments' },
  { id: 'wedding', label: 'Bridal & Wedding' },
  { id: 'festive', label: 'Festive Celebrations' },
  { id: 'silks', label: 'Heritage Silks' },
  { id: 'men', label: 'Men Ceremonial' },
  { id: 'pashmina', label: 'Pashmina & Winter' }
];

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'jewelry') return p.garment === 'Jewelry' || p.garment === 'Kamarbandh';
    if (activeCategory === 'wedding') return p.occasion === 'Wedding' || p.badge?.includes('Bridal') || p.badge?.includes('Royal');
    if (activeCategory === 'festive') return p.occasion === 'Festive' || p.occasion === 'Festival' || p.occasion === 'Diwali' || p.occasion === 'Navratri' || p.occasion === 'Onam';
    if (activeCategory === 'silks') return p.fabric.includes('Silk');
    if (activeCategory === 'men') return p.gender === 'Men';
    if (activeCategory === 'pashmina') return p.fabric === 'Pashmina' || p.garment === 'Shawl' || p.fabric === 'Velvet';
    return true;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 bg-[#faeee7] text-[#33272a] font-sans">
      <header className="max-w-3xl">
        <span className="label-eyebrow text-xs">Curated Indian Textile Edits</span>
        <h1 className="display-h mt-2 text-5xl text-[#33272a] sm:text-6xl">Curated Collections.</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#594a4e]">
          Explore hand-selected traditional clothing grouped by royal heritage, wedding ceremonies, festive celebrations, and pure silk weaves.
        </p>
      </header>

      {/* Category Pills */}
      <div className="mt-10 flex flex-wrap gap-2.5">
        {CURATED_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === cat.id
                ? 'bg-[#33272a] text-[#fffffe] shadow-xs'
                : 'border border-[#33272a]/20 bg-[#fffffe] text-[#33272a] hover:border-[#ff8ba7]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid Showcase */}
      <div className="mt-10">
        <div className="flex items-center justify-between border-b border-[#33272a]/15 pb-4">
          <p className="text-xs text-[#594a4e]">
            Showing <strong className="text-[#33272a]">{filteredProducts.length}</strong> traditional garments in this edit.
          </p>
          <Link href="/catalog" className="text-xs uppercase tracking-wider font-bold text-[#ff8ba7] hover:underline">
            View Complete Catalog →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
