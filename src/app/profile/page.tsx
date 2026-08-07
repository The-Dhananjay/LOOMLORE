'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/auth';
import { useSellerStore } from '@/lib/seller';
import { formatINR } from '@/lib/india';
import { LoginModal } from '@/components/LoginModal';

export default function ProfilePage() {
  const { user, isLoggedIn, logout, openLoginModal } = useAuthStore();
  const { sellerOrders } = useSellerStore();

  if (!isLoggedIn || !user) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-40 text-center font-sans bg-[#faeee7] text-[#33272a]">
        <LoginModal />
        <h1 className="display-h text-4xl text-[#33272a]">Buyer Account Portal</h1>
        <p className="mt-3 text-sm text-[#594a4e]">Please sign in with your mobile number &amp; email to view your customer orders and addresses.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/login" className="wax-button text-xs px-8 py-3">
            Go to Dedicated Login Page →
          </Link>
          <button onClick={openLoginModal} className="ghost-button text-xs px-6 py-3">
            Quick Mobile Sign In
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

  // Filter orders matching user mobile
  const userOrders = sellerOrders.filter(
    (o) => o.customerMobile.replace(/\D/g, '') === user.mobile.replace(/\D/g, '')
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 font-sans bg-[#faeee7] text-[#33272a]">
      <LoginModal />

      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-[#33272a]/15 pb-8">
        <div>
          <span className="label-eyebrow text-xs">Verified Customer Account</span>
          <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">Namaste, {user.name}</h1>
          <p className="mt-1 text-xs text-[#594a4e]">
            Mobile: <strong className="font-mono text-[#33272a]">+91 {user.mobile}</strong> · Email: {user.email}
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={logout} className="ghost-button text-xs px-5 py-2.5">
            Sign Out
          </button>
        </div>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {/* Left Column: Saved Addresses */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs">
            <h2 className="display-h text-2xl text-[#33272a]">Saved Shipping Addresses</h2>
            <p className="mt-1 text-xs text-[#594a4e]">Verified delivery locations for Indian orders.</p>

            <div className="mt-6 space-y-4">
              {user.addresses.length > 0 ? (
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
                <p className="text-xs text-[#594a4e]">No saved addresses yet. Address will be saved upon checkout.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Order History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs">
            <h2 className="display-h text-2xl text-[#33272a]">Your Orders &amp; Trackings ({userOrders.length})</h2>
            <p className="mt-1 text-xs text-[#594a4e]">Live status of your traditional handwoven clothing purchases.</p>

            {userOrders.length > 0 ? (
              <div className="mt-6 space-y-6">
                {userOrders.map((ord) => (
                  <div key={ord.orderId} className="rounded-2xl border border-[#33272a]/15 bg-[#faeee7] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#33272a]/10 pb-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#ff8ba7] font-bold">Order ID</span>
                        <p className="font-mono text-[#33272a] font-bold">{ord.orderId}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#594a4e] font-semibold">Date</span>
                        <p className="text-[#33272a]">{ord.orderedAt}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#594a4e] font-semibold">Status</span>
                        <span className="ml-2 rounded-full bg-[#ff8ba7] px-3 py-0.5 text-[10px] uppercase tracking-wider text-[#33272a] font-bold">
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img src={item.image} alt={item.productName} className="h-14 w-12 rounded-xl object-cover border border-[#33272a]/15 bg-[#fffffe]" />
                          <div className="flex-1">
                            <h4 className="display-h text-lg text-[#33272a]">{item.productName}</h4>
                            <p className="text-xs text-[#594a4e]">Qty: {item.quantity} · {formatINR(item.priceINR)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#33272a]/10 pt-3 text-xs">
                      <span className="text-[#594a4e]">Payment: {ord.paymentMethod}</span>
                      <span className="display-h text-xl font-bold text-[#33272a]">Total Paid: {formatINR(ord.totalAmountINR)}</span>
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
