'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import { useSellerStore } from '@/lib/seller';
import { useAuthStore } from '@/lib/auth';
import { formatINR, INDIAN_PAYMENTS, INDIAN_STATES, isValidPIN } from '@/lib/india';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getTotal, getTaxBreakdown, clearCart } = useCartStore();
  const { addOrderNotification, deductStockForOrder } = useSellerStore();
  const { user, recordPurchasedProducts } = useAuthStore();

  const [pin, setPin] = useState<string>('');
  const [method, setMethod] = useState<string>('upi');
  const [placed, setPlaced] = useState<boolean>(false);
  const [lastOrderId, setLastOrderId] = useState<string>('');

  // Form input state
  const [custName, setCustName] = useState(user?.name ?? 'Priya Sharma');
  const [custPhone, setCustPhone] = useState(user?.mobile ?? '9876543210');
  const [house, setHouse] = useState('H.No. 14, Royal Palm');
  const [street, setStreet] = useState('Lane 6, Lanka');
  const [city, setCity] = useState('Varanasi');
  const [stateName, setStateName] = useState('Uttar Pradesh');

  const total = getTotal();
  const gst = getTaxBreakdown();
  const validPin = pin.length === 0 ? true : isValidPIN(pin);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const orderId = `LL-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setLastOrderId(orderId);

    // Notify seller store & deduct stock
    const itemSummaries = items.map((i) => ({
      productId: i.product.id,
      productName: i.product.name,
      quantity: i.quantity,
      priceINR: i.product.priceINR,
      image: i.product.image
    }));

    addOrderNotification({
      orderId,
      customerName: custName,
      customerMobile: custPhone,
      shippingAddress: `${house}, ${street}, ${city}, ${stateName} - ${pin || '221005'}`,
      items: itemSummaries,
      totalAmountINR: total,
      paymentMethod: method.toUpperCase(),
      orderedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'Received'
    });

    deductStockForOrder(items.map((i) => ({ productId: i.product.id, quantity: i.quantity })));
    recordPurchasedProducts(items.map((i) => i.product.id));

    setPlaced(true);
    clearCart();
  }

  if (placed) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-36 text-center bg-[#faeee7] text-[#33272a] font-sans">
        <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-12 shadow-xl">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#ffc6c7] text-3xl text-[#33272a] font-bold">
            ✓
          </div>
          <p className="label-eyebrow mt-6 text-xs">Order Dispatched to Artisan</p>
          <h1 className="display-h mt-2 text-4xl text-[#33272a]">Thank You For Ordering.</h1>
          <p className="mt-2 text-xs font-mono text-[#ff8ba7] font-bold">Order ID: {lastOrderId}</p>
          <p className="mt-4 text-sm text-[#594a4e] leading-relaxed">
            Your order details have been sent directly to our weaver artisan cooperative dashboard. A GST tax invoice with tracking details will be sent to your mobile &amp; email.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/profile" className="wax-button text-xs px-7 py-3">
              View Order in Profile →
            </Link>
            <Link href="/seller" className="ghost-button text-xs px-7 py-3">
              Check Seller Dashboard →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-32 bg-[#faeee7] text-[#33272a] font-sans">
      <header className="max-w-3xl">
        <p className="label-eyebrow text-xs">Express Checkout</p>
        <h1 className="display-h mt-2 text-5xl text-[#33272a] sm:text-6xl">Order Details.</h1>
        <p className="mt-3 text-base text-[#594a4e]">
          Direct artisan fulfillment across India. All prices inclusive of GST. Pay via UPI, Cards, NetBanking or COD.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr,1.1fr]">
        <form className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md" onSubmit={handleSubmit}>
          <h2 className="display-h text-2xl text-[#33272a]">1. Shipping Address</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" name="name" value={custName} onChange={setCustName} required />
            <Field label="Mobile (+91)" name="phone" value={custPhone} onChange={setCustPhone} required />
            <Field label="House / Flat Number" name="house" value={house} onChange={setHouse} required />
            <Field label="Street / Area" name="street" value={street} onChange={setStreet} required />
            <Field label="City" name="city" value={city} onChange={setCity} required />
            <Field label="State" name="state" type="select" options={INDIAN_STATES} value={stateName} onChange={setStateName} required />
            <Field
              label="PIN Code"
              name="pin"
              placeholder="221005"
              value={pin}
              onChange={(v: string) => setPin(v)}
              error={!validPin ? 'PIN must be 6 digits (e.g. 221005)' : null}
              required
            />
          </div>

          <h2 className="display-h mt-10 text-2xl text-[#33272a]">2. Payment Method</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDIAN_PAYMENTS.map((p) => (
              <label
                key={p.id}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-xs font-semibold cursor-pointer transition ${
                  method === p.id
                    ? 'border-[#ff8ba7] bg-[#faeee7] text-[#33272a]'
                    : 'border-[#33272a]/15 bg-[#fffffe] text-[#594a4e] hover:border-[#ff8ba7]'
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value={p.id}
                  checked={method === p.id}
                  onChange={() => setMethod(p.id)}
                  className="sr-only"
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>

          {(method === 'upi' || method === 'phonepe' || method === 'gpay' || method === 'paytm' || method === 'bhim') && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="UPI ID" name="vpa" placeholder="yourname@upi" />
              <UpiQrPlaceholder amount={total} />
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-[#33272a]/10 pt-6">
            <Link href="/cart" className="ghost-button text-xs">
              ← Back to Bag
            </Link>
            <button type="submit" className="wax-button text-xs px-8 py-3.5">
              Confirm &amp; Place Order ({formatINR(total)})
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
            <h2 className="display-h text-2xl text-[#33272a]">Order &amp; GST Summary</h2>

            <div className="mt-4 divide-y divide-[#33272a]/10 space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-3 flex justify-between text-xs text-[#594a4e]">
                  <span className="font-medium">{product.name} (x{quantity})</span>
                  <span className="font-semibold text-[#33272a]">{formatINR(product.priceINR * quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-[#33272a]/15 pt-4 text-xs">
              <Line label="Taxable Value" value={formatINR(gst.base)} />
              <Line label="GST Split (@5%/12%)" value={formatINR(gst.gst)} />
              <Line label="Delivery Across India" value="FREE" />
              <Line label="Grand Total (incl. GST)" value={formatINR(total)} bold />
            </div>

            <div className="mt-6 rounded-2xl border border-[#33272a]/15 bg-[#faeee7] p-4 text-xs text-[#33272a] leading-relaxed">
              <strong>Loomlore Pvt. Ltd. · GSTIN 09ABCDE1234F1Z5</strong><br />
              Official GST tax invoice will be sent via SMS &amp; email upon order placement.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field(props: any) {
  const { label, name, type = 'text', placeholder, required, value, onChange, options, error } = props;
  const v = value ?? '';
  return (
    <label className="block text-xs font-sans">
      <span className="block uppercase tracking-[0.2em] text-[#ff8ba7] font-bold mb-1.5">{label}</span>
      {type === 'select' ? (
        <select
          name={name}
          required={required}
          value={v}
          onChange={(e: any) => onChange && onChange(e.target.value)}
          className="w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] focus:border-[#ff8ba7] focus:outline-none"
        >
          <option value="">Select State</option>
          {options.map((o: string) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={v}
          onChange={(e: any) => onChange && onChange(e.target.value)}
          className={`w-full rounded-xl border ${
            error ? 'border-red-400' : 'border-[#33272a]/20'
          } bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] placeholder:text-[#594a4e]/40 focus:border-[#ff8ba7] focus:outline-none`}
        />
      )}
      {error && <span className="mt-1 block text-xs text-red-500 font-medium">{error}</span>}
    </label>
  );
}

function Line({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? 'border-t border-[#33272a]/15 pt-3' : ''}`}>
      <span className="text-[#594a4e]">{label}</span>
      <span className={`display-h ${bold ? 'text-xl text-[#33272a] font-bold' : 'text-sm text-[#33272a] font-semibold'}`}>
        {value}
      </span>
    </div>
  );
}

function UpiQrPlaceholder({ amount }: { amount: number }) {
  const cells: boolean[] = Array.from({ length: 25 * 25 }, (_, i) => (((i * 9301 + 49297) % 233280) % 3) !== 0);
  return (
    <div className="rounded-2xl border border-[#33272a]/15 bg-[#faeee7] p-4 text-center text-[#33272a]">
      <div className="mx-auto grid h-32 w-32 grid-cols-[repeat(25,1fr)] grid-rows-[repeat(25,1fr)] gap-[1px] bg-[#33272a] p-1 rounded-lg">
        {cells.map((on, i) => (
          <span key={i} className={on ? 'bg-[#33272a]' : 'bg-[#fffffe]'} />
        ))}
      </div>
      <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#33272a]">Scan to pay {formatINR(amount)}</p>
      <p className="text-[10px] text-[#594a4e] font-mono mt-0.5">care@loomlore.in</p>
    </div>
  );
}
