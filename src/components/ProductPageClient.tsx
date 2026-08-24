'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import type { Product } from '@/data/catalog';
import { GiTagModal } from './GiTagModal';

const AVAILABLE_OFFERS = [
  { code: 'WELCOME500', title: 'Flat ₹500 OFF', desc: 'On first order of ₹1,499 or more.' },
  { code: 'HEIRLOOM10', title: 'Extra 10% OFF', desc: 'Applicable on Traditional Jewelry & Sarees.' },
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
      setPincodeMsg(`Express Delivery available to ${clean}. Estimated arrival: 3–5 Business Days. Cash on Delivery & 7-Day Returns eligible.`);
    } else {
      setPincodeMsg('Please enter a valid 6-digit Indian Pincode.');
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
      {/* Size Selection & Action CTAs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Select Size</span>
          <span className="text-[11px] text-[#594a4e]">Standard Indian Sizing</span>
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
            {addedNotice ? 'Added to Bag' : 'Add to Bag'}
          </button>
          <button
            type="button"
            onClick={() => setIsGiModalOpen(true)}
            className="ghost-button py-3.5 px-5 text-xs font-semibold"
          >
            GI Tag Certificate
          </button>
        </div>
      </div>

      {/* Loomlore Handloom Guarantees & Returns */}
      <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-sm space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">
          Authenticity &amp; Service Guarantees
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs text-[#33272a]">
          <div className="rounded-2xl bg-[#faeee7]/60 p-4 border border-[#33272a]/10">
            <strong className="block text-[#33272a] font-bold text-xs">7-Day Doorstep Returns</strong>
            <span className="text-[11px] text-[#594a4e] mt-1 block">Hassle-free 7-day pickup &amp; return policy</span>
          </div>

          <div className="rounded-2xl bg-[#faeee7]/60 p-4 border border-[#33272a]/10">
            <strong className="block text-[#33272a] font-bold text-xs">Free Pan-India Delivery</strong>
            <span className="text-[11px] text-[#594a4e] mt-1 block">Free shipping on orders above ₹999</span>
          </div>

          <div className="rounded-2xl bg-[#faeee7]/60 p-4 border border-[#33272a]/10">
            <strong className="block text-[#33272a] font-bold text-xs">Cash on Delivery (COD)</strong>
            <span className="text-[11px] text-[#594a4e] mt-1 block">Available across 25,000+ Indian pincodes</span>
          </div>

          <div className="rounded-2xl bg-[#faeee7]/60 p-4 border border-[#33272a]/10">
            <strong className="block text-[#33272a] font-bold text-xs">Ministry GI Tag Certified</strong>
            <span className="text-[11px] text-[#594a4e] mt-1 block">Direct artisan cooperative authentication</span>
          </div>
        </div>
      </div>

      {/* Pincode & Delivery Date Checker */}
      <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-sm space-y-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Delivery &amp; Serviceability</span>
        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter 6-digit Pincode (e.g. 302001)"
            className="flex-1 rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-4 py-2.5 text-xs text-[#33272a] outline-none focus:border-[#ff8ba7]"
          />
          <button type="submit" className="wax-button px-6 py-2.5 text-xs font-bold">
            Check
          </button>
        </form>
        {pincodeMsg && <p className="text-xs leading-relaxed text-[#594a4e] pt-1">{pincodeMsg}</p>}
      </div>

      {/* Promotional Offers & Coupons */}
      <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Curated Offers &amp; Discounts</span>
          <span className="rounded-full bg-[#faeee7] border border-[#33272a]/15 px-3 py-0.5 text-[10px] font-semibold text-[#33272a]">3 Active</span>
        </div>

        <div className="space-y-3 pt-1">
          {AVAILABLE_OFFERS.map((off) => (
            <div key={off.code} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#faeee7]/50 p-3.5 border border-[#33272a]/10 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#33272a] bg-[#fffffe] px-2.5 py-0.5 rounded-md border border-[#33272a]/15 text-[11px]">
                    {off.code}
                  </span>
                  <strong className="text-[#33272a] font-bold">{off.title}</strong>
                </div>
                <p className="text-[11px] text-[#594a4e] mt-1">{off.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCoupon(off.code)}
                className="rounded-full bg-[#ff8ba7] px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold text-[#33272a] hover:bg-[#ffc6c7] transition"
              >
                {copiedCoupon === off.code ? 'Copied' : 'Copy Code'}
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
