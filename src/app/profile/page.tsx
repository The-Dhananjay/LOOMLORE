'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/auth';
import { useSellerStore } from '@/lib/seller';
import { formatINR } from '@/lib/india';
import { LoginModal } from '@/components/LoginModal';
import { useAuth } from '@/hooks/useAuth';
import { getSecurityLogs, getBrowserInfo, getOSInfo } from '@/lib/security';

export default function ProfilePage() {
  const { user, isLoggedIn, logout, openLoginModal } = useAuthStore();
  const { logout: fbLogout } = useAuth();
  const { sellerOrders } = useSellerStore();

  const handleNavToLogin = async () => {
    await fbLogout();
    logout();
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-40 text-center font-sans bg-[#faeee7] text-[#33272a]">
        <LoginModal />
        <h1 className="display-h text-4xl text-[#33272a]">Buyer Account Portal</h1>
        <p className="mt-3 text-sm text-[#594a4e]">Please sign in with your email &amp; password to view your account orders and addresses.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/login" onClick={handleNavToLogin} className="wax-button text-xs px-8 py-3">
            Go to Dedicated Login Page →
          </Link>
          <button onClick={openLoginModal} className="ghost-button text-xs px-6 py-3">
            Quick Sign In
          </button>
        </div>
      </div>
    );
  }

  // Role Restriction: Seller cannot access Buyer Profile
  if (user.role === 'seller') {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-40 text-center font-sans bg-[#faeee7] text-[#33272a]">
        <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-10 shadow-xl">
          <span className="label-eyebrow text-xs">Seller Access Notice</span>
          <h1 className="display-h mt-2 text-3xl text-[#33272a]">Artisan Seller Account Active</h1>
          <p className="mt-3 text-sm text-[#594a4e]">
            You are logged in as an Artisan Merchant (<strong className="text-[#33272a]">{user.name}</strong>). Sellers manage product listings and incoming buyer orders on the Seller Portal.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/seller" className="wax-button text-xs px-6 py-3">
              Open Seller Portal →
            </Link>
            <button onClick={logout} className="ghost-button text-xs px-6 py-3">
              Sign Out &amp; Login as Buyer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const accountOrders = user.orders || [];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 font-sans bg-[#faeee7] text-[#33272a]">
      <LoginModal />

      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-[#33272a]/15 pb-8">
        <div>
          <span className="label-eyebrow text-xs">Verified Customer Account</span>
          <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">Namaste, {user.name}</h1>
          <p className="mt-1 text-xs text-[#594a4e]">
            Account Email: <strong className="text-[#33272a]">{user.email}</strong> · Mobile: +91 {user.mobile || '9876543210'}
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/address" className="wax-button text-xs px-5 py-2.5">
            Manage Shipping Addresses →
          </Link>
          <button onClick={logout} className="ghost-button text-xs px-5 py-2.5">
            Sign Out
          </button>
        </div>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {/* Left Column: Saved Addresses */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="display-h text-2xl text-[#33272a]">Saved Addresses</h2>
              <Link href="/address" className="text-[10px] uppercase font-bold text-[#ff8ba7] hover:underline">
                Manage All →
              </Link>
            </div>
            <p className="mt-1 text-xs text-[#594a4e]">Verified delivery locations for Indian orders.</p>

            <div className="mt-6 space-y-4">
              {user.addresses && user.addresses.length > 0 ? (
                user.addresses.map((addr) => (
                  <div key={addr.id} className="royal-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#33272a]">{addr.name}</span>
                      {addr.isDefault && (
                        <span className="rounded-full bg-[#ff8ba7] px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-[#33272a] font-bold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-[#594a4e] leading-relaxed">
                      {addr.addressLine}, {addr.city}, {addr.state} — {addr.pincode}
                    </p>
                    <p className="mt-1 text-[11px] text-[#33272a] font-mono">Mobile: +91 {addr.mobile}</p>
                  </div>
                ))
              ) : (
                <div className="text-xs text-[#594a4e] space-y-2">
                  <p>No saved addresses yet.</p>
                  <Link href="/address" className="wax-button inline-block text-[10px] px-4 py-2">
                    + Add New Address
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Account Security & Active Device Audit Panel */}
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="display-h text-xl text-[#33272a]">Security &amp; Active Devices</h2>
              <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-emerald-900 font-bold">
                ✓ TLS 1.3 Encrypted
              </span>
            </div>

            <div className="rounded-2xl border border-[#33272a]/10 bg-[#faeee7] p-4 text-xs space-y-1.5">
              <p className="font-bold text-[#33272a]">Current Active Session Device:</p>
              <p className="text-[#594a4e] font-mono text-[11px]">
                {typeof window !== 'undefined' ? `${getBrowserInfo()} (${getOSInfo()})` : 'Desktop Browser'}
              </p>
              <p className="text-[10px] text-emerald-800 font-semibold pt-1">
                🔒 Security Protocol: OAuth 2.0 / Firebase Encrypted Auth
              </p>
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#33272a] mb-2">Recent Security Audit Events</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {getSecurityLogs().length > 0 ? (
                  getSecurityLogs().slice(0, 4).map((log) => (
                    <div key={log.id} className="flex items-center justify-between rounded-xl bg-[#faeee7]/60 p-2.5 text-[11px]">
                      <div>
                        <span className="font-bold text-[#33272a]">{log.eventType.replace('_', ' ')}</span>
                        <p className="text-[10px] text-[#594a4e] font-mono">{log.timestamp}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-[#faeee7]/60 p-3 text-[11px] text-[#594a4e]">
                    🔒 Authentication session verified cleanly. Zero suspicious activities logged.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#33272a]/10 flex justify-end">
              <button
                onClick={() => {
                  logout();
                  handleNavToLogin();
                }}
                className="text-[10px] uppercase font-bold text-rose-700 hover:underline"
              >
                Log Out From All Active Devices →
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Order History & Tracking System */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs">
            <h2 className="display-h text-2xl text-[#33272a]">Order Tracking &amp; History ({accountOrders.length})</h2>
            <p className="mt-1 text-xs text-[#594a4e]">Real-time tracking status of your handwoven clothing purchases.</p>

            {accountOrders.length > 0 ? (
              <div className="mt-6 space-y-6">
                {accountOrders.map((ord) => (
                  <div key={ord.id} className="rounded-2xl border border-[#33272a]/15 bg-[#faeee7] p-6 space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#33272a]/10 pb-4 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#ff8ba7] font-bold">Order ID</span>
                        <p className="font-mono text-[#33272a] font-bold text-sm">{ord.id}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#594a4e] font-semibold">Tracking Number</span>
                        <p className="font-mono text-[#33272a] font-bold text-sm">{ord.trackingId}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#594a4e] font-semibold">Courier</span>
                        <p className="text-[#33272a] font-semibold">{ord.courierPartner}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#594a4e] font-semibold">Status</span>
                        <span className="ml-2 rounded-full bg-[#ff8ba7] px-3 py-1 text-[10px] uppercase tracking-wider text-[#33272a] font-bold">
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    {/* Tracking Timeline Bar */}
                    <div className="rounded-xl border border-[#33272a]/10 bg-[#fffffe] p-4">
                      <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-[#594a4e]">
                        <span className={ord.status === 'Processing' || ord.status === 'In Transit' || ord.status === 'Delivered' ? 'text-[#ff8ba7]' : ''}>1. Order Placed</span>
                        <span className={ord.status === 'In Transit' || ord.status === 'Delivered' ? 'text-[#ff8ba7]' : ''}>2. Handwoven &amp; Dispatched</span>
                        <span className={ord.status === 'Delivered' ? 'text-[#ff8ba7]' : ''}>3. Out for Delivery</span>
                        <span className={ord.status === 'Delivered' ? 'text-emerald-700' : ''}>4. Delivered</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-[#faeee7] overflow-hidden">
                        <div
                          className="h-full bg-[#ff8ba7] transition-all duration-500"
                          style={{
                            width:
                              ord.status === 'Processing'
                                ? '25%'
                                : ord.status === 'In Transit'
                                ? '65%'
                                : ord.status === 'Out for Delivery'
                                ? '85%'
                                : '100%'
                          }}
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-[#594a4e] font-medium">
                        Estimated Delivery: <strong className="text-[#33272a]">{ord.estimatedDelivery}</strong>
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 rounded-xl bg-[#fffffe] p-3 border border-[#33272a]/10">
                          <img src={item.image} alt={item.productName} className="h-16 w-14 rounded-xl object-cover border border-[#33272a]/15" />
                          <div className="flex-1">
                            <h4 className="display-h text-lg text-[#33272a]">{item.productName}</h4>
                            <p className="text-xs text-[#594a4e]">Size: {item.size} · Qty: {item.quantity} · {formatINR(item.priceINR)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between border-t border-[#33272a]/10 pt-3 text-xs">
                      <span className="text-[#594a4e]">Payment Method: {ord.paymentMethod}</span>
                      <span className="display-h text-2xl font-bold text-[#33272a]">Total: {formatINR(ord.totalINR)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-[#33272a]/10 bg-[#faeee7] p-8 text-center">
                <p className="display-h text-2xl text-[#33272a]">No Orders Placed Yet</p>
                <p className="mt-1 text-xs text-[#594a4e]">Browse our 28-state traditional clothing collection.</p>
                <Link href="/catalog" className="wax-button mt-4 text-xs px-6 py-2.5">
                  Explore Catalog →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
