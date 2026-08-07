'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { products, type Product } from '@/data/catalog';
import { STATES } from '@/data/india';
import { formatINR } from '@/lib/india';

const QUICK_PROMPTS = [
  'Wedding outfits under ₹30,000',
  'Kanjeevaram silk saree',
  'Mughal zardozi sherwani',
  'Pashmina shawl for winter',
  'Navratri chaniya choli',
  'Lucknowi chikankari anarkali'
];

const GARMENTS = ['All', 'Saree', 'Lehenga', 'Sherwani', 'Anarkali', 'Salwar Kameez', 'Pashmina Shawl', 'Kurta'];

export function AiSearch({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const [query, setQuery] = useState('');
  const [garmentFilter, setGarmentFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  function handleVoiceSearch() {
    setIsListening(true);
    const mockQueries = [
      'Show me red Banarasi zardozi saree',
      'Bridal Kanjeevaram silk saree under 60000',
      'Royal maroon velvet sherwani for wedding',
      'Pashmina shawl from Kashmir'
    ];
    const picked = mockQueries[Math.floor(Math.random() * mockQueries.length)];
    
    setTimeout(() => {
      setQuery(picked);
      setIsListening(false);
    }, 2000);
  }

  const filteredProducts = useMemo(() => {
    let list = [...products];
    const q = query.toLowerCase().trim();

    const budgetMatch = q.match(/under\s+(?:rs|inr)?\s?(\d[\d,]*)/);
    const parsedBudget = budgetMatch ? Number(budgetMatch[1].replace(/,/g, '')) : maxPrice;

    if (q) {
      list = list.filter((p) => {
        const text = [p.name, p.state, p.culture, p.fabric, p.garment, p.occasion, p.artisan, p.region, p.story]
          .join(' ')
          .toLowerCase();
        return text.includes(q);
      });
    }

    if (garmentFilter !== 'All') {
      list = list.filter((p) => p.garment === garmentFilter);
    }

    if (parsedBudget !== null && !isNaN(parsedBudget)) {
      list = list.filter((p) => p.priceINR <= parsedBudget);
    }

    return list;
  }, [query, garmentFilter, maxPrice]);

  const stateHits = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return STATES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.signatureGarment.toLowerCase().includes(q) ||
        s.fabric.toLowerCase().includes(q) ||
        s.embroidery.toLowerCase().includes(q)
    ).slice(0, 3);
  }, [query]);

  return (
    <div className="w-full max-w-4xl mx-auto font-sans">
      {/* Pink, White & Deep Wine Palette Container */}
      <div className="relative rounded-3xl border border-rose-200 bg-white p-6 md:p-8 shadow-[0_25px_70px_-15px_rgba(131,24,67,0.2)]">
        
        {/* Search Header Bar */}
        <div className="relative flex items-center gap-3 rounded-2xl border border-rose-200 bg-[#fff5f7] px-5 py-4 shadow-inner">
          <svg className="h-5 w-5 text-[#f43f5e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search state, saree, lehenga, sherwani, silk or 'wedding under 30,000'..."
            className="w-full bg-transparent text-[#2b0914] placeholder:text-[#831843]/50 focus:outline-none text-base md:text-lg font-sans"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase tracking-widest text-[#831843] hover:text-[#f43f5e] px-2 py-1"
            >
              Clear
            </button>
          )}

          <button
            onClick={handleVoiceSearch}
            disabled={isListening}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wider transition ${
              isListening
                ? 'border-[#f43f5e] bg-[#fff1f2] text-[#be123c] animate-pulse font-semibold'
                : 'border-rose-200 bg-white text-[#831843] hover:border-[#f43f5e]'
            }`}
            title="Simulate Voice Search"
          >
            <svg className="h-4 w-4 text-[#f43f5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
          </button>
        </div>

        {/* Listening Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center justify-center gap-1.5 py-2 text-xs text-[#be123c]"
            >
              <span>Listening — speak query...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#831843]/60 text-[10px] uppercase tracking-wider mr-1">AI Suggestions:</span>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setQuery(prompt)}
              className="rounded-full border border-rose-200 bg-[#fff5f7] px-3 py-1 text-[#831843] transition hover:border-[#f43f5e] hover:bg-[#fff1f2]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Multi-Filter Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rose-100 pt-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#831843]/60 text-[10px] uppercase tracking-wider">Garment:</span>
            {GARMENTS.map((g) => (
              <button
                key={g}
                onClick={() => setGarmentFilter(g)}
                className={`rounded-full px-3 py-1 transition ${
                  garmentFilter === g
                    ? 'bg-[#831843] text-white font-medium shadow-sm'
                    : 'border border-rose-200 bg-[#fff5f7] text-[#831843] hover:border-[#f43f5e]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#831843]/60 text-[10px] uppercase tracking-wider">Max Price:</span>
            {[
              { label: 'Any', val: null },
              { label: '< ₹15k', val: 15000 },
              { label: '< ₹35k', val: 35000 },
              { label: '< ₹60k', val: 60000 }
            ].map((b) => (
              <button
                key={b.label}
                onClick={() => setMaxPrice(b.val)}
                className={`rounded-full px-2.5 py-1 transition ${
                  maxPrice === b.val
                    ? 'border border-[#f43f5e] bg-[#fff1f2] text-[#be123c] font-semibold'
                    : 'border border-rose-200 bg-[#fff5f7] text-[#831843] hover:border-[#f43f5e]'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto pr-1">
          {/* State Cultural Hits */}
          {stateHits.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#f43f5e] font-semibold mb-3">Matching Indian States</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {stateHits.map((s) => (
                  <Link
                    key={s.id}
                    href={`/states/${s.id}`}
                    onClick={onClose}
                    className="royal-card p-3 transition hover:border-[#f43f5e] group"
                  >
                    <p className="text-[9px] uppercase tracking-widest text-[#f43f5e] font-sans font-semibold">{s.capital}</p>
                    <p className="display-h text-xl text-[#831843] group-hover:text-[#be123c]">{s.name}</p>
                    <p className="text-xs text-[#4c0519]/70 mt-1 font-sans">{s.signatureGarment}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#831843]/70 mb-3 font-sans">
              <span>{filteredProducts.length} Clothing Heirlooms Found</span>
              {(garmentFilter !== 'All' || maxPrice !== null || query) && (
                <button
                  onClick={() => {
                    setQuery('');
                    setGarmentFilter('All');
                    setMaxPrice(null);
                  }}
                  className="text-[#f43f5e] font-semibold hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredProducts.map((p) => (
                  <SearchProductCard key={p.id} product={p} onClick={onClose} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border border-dashed border-rose-200 rounded-2xl bg-[#fff5f7]">
                <p className="display-h text-2xl text-[#831843]">No heirlooms match this search.</p>
                <p className="mt-2 text-sm text-[#4c0519]/70 font-sans">Try clearing a filter or searching for Banarasi, Kanjeevaram, or Wedding.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function SearchProductCard({ product, onClick }: { product: Product; onClick?: () => void }) {
  return (
    <Link
      href={`/catalog/${product.slug}`}
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-rose-200 bg-white p-3 transition hover:border-[#f43f5e] shadow-sm"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#fff0f3]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2.5 font-sans">
        <p className="text-[9px] uppercase tracking-widest text-[#f43f5e] font-semibold">{product.state} · {product.fabric}</p>
        <p className="display-h text-lg text-[#831843] line-clamp-1 group-hover:text-[#be123c]">{product.name}</p>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#831843]">{formatINR(product.priceINR)}</span>
          <span className="text-[10px] uppercase text-[#4c0519]/60">{product.garment}</span>
        </div>
      </div>
    </Link>
  );
}
