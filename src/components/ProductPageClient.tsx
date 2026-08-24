'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import { formatINR } from '@/lib/india';
import type { Product } from '@/data/catalog';
import { GiTagModal } from './GiTagModal';

const AVAILABLE_OFFERS = [
  { code: 'WELCOME500', title: 'Flat ₹500 OFF', desc: 'On first purchase of ₹1,499 or more.' },
  { code: 'HEIRLOOM10', title: 'Extra 10% OFF', desc: 'Applicable on all Traditional Jewelry & Sarees.' },
  { code: 'FESTIVE15', title: 'Flat 15% OFF', desc: 'On orders of ₹2,999 or more.' }
];

export function ProductPageClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Free Size');
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState<string | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [isGiModalOpen, setIsGiModalOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  function handleCheckPincode(e: React.FormEvent) {
    e.preventDefault();
    const clean = pincode.replace(/\D/g, '');
    if (clean.length === 6) {
      setPincodeMsg(`✅ Express Delivery Available to ${clean}! Expected by 3–5 Business Days. Cash on Delivery & 7-Day Easy Return Eligible.`);
    } else {
      setPincodeMsg('⚠️ Please enter a valid 6-digit Indian Pincode.');
    }
  }

  function handleCopyCoupon(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  }

  function handleAddToCart() {
    addItem(product, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
    openCart();
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Size Selection & Add to Bag */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Select Size</span>
          <span className="text-[11px] text-[#594a4e]">Standard Indian Fitting</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
                selectedSize === size
                  ? 'border-[#33272a] bg-[#33272a] text-white shadow-xs'
                  : 'border-[#33272a]/20 bg-[#fffffe] text-[#33272a] hover:border-[#ff8ba7]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="wax-button flex-1 py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            {addedNotice ? '✓ Added to Bag!' : '🛍️ ADD TO BAG'}
          </button>
          <button
            type="button"
            onClick={() => setIsGiModalOpen(true)}
            className="ghost-button py-3.5 px-5 text-xs font-semibold"
          >
            📜 GI Tag Guarantee
          </button>
        </div>
      </div>

      {/* 7-DAY RETURN & TRUST BADGES GRID */}
      <div className="rounded-2xl border border-[#33272a]/15 bg-[#fffffe] p-5 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#33272a]">
          Loomlore E-Commerce Quality &amp; Return Guarantees
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs text-[#33272a]">
          <div className="flex items-start gap-2.5 rounded-xl bg-[#faeee7]/60 p-3 border border-[#33272a]/10">
            <span className="text-lg">↺</span>
            <div>
              <strong className="block text-[#33272a] font-bold text-[11px]">7-Day Easy Returns</strong>
              <span className="text-[10px] text-[#594a4e]">Hassle-free 7-day replacement &amp; return pickup</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-[#faeee7]/60 p-3 border border-[#33272a]/10">
            <span className="text-lg">🚚</span>
            <div>
              <strong className="block text-[#33272a] font-bold text-[11px]">Free Pan-India Delivery</strong>
              <span className="text-[10px] text-[#594a4e]">Free shipping on orders above ₹999</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-[#faeee7]/60 p-3 border border-[#33272a]/10">
            <span className="text-lg">💵</span>
            <div>
              <strong className="block text-[#33272a] font-bold text-[11px]">Cash on Delivery (COD)</strong>
              <span className="text-[10px] text-[#594a4e]">Pay at doorstep across 25,000+ pincodes</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-[#faeee7]/60 p-3 border border-[#33272a]/10">
            <span className="text-lg">🛡️</span>
            <div>
              <strong className="block text-[#33272a] font-bold text-[11px]">100% Authentic Handloom</strong>
              <span className="text-[10px] text-[#594a4e]">Direct artisan co-op craft &amp; GI Tag certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* PINCODE & DELIVERY CHECKER */}
      <div className="rounded-2xl border border-[#33272a]/15 bg-[#fffffe] p-5 shadow-2xs space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-[#ff8ba7] font-bold">Delivery &amp; COD Availability</span>
        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter 6-digit Pincode (e.g. 302001)"
            className="flex-1 rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none focus:border-[#ff8ba7]"
          />
          <button type="submit" className="wax-button px-5 py-2 text-xs font-bold">
            Check
          </button>
        </form>
        {pincodeMsg && <p className="text-xs font-medium text-[#33272a] pt-1">{pincodeMsg}</p>}
      </div>

      {/* ACTIVE DISCOUNTS & COUPON OFFERS */}
      <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-amber-900 font-bold">🏷️ Available Coupons &amp; Offers</span>
          <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[9px] font-bold text-amber-900">3 Active</span>
        </div>

        <div className="space-y-2">
          {AVAILABLE_OFFERS.map((off) => (
            <div key={off.code} className="flex items-center justify-between rounded-xl bg-white p-3 border border-amber-200 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {off.code}
                  </span>
                  <strong className="text-[#33272a] font-bold">{off.title}</strong>
                </div>
                <p className="text-[10px] text-[#594a4e] mt-1">{off.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCoupon(off.code)}
                className="rounded-lg bg-[#faeee7] border border-[#33272a]/20 px-3 py-1 text-[10px] font-bold text-[#33272a] hover:bg-[#ff8ba7] transition"
              >
                {copiedCoupon === off.code ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* GI Tag Modal */}
      <GiTagModal isOpen={isGiModalOpen} onClose={() => setIsGiModalOpen(false)} />
    </div>
  );
}
