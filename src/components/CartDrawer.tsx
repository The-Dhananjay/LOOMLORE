'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cart';
import { formatINR } from '@/lib/india';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    getShippingCost,
    getGiftWrapCost,
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
  const freeShippingThreshold = 1500;
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative flex h-full w-full max-w-md flex-col justify-between bg-white text-[#2b0914] shadow-2xl border-l border-rose-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rose-100 p-6">
              <div>
                <h2 className="display-h text-2xl text-[#831843]">Shopping Bag</h2>
                <p className="text-xs text-[#4c0519]/70">{items.reduce((s, i) => s + i.quantity, 0)} Heirlooms selected</p>
              </div>
              <button
                onClick={closeCart}
                className="grid h-8 w-8 place-items-center rounded-full border border-rose-200 text-[#831843] hover:bg-[#fff1f2] transition"
              >
                ✕
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-[#fff0f3] px-6 py-3 border-b border-rose-100">
              <div className="flex items-center justify-between text-xs text-[#831843] font-medium">
                <span>
                  {subtotal >= freeShippingThreshold
                    ? '🎉 You unlocked Free Express Delivery across India!'
                    : `Add ${formatINR(freeShippingThreshold - subtotal)} for Free Express Shipping`}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-rose-200/60 overflow-hidden">
                <div
                  className="h-full bg-[#f43f5e] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="display-h text-2xl text-[#831843]">Your bag is empty.</p>
                  <p className="mt-2 text-xs text-[#4c0519]/70">Discover handwoven sarees, lehengas &amp; sherwanis.</p>
                  <button onClick={closeCart} className="wax-button mt-6 text-xs px-6 py-2.5">
                    Start Browsing Heirlooms →
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity, selectedSize }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 rounded-2xl border border-rose-200 bg-[#fff5f7] p-3 transition hover:border-[#f43f5e]"
                  >
                    <div className="h-20 w-16 overflow-hidden rounded-xl bg-white border border-rose-100 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <p className="display-h text-lg text-[#831843] line-clamp-1">{product.name}</p>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-xs text-[#f43f5e] hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-[10px] text-[#4c0519]/60">{product.state} · {product.fabric}</p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-rose-200 bg-white px-2 py-0.5 text-xs">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="px-1 font-bold text-[#831843] hover:text-[#f43f5e]"
                          >
                            -
                          </button>
                          <span className="font-semibold text-[#831843]">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="px-1 font-bold text-[#831843] hover:text-[#f43f5e]"
                          >
                            +
                          </button>
                        </div>
                        <span className="display-h text-lg font-bold text-[#be123c]">
                          {formatINR(product.priceINR * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-rose-200 bg-white p-6 space-y-4 shadow-lg">
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon code (HEIRLOOM10)"
                    className="flex-1 rounded-xl border border-rose-200 bg-[#fff5f7] px-3.5 py-1.5 text-xs text-[#831843] outline-none focus:border-[#f43f5e]"
                  />
                  <button type="submit" className="ghost-button text-xs py-1.5 px-3">
                    Apply
                  </button>
                </form>
                {couponMsg && <p className="text-[11px] text-[#f43f5e] font-medium">{couponMsg}</p>}

                {/* Gift Wrap Checkbox */}
                <label className="flex items-center gap-2.5 text-xs text-[#831843] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={toggleGiftWrap}
                    className="rounded border-rose-300 text-[#f43f5e] focus:ring-[#f43f5e]"
                  />
                  <span>Add Handcrafted Royal Gift Wrapping (+₹199)</span>
                </label>

                {/* Totals */}
                <div className="space-y-1.5 text-xs border-t border-rose-100 pt-3 text-[#4c0519]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#831843]">{formatINR(subtotal)}</span>
                  </div>
                  {discountPct > 0 && (
                    <div className="flex justify-between text-[#f43f5e]">
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
                  <div className="flex justify-between border-t border-rose-100 pt-2 text-base font-bold text-[#831843]">
                    <span className="display-h">Total (incl. GST)</span>
                    <span className="display-h text-xl text-[#be123c]">{formatINR(total)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="wax-button text-center py-3 text-xs w-full"
                  >
                    Proceed to Express Checkout →
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="ghost-button text-center py-2.5 text-xs w-full"
                  >
                    View Full Cart Page
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
