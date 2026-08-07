'use client';

import { useState } from 'react';
import { STATES } from '@/data/india';
import { formatINR } from '@/lib/india';
import { useAuthStore } from '@/lib/auth';

type Tab = 'sellers' | 'inventory' | 'orders' | 'analytics' | 'coupons';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('sellers');
  const { pendingSellers, approveSeller, rejectSeller } = useAuthStore();

  const [stock, setStock] = useState<Record<string, number>>(
    Object.fromEntries(STATES.map((s) => [s.id, 12]))
  );

  function adjust(id: string, delta: number) {
    setStock((s) => ({ ...s, [id]: Math.max(0, (s[id] ?? 0) + delta) }));
  }

  const totalRevenue = STATES.reduce((sum, s) => sum + s.priceINR * 28, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-32 bg-[#faeee7] text-[#33272a] font-sans">
      <header className="max-w-3xl">
        <p className="label-eyebrow text-xs">Website Admin Review Team</p>
        <h1 className="display-h mt-2 text-5xl text-[#33272a]">Admin Audit Panel.</h1>
        <p className="mt-2 text-sm text-[#594a4e]">
          Inspect and approve artisan seller business registrations, PAN/GSTIN credentials, and catalog inventory.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] font-bold">
        {(['sellers', 'inventory', 'orders', 'analytics', 'coupons'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-5 py-2 transition ${
              tab === t ? 'border-[#33272a] bg-[#33272a] text-[#fffffe]' : 'border-[#33272a]/20 bg-[#fffffe] text-[#33272a] hover:border-[#ff8ba7]'
            }`}
          >
            {t === 'sellers' ? `Seller Approvals (${pendingSellers.length})` : t}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {/* TAB 1: SELLER APPROVAL WORKFLOW */}
        {tab === 'sellers' && (
          <div className="space-y-6">
            <h2 className="display-h text-2xl text-[#33272a]">Pending Seller Registrations ({pendingSellers.length})</h2>
            <p className="text-xs text-[#594a4e]">Review PAN &amp; tax credentials submitted by weaver cooperatives.</p>

            {pendingSellers.length > 0 ? (
              <div className="space-y-6">
                {pendingSellers.map((sel) => (
                  <div key={sel.id} className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#33272a]/10 pb-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#ff8ba7] font-bold">Merchant Registration</span>
                        <h3 className="display-h text-2xl text-[#33272a]">{sel.firmName}</h3>
                        <p className="text-xs text-[#594a4e]">Submitted on {sel.submittedAt}</p>
                      </div>
                      <div>
                        <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                          sel.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : sel.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          Status: {sel.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3 rounded-2xl bg-[#faeee7] p-5 text-xs">
                      <div>
                        <strong className="text-[#33272a] uppercase tracking-wider text-[10px]">Owner &amp; Contact:</strong>
                        <p className="mt-1 text-[#33272a] font-bold">{sel.ownerName}</p>
                        <p className="text-[#594a4e]">+91 {sel.mobile}</p>
                        <p className="text-[#594a4e]">{sel.email}</p>
                      </div>
                      <div>
                        <strong className="text-[#33272a] uppercase tracking-wider text-[10px]">Tax &amp; Firm Credentials:</strong>
                        <p className="mt-1 font-mono text-[#33272a]">PAN: {sel.panNumber}</p>
                        <p className="font-mono text-[#33272a]">GSTIN: {sel.gstinNumber}</p>
                        <p className="text-[#594a4e]">Hub: {sel.city}, {sel.state}</p>
                      </div>
                      <div>
                        <strong className="text-[#33272a] uppercase tracking-wider text-[10px]">Banking &amp; Craft:</strong>
                        <p className="mt-1 font-mono text-[#33272a]">A/C: {sel.bankAccount}</p>
                        <p className="font-mono text-[#33272a]">IFSC: {sel.ifscCode}</p>
                        <p className="text-[#594a4e] line-clamp-1">{sel.craftSpecialty}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-[#33272a]/10 pt-4">
                      {sel.status !== 'approved' && (
                        <button
                          onClick={() => approveSeller(sel.id)}
                          className="wax-button text-xs px-6 py-2.5"
                        >
                          Approve Firm Listing Access ✓
                        </button>
                      )}
                      {sel.status !== 'rejected' && (
                        <button
                          onClick={() => rejectSeller(sel.id)}
                          className="rounded-full border border-rose-300 bg-rose-50 px-5 py-2.5 text-xs uppercase tracking-wider text-rose-800 font-bold hover:bg-rose-100"
                        >
                          Reject Application
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-12 text-center">
                <p className="display-h text-2xl text-[#33272a]">No Pending Seller Registrations</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INVENTORY */}
        {tab === 'inventory' && (
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] overflow-hidden">
            <table className="w-full text-left text-sm font-sans">
              <thead>
                <tr className="border-b border-[#33272a]/15 bg-[#faeee7] text-xs uppercase tracking-[0.2em] text-[#33272a] font-bold">
                  <th className="px-5 py-4">State</th>
                  <th className="px-5 py-4">Garment</th>
                  <th className="px-5 py-4">Fabric</th>
                  <th className="px-5 py-4">Stock Units</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {STATES.map((s) => (
                  <tr key={s.id} className="border-b border-[#33272a]/10 text-[#594a4e]">
                    <td className="px-5 py-4 font-semibold text-[#33272a]">{s.name}</td>
                    <td className="px-5 py-4">{s.signatureGarment}</td>
                    <td className="px-5 py-4">{s.fabric}</td>
                    <td className="px-5 py-4 font-bold text-[#33272a]">{stock[s.id]}</td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => adjust(s.id, -1)} className="rounded-full border border-[#33272a]/20 px-3 py-1 text-xs font-bold hover:border-[#ff8ba7]">-</button>
                      <button onClick={() => adjust(s.id, 1)} className="ml-2 rounded-full border border-[#33272a]/20 px-3 py-1 text-xs font-bold hover:border-[#ff8ba7]">+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {tab === 'orders' && (
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 text-center">
            <h3 className="display-h text-2xl text-[#33272a]">Live Subcontinent Orders Log</h3>
            <p className="mt-2 text-xs text-[#594a4e]">All orders dispatches logged automatically to respective state weaver cooperatives.</p>
          </div>
        )}

        {/* TAB 4: ANALYTICS */}
        {tab === 'analytics' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans">
            {[
              { k: 'Revenue (FY)', v: formatINR(totalRevenue) },
              { k: 'Active Weavers', v: '28 Cooperatives' },
              { k: 'Registered Buyers', v: '14,290' },
              { k: 'Avg Basket Size', v: formatINR(14200) }
            ].map((m) => (
              <div key={m.k} className="royal-card p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">{m.k}</p>
                <p className="display-h mt-2 text-2xl font-bold text-[#33272a]">{m.v}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
