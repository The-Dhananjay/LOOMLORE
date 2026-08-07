'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart';
import { formatINR } from '@/lib/india';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/catalog';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    getShippingCost,
    getGiftWrapCost,
    getTaxBreakdown,
    giftWrap,
    toggleGiftWrap,
    couponCode,
    applyCoupon,
    discountPct
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = getShippingCost();
  const gst = getTaxBreakdown();

  function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    const ok = applyCoupon(inputCoupon);
    if (ok) {
      setCouponMsg('10% Heirloom discount applied!');
    } else {
      setCouponMsg('Invalid code. Try HEIRLOOM10 or WELCOME500');
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-10 bg-[#fff5f7] text-[#2b0914] font-sans">
      <header className="max-w-3xl">
        <p className="label-eyebrow text-xs">Your Shopping Bag</p>
        <h1 className="display-h mt-2 text-5xl text-[#831843] sm:text-6xl">Review Your Order.</h1>
        <p className="mt-3 text-base text-[#4c0519]/75">
          All heirlooms are shipped directly from certified weaver ateliers across India with GST tax invoice included.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-rose-200 bg-white p-16 text-center shadow-md">
          <p className="display-h text-3xl text-[#831843]">Your bag is currently empty.</p>
          <p className="mt-2 text-sm text-[#4c0519]/70">Explore our handwoven collections from all 28 Indian states.</p>
          <Link href="/catalog" className="wax-button mt-8 text-xs px-8 py-3.5 inline-flex">
            Browse All Clothing Heirlooms →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* Cart Line Items */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-wider text-[#f43f5e] font-semibold">
              Selected Garments ({items.reduce((s, i) => s + i.quantity, 0)})
            </p>

            {items.map(({ product, quantity, selectedSize }) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl border border-rose-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="h-24 w-20 overflow-hidden rounded-2xl bg-[#fff0f3] border border-rose-100 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#f43f5e] font-semibold">
                      {product.state} · {product.fabric}
                    </span>
                    <Link href={`/catalog/${product.slug}`}>
                      <h3 className="display-h text-2xl text-[#831843] hover:text-[#f43f5e] transition">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#4c0519]/60 mt-0.5">
                      Artisan: {product.artisan} · Size: {selectedSize}
                    </p>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="mt-2 text-xs text-[#f43f5e] font-semibold hover:underline"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-rose-100 pt-3 sm:pt-0">
                  <div className="flex items-center gap-3 rounded-full border border-rose-200 bg-[#fff5f7] px-3 py-1 text-sm">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="font-bold text-[#831843] hover:text-[#f43f5e] px-1"
                    >
                      -
                    </button>
                    <span className="font-semibold text-[#831843]">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="font-bold text-[#831843] hover:text-[#f43f5e] px-1"
                    >
                      +
                    </button>
                  </div>
                  <span className="display-h text-2xl font-bold text-[#be123c]">
                    {formatINR(product.priceINR * quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-md space-y-5">
              <h2 className="display-h text-2xl text-[#831843]">Order Summary</h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Coupon code (HEIRLOOM10)"
                  className="flex-1 rounded-xl border border-rose-200 bg-[#fff5f7] px-3.5 py-2 text-xs text-[#831843] outline-none focus:border-[#f43f5e]"
                />
                <button type="submit" className="ghost-button text-xs py-2 px-4">
                  Apply
                </button>
              </form>
              {couponMsg && <p className="text-xs text-[#f43f5e] font-semibold">{couponMsg}</p>}

              {/* Gift Wrap Toggle */}
              <label className="flex items-center gap-3 text-xs text-[#831843] cursor-pointer border-y border-rose-100 py-3">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={toggleGiftWrap}
                  className="h-4 w-4 rounded border-rose-300 text-[#f43f5e] focus:ring-[#f43f5e]"
                />
                <span className="font-medium">Add Royal Handcrafted Gift Wrapping (+₹199)</span>
              </label>

              {/* Invoice Breakdown */}
              <div className="space-y-2.5 text-xs text-[#4c0519]/80">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#831843]">{formatINR(subtotal)}</span>
                </div>
                {discountPct > 0 && (
                  <div className="flex justify-between text-[#f43f5e] font-semibold">
                    <span>Discount ({discountPct}%)</span>
                    <span>-{formatINR((subtotal * discountPct) / 100)}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between">
                    <span>Gift Wrapping</span>
                    <span>{formatINR(199)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Across India</span>
                  <span className="font-semibold text-[#831843]">
                    {shipping === 0 ? 'FREE' : formatINR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#4c0519]/60 border-t border-rose-100 pt-2">
                  <span>Estimated GST (Base {formatINR(gst.base)})</span>
                  <span>{formatINR(gst.gst)}</span>
                </div>
                <div className="flex justify-between border-t border-rose-200 pt-3 text-lg font-bold text-[#831843]">
                  <span className="display-h">Total Amount</span>
                  <span className="display-h text-2xl text-[#be123c]">{formatINR(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="wax-button w-full text-center py-3.5 text-xs">
                Proceed to Checkout →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Heirlooms */}
      <section className="mt-20 border-t border-rose-200 pt-16">
        <p className="label-eyebrow text-xs">Recommended Heirlooms</p>
        <h2 className="display-h mt-2 text-3xl text-[#831843]">You May Also Love.</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(2, 5).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
