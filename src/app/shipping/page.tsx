export const metadata = { title: 'Shipping Policy — Loomlore' };

export default function ShippingPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-32 bg-[#fff5f7] text-[#2b0914] font-sans">
      <header className="max-w-2xl">
        <p className="label-eyebrow font-sans text-xs">Pan-India Delivery</p>
        <h1 className="display-h mt-3 text-5xl text-[#831843]">2–7 Days Express Shipping.</h1>
      </header>

      <div className="mt-8 space-y-6 rounded-3xl border border-rose-200 bg-white p-8 md:p-12 shadow-sm text-[#4c0519]/85 font-sans leading-relaxed">
        <p className="text-lg text-[#831843] font-medium">
          Metros delivered in 2–4 business days; rest of India in 4–7 business days.
        </p>
        <p>
          Free express shipping on all orders above ₹1,500 across India. Orders under ₹1,500 carry a flat ₹150 delivery fee.
        </p>
        <p>
          Includes easy 7-day returns &amp; exchanges. An official GST tax invoice is emailed with every dispatch.
        </p>
      </div>
    </div>
  );
}
