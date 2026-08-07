import { INDIAN_PAYMENTS } from '@/lib/india';

export const metadata = { title: 'Payments — Loomlore' };

export default function PaymentsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-32 bg-[#fff5f7] text-[#2b0914] font-sans">
      <header className="max-w-2xl">
        <p className="label-eyebrow font-sans text-xs">India-First Checkout</p>
        <h1 className="display-h mt-3 text-5xl text-[#831843]">Pay The Indian Way.</h1>
        <p className="mt-4 text-base leading-relaxed text-[#4c0519]/75">
          Settle in INR with zero currency conversion fees. Every order receives an official GST tax invoice with HSN code breakdown.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {INDIAN_PAYMENTS.map((p) => (
          <div key={p.id} className="royal-card flex items-center justify-between p-5 font-sans">
            <span className="display-h text-xl text-[#831843]">{p.label}</span>
            <span className="rounded-full border border-rose-200 bg-[#fff0f3] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#be123c] font-semibold">
              INR
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
