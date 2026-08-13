'use client';

import { useState } from 'react';
import { STATES } from '@/data/india';
import { products } from '@/data/catalog';
import { formatINR } from '@/lib/india';
import { useAuthStore } from '@/lib/auth';
import { useStoreSettings } from '@/lib/storeSettings';

type Tab = 'branding' | 'sellers' | 'inventory' | 'orders' | 'analytics' | 'export';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('branding');
  const { pendingSellers, approveSeller, rejectSeller } = useAuthStore();
  const { settings, updateSettings, resetToDefaults } = useStoreSettings();

  // Re-branding Form State
  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [supportPhone, setSupportPhone] = useState(settings.supportPhone);
  const [address, setAddress] = useState(settings.address);
  const [noticeBanner, setNoticeBanner] = useState(settings.noticeBanner);
  const [saveMsg, setSaveMsg] = useState('');

  const [stock, setStock] = useState<Record<string, number>>(
    Object.fromEntries(STATES.map((s) => [s.id, 12]))
  );

  function adjust(id: string, delta: number) {
    setStock((s) => ({ ...s, [id]: Math.max(0, (s[id] ?? 0) + delta) }));
  }

  function handleSaveBranding(e: React.FormEvent) {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      supportEmail,
      supportPhone,
      address,
      noticeBanner
    });
    setSaveMsg('Store Re-branding Settings Saved Successfully!');
    setTimeout(() => setSaveMsg(''), 4000);
  }

  // Data Export Functions for Buyer Handover
  function exportJSON(filename: string, data: any) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportCSV(filename: string, rows: Record<string, any>[]) {
    if (!rows || rows.length === 0) return;
    const headers = Object.keys(rows[0]).join(',');
    const csvContent = [
      headers,
      ...rows.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalRevenue = 1248500;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-32 bg-[#faeee7] text-[#33272a] font-sans">
      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-[#33272a]/15 pb-8">
        <div>
          <span className="label-eyebrow text-xs">Turnkey Admin Control &amp; Re-branding Suite</span>
          <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">Admin Master Panel</h1>
          <p className="mt-2 text-sm text-[#594a4e]">
            Manage store branding, sales analytics, product inventory, seller approvals, and buyer data exports.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-xs text-emerald-950 font-bold">
          ✓ Turnkey Ready For Website Sale
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] font-bold">
        {[
          { id: 'branding', label: 'Store Re-branding' },
          { id: 'sellers', label: `Seller Approvals (${pendingSellers.length})` },
          { id: 'inventory', label: 'Product Inventory' },
          { id: 'analytics', label: 'Sales & Revenue Analytics' },
          { id: 'export', label: '1-Click Data Handover' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as Tab)}
            className={`rounded-full border px-5 py-2.5 transition ${
              tab === t.id
                ? 'border-[#33272a] bg-[#33272a] text-[#fffffe] shadow-xs'
                : 'border-[#33272a]/20 bg-[#fffffe] text-[#33272a] hover:border-[#ff8ba7]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {/* TAB 1: STORE RE-BRANDING */}
        {tab === 'branding' && (
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
            <div className="flex items-center justify-between border-b border-[#33272a]/10 pb-4">
              <div>
                <h2 className="display-h text-2xl text-[#33272a]">Store Re-branding &amp; Settings</h2>
                <p className="text-xs text-[#594a4e]">Update store name, tagline, support contact, and global notice banner.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setStoreName('LOOMLORE');
                  setTagline('Heirlooms of India');
                  setSupportEmail('care@loomlore.in');
                  setSupportPhone('+91 98765 43210');
                  setAddress('Heritage Textile Pavilion, Janpath, New Delhi - 110001');
                }}
                className="text-[10px] uppercase font-bold text-[#ff8ba7] hover:underline"
              >
                Reset to Defaults
              </button>
            </div>

            {saveMsg && (
              <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-center text-xs font-bold text-emerald-900">
                {saveMsg}
              </div>
            )}

            <form onSubmit={handleSaveBranding} className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Store Brand Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] font-bold outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Brand Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Support Email Address</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Customer Support Phone</label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Physical Address / Headquarters</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Global Top Notice Banner</label>
                <textarea
                  rows={2}
                  value={noticeBanner}
                  onChange={(e) => setNoticeBanner(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button type="submit" className="wax-button w-full py-3.5 text-xs font-bold">
                  Save Re-branding Settings →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: SELLER APPROVAL WORKFLOW */}
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

        {/* TAB 3: INVENTORY */}
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

        {/* TAB 4: ANALYTICS */}
        {tab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans">
              {[
                { k: 'Gross Revenue', v: formatINR(totalRevenue), change: '+24.8% vs last mo' },
                { k: 'Active Weavers', v: '28 Cooperatives', change: 'Covering 28 States' },
                { k: 'Registered Buyers', v: '14,290', change: '+1,820 this month' },
                { k: 'Avg Order Value (AOV)', v: formatINR(8790), change: 'High margin AOV' }
              ].map((m) => (
                <div key={m.k} className="royal-card p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">{m.k}</p>
                  <p className="display-h mt-2 text-3xl font-bold text-[#33272a]">{m.v}</p>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-800">{m.change}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-sm">
              <h3 className="display-h text-2xl text-[#33272a]">Top Revenue Craft Categories</h3>
              <p className="text-xs text-[#594a4e] mt-1">Breakdown of gross handloom sales across regional craft clusters.</p>

              <div className="mt-6 space-y-4">
                {[
                  { category: 'Banarasi Zari Silk Sarees (Uttar Pradesh)', pct: '38%', amount: '₹4,74,430' },
                  { category: 'Kanjeevaram Silk & Veshti (Tamil Nadu)', pct: '26%', amount: '₹3,24,610' },
                  { category: 'Bandhani Rai Bandhej (Gujarat & Rajasthan)', pct: '18%', amount: '₹2,24,730' },
                  { category: 'Cashmere Hand-Embroidered Pashminas (J&K)', pct: '12%', amount: '₹1,49,820' },
                  { category: 'Paithani Peacock Sarees (Maharashtra)', pct: '6%', amount: '₹74,910' }
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-[#33272a]">
                      <span>{cat.category}</span>
                      <span>{cat.amount} ({cat.pct})</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#faeee7] overflow-hidden">
                      <div className="h-full bg-[#ff8ba7]" style={{ width: cat.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 1-CLICK DATA EXPORT & HANDOVER */}
        {tab === 'export' && (
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md space-y-6">
            <div>
              <span className="label-eyebrow text-xs">Buyer Turnkey Handover Tools</span>
              <h2 className="display-h mt-1 text-3xl text-[#33272a]">1-Click Data Backup &amp; Export</h2>
              <p className="mt-1 text-xs text-[#594a4e]">
                Export complete database records in JSON or CSV format for instant store transfer to new owner.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="royal-card p-6 space-y-3">
                <h3 className="display-h text-xl text-[#33272a]">📦 Export Catalog Products</h3>
                <p className="text-xs text-[#594a4e]">Download all 73 traditional clothing catalog items with prices and state tags.</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => exportJSON('loomlore_catalog_products.json', products)}
                    className="wax-button text-xs px-4 py-2"
                  >
                    Export JSON →
                  </button>
                  <button
                    onClick={() => exportCSV('loomlore_catalog_products.csv', products.map(p => ({ id: p.id, name: p.name, state: p.state, priceINR: p.priceINR })))}
                    className="ghost-button text-xs px-4 py-2"
                  >
                    Export CSV →
                  </button>
                </div>
              </div>

              <div className="royal-card p-6 space-y-3">
                <h3 className="display-h text-xl text-[#33272a]">👥 Export Seller Registrations</h3>
                <p className="text-xs text-[#594a4e]">Download all registered artisan weaver co-op credentials and PAN tax details.</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => exportJSON('loomlore_seller_registrations.json', pendingSellers)}
                    className="wax-button text-xs px-4 py-2"
                  >
                    Export JSON →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
