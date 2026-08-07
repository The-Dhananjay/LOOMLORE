'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR, splitGST } from '@/lib/india';
import type { Product } from '@/data/catalog';
import { useCartStore } from '@/lib/cart';
import { useAuthStore } from '@/lib/auth';

export function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const gst = splitGST(product.priceINR, product.gstPct);
  const addItem = useCartStore((s) => s.addItem);

  const { isLoggedIn, openLoginModal } = useAuthStore();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setWished((v) => !v);
  }

  function handleOpenQuickView(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(true);
  }

  return (
    <>
      {/* Luxury Product Card System */}
      <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ff8ba7] hover:shadow-xl font-sans">
        
        {/* Product Image Aspect Ratio 3:4 */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#faeee7]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />

          {/* Top Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1 z-10">
            <span className="rounded-full border border-[#33272a]/15 bg-[#fffffe]/95 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#33272a] font-bold shadow-xs backdrop-blur">
              {product.gender} · {product.garment}
            </span>
            {product.badge && (
              <span className="rounded-full border border-[#ff8ba7]/40 bg-[#ff8ba7] px-3 py-0.5 text-[9px] uppercase tracking-wider text-[#33272a] font-bold shadow-xs">
                {product.badge}
              </span>
            )}
            {product.stockQty === 0 && (
              <span className="rounded-full border border-rose-400 bg-rose-600 px-3 py-0.5 text-[9px] uppercase tracking-wider text-white font-bold shadow-xs">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#33272a]/15 bg-[#fffffe]/90 text-[#33272a] backdrop-blur shadow-xs transition hover:border-[#ff8ba7] hover:bg-[#fffffe]"
            aria-label="Wishlist"
          >
            <motion.svg
              animate={{ scale: wished ? [1, 1.3, 1] : 1 }}
              className={`h-4 w-4 ${wished ? 'fill-[#ff8ba7] text-[#ff8ba7]' : 'fill-none stroke-current text-[#33272a]'}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </motion.svg>
          </button>

          {/* Quick Action Buttons Hover Overlay */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex gap-2 z-10">
            <button
              onClick={handleOpenQuickView}
              className="flex-1 rounded-full border border-[#33272a]/20 bg-[#fffffe]/95 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#33272a] font-semibold shadow-xs backdrop-blur hover:bg-[#ffc6c7] transition"
            >
              Quick View
            </button>
            <button
              onClick={product.stockQty === 0 ? (e) => e.preventDefault() : handleAddToCart}
              disabled={product.stockQty === 0}
              className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md transition ${
                product.stockQty === 0
                  ? 'bg-zinc-300 text-zinc-600 cursor-not-allowed'
                  : 'bg-[#ff8ba7] text-[#33272a] hover:bg-[#ffc6c7]'
              }`}
            >
              {product.stockQty === 0 ? 'Out of Stock' : added ? 'Added ✓' : '+ Bag'}
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">
              <span>{product.state}</span>
              <span>{product.fabric}</span>
            </div>

            <Link href={`/catalog/${product.slug}`}>
              <h3 className="display-h mt-1.5 text-2xl text-[#33272a] transition hover:text-[#ff8ba7] line-clamp-1 font-medium">
                {product.name}
              </h3>
            </Link>

            <p className="mt-1 text-xs text-[#594a4e] line-clamp-1">
              {product.region} · {product.artisan}
            </p>
          </div>

          <div className="mt-4 border-t border-[#33272a]/10 pt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="display-h text-2xl font-bold text-[#33272a]">{formatINR(product.priceINR)}</span>
                  <span className="text-xs text-[#594a4e]/60 line-through">
                    {formatINR(product.originalPriceINR || Math.round(product.priceINR * 1.25))}
                  </span>
                  <span className="rounded-md bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">
                    {Math.round((((product.originalPriceINR || Math.round(product.priceINR * 1.25)) - product.priceINR) / (product.originalPriceINR || Math.round(product.priceINR * 1.25))) * 100)}% OFF
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#594a4e]/70">incl. GST</span>
              </div>
              <span className="text-[10px] text-[#ff8ba7] font-bold">
                ★ {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md font-sans"
            onClick={() => setQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] shadow-2xl md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setQuickView(false)}
                className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-[#33272a]/20 bg-[#fffffe] text-[#33272a] shadow-xs font-bold"
              >
                ✕
              </button>

              <div className="relative aspect-[3/4] bg-[#faeee7]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="label-eyebrow text-xs">{product.state} · {product.artisan}</p>
                  <h2 className="display-h mt-2 text-3xl text-[#33272a]">{product.name}</h2>
                  <p className="mt-2 text-sm text-[#594a4e] leading-relaxed">{product.story}</p>

                  <div className="mt-4 space-y-2 border-t border-[#33272a]/10 pt-4 text-xs text-[#594a4e]">
                    <p><strong className="text-[#33272a]">Category:</strong> {product.gender} · {product.garment}</p>
                    <p><strong className="text-[#33272a]">Fabric:</strong> {product.fabric}</p>
                    <p><strong className="text-[#33272a]">Occasion:</strong> {product.occasion}</p>
                    <p><strong className="text-[#33272a]">Ships From:</strong> {product.shipsFromCity}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#33272a]/10 pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="display-h text-3xl text-[#33272a] font-bold">{formatINR(product.priceINR)}</span>
                      <span className="text-sm text-[#594a4e]/60 line-through">
                        {formatINR(product.originalPriceINR || Math.round(product.priceINR * 1.25))}
                      </span>
                      <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
                        {Math.round((((product.originalPriceINR || Math.round(product.priceINR * 1.25)) - product.priceINR) / (product.originalPriceINR || Math.round(product.priceINR * 1.25))) * 100)}% OFF
                      </span>
                    </div>
                    <span className="text-xs text-[#594a4e]">Inclusive of {product.gstPct}% GST</span>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/catalog/${product.slug}`}
                      className="wax-button flex-1 text-center py-3 text-xs"
                      onClick={() => setQuickView(false)}
                    >
                      View Full Details →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
