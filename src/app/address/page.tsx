'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth';

export default function AddressPage() {
  const { user, isLoggedIn, addAddress, deleteAddress, setDefaultAddress } = useAuthStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi');
  const [isDefault, setIsDefault] = useState(false);
  const [msg, setMsg] = useState('');

  if (!isLoggedIn || !user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-36 text-center font-sans bg-[#faeee7] text-[#33272a]">
        <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-10 shadow-md">
          <span className="label-eyebrow text-xs">Account Delivery Addresses</span>
          <h1 className="display-h mt-2 text-3xl text-[#33272a]">Sign In Required</h1>
          <p className="mt-3 text-xs text-[#594a4e]">
            Please sign in to manage your saved shipping addresses for Pan-India delivery.
          </p>
          <Link href="/login" className="wax-button mt-6 inline-block text-xs px-8 py-3">
            Sign In to Manage Addresses →
          </Link>
        </div>
      </div>
    );
  }

  function handleSaveAddress(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    if (mobile.replace(/\D/g, '').length !== 10) {
      setMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (pincode.replace(/\D/g, '').length !== 6) {
      setMsg('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    addAddress({
      name,
      mobile: mobile.replace(/\D/g, ''),
      pincode: pincode.trim(),
      addressLine,
      city,
      state,
      isDefault
    });

    setName('');
    setMobile('');
    setPincode('');
    setAddressLine('');
    setCity('');
    setState('Delhi');
    setIsDefault(false);
    setShowAddForm(false);
    setMsg('New delivery address saved to your profile!');
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-32 font-sans bg-[#faeee7] text-[#33272a]">
      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-[#33272a]/15 pb-8">
        <div>
          <span className="label-eyebrow text-xs">Pan-India Delivery Network</span>
          <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">Delivery Addresses</h1>
          <p className="mt-2 text-xs text-[#594a4e]">
            Manage shipping locations for <strong className="text-[#33272a]">{user.email}</strong>.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="wax-button text-xs px-6 py-3"
          >
            {showAddForm ? 'Close Address Form' : '+ Add New Shipping Address'}
          </button>
          <Link href="/profile" className="ghost-button text-xs px-5 py-3">
            Back to Profile →
          </Link>
        </div>
      </header>

      {msg && (
        <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-center text-xs font-bold text-emerald-900">
          {msg}
        </div>
      )}

      {/* Add New Address Form */}
      {showAddForm && (
        <div className="mt-8 rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
          <h2 className="display-h text-2xl text-[#33272a]">Add New Delivery Address</h2>
          <form onSubmit={handleSaveAddress} className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Recipient Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Sharma"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">10-Digit Mobile Number</label>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9876543210"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Flat / House No. &amp; Street Address</label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="Flat 402, Royal Residency, Connaught Place"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">City / Town</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New Delhi"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Delhi"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">PIN Code (6-Digits)</label>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="110001"
                className="mt-1 w-full font-mono rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="isDefault"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4 rounded accent-[#ff8ba7]"
              />
              <label htmlFor="isDefault" className="text-xs text-[#33272a] font-semibold">
                Set as Default Shipping Address
              </label>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button type="submit" className="wax-button w-full py-3 text-xs">
                Save Address to Profile →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Saved Addresses List */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {user.addresses.length > 0 ? (
          user.addresses.map((addr) => (
            <div key={addr.id} className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs relative">
              <div className="flex items-center justify-between">
                <h3 className="display-h text-xl text-[#33272a]">{addr.name}</h3>
                {addr.isDefault ? (
                  <span className="rounded-full bg-[#ff8ba7] px-3 py-0.5 text-[9px] uppercase tracking-wider text-[#33272a] font-bold">
                    Default Address
                  </span>
                ) : (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[10px] font-bold text-[#ff8ba7] uppercase tracking-wider hover:underline"
                  >
                    Make Default
                  </button>
                )}
              </div>

              <address className="mt-3 not-italic text-xs text-[#594a4e] leading-relaxed">
                {addr.addressLine}<br />
                {addr.city}, {addr.state} — <strong className="font-mono text-[#33272a]">{addr.pincode}</strong>
              </address>
              <p className="mt-2 text-[11px] font-mono text-[#33272a]">Mobile: +91 {addr.mobile}</p>

              <div className="mt-4 flex justify-end border-t border-[#33272a]/10 pt-3">
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-[10px] font-bold text-rose-600 uppercase tracking-wider hover:underline"
                >
                  Delete Address
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sm:col-span-2 rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-10 text-center">
            <p className="display-h text-2xl text-[#33272a]">No Saved Addresses</p>
            <p className="mt-1 text-xs text-[#594a4e]">Click "+ Add New Shipping Address" to save your first address.</p>
          </div>
        )}
      </div>
    </div>
  );
}
