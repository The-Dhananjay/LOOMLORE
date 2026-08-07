'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, DEMO_CUSTOMER_MOBILE, DEMO_SELLER_MOBILE, DEMO_ADMIN_MOBILE, DEMO_OTP } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const {
    user,
    isLoggedIn,
    registerBuyer,
    registerSeller,
    verifyOTP,
    loginAsDemoCustomer,
    loginAsDemoSeller,
    loginAsDemoAdmin
  } = useAuthStore();

  const [portalType, setPortalType] = useState<'buyer' | 'seller'>('buyer');
  const [authStep, setAuthStep] = useState<'input' | 'otp'>('input');
  
  // Buyer form
  const [buyerName, setBuyerName] = useState('');
  const [buyerMobile, setBuyerMobile] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  
  // Seller registration form
  const [firmName, setFirmName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [sellerMobile, setSellerMobile] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerState, setSellerState] = useState('Rajasthan');
  const [sellerCity, setSellerCity] = useState('Jaipur');
  const [panNumber, setPanNumber] = useState('');
  const [gstinNumber, setGstinNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [craftSpecialty, setCraftSpecialty] = useState('');

  // OTP State
  const [otpInput, setOtpInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingNotice, setPendingNotice] = useState<string | null>(null);

  function handleBuyerSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    if (buyerMobile.length !== 10) {
      setErrorMsg('Mobile number must be exactly 10 digits.');
      return;
    }
    if (!buyerEmail.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    setAuthStep('otp');
  }

  function handleVerifyBuyerOTP(e: React.FormEvent) {
    e.preventDefault();
    if (otpInput.trim() === DEMO_OTP || otpInput.trim() === '654321') {
      const ok = registerBuyer(buyerName || 'Valued Customer', buyerMobile, buyerEmail);
      if (ok) {
        router.push('/profile');
      }
    } else {
      setErrorMsg(`Invalid OTP. Use Demo OTP: ${DEMO_OTP}`);
    }
  }

  function handleSellerRegistration(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    if (sellerMobile.length !== 10) {
      setErrorMsg('Mobile number must be 10 digits.');
      return;
    }
    if (panNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-character PAN number.');
      return;
    }

    const reg = registerSeller({
      firmName,
      ownerName,
      mobile: sellerMobile,
      email: sellerEmail,
      state: sellerState,
      city: sellerCity,
      panNumber: panNumber.toUpperCase(),
      gstinNumber: gstinNumber.toUpperCase() || 'PENDING',
      bankAccount,
      ifscCode: ifscCode.toUpperCase(),
      craftSpecialty
    });

    setPendingNotice(
      `Registration Submitted for "${reg.firmName}". Our website audit team will review your PAN (${reg.panNumber}) and firm credentials within 24–48 hours. A verification email has been sent to ${reg.email}.`
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-36 font-sans bg-[#faeee7] text-[#33272a]">
      <header className="text-center max-w-2xl mx-auto">
        <span className="label-eyebrow text-xs">Heritage Subcontinent Authentication</span>
        <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">
          Sign In or Register
        </h1>
        <p className="mt-3 text-sm text-[#594a4e]">
          Choose whether you are shopping for authentic Indian handlooms or registering as a weaver artisan seller.
        </p>
      </header>

      {/* Portal Selection Segmented Control */}
      <div className="mt-10 flex max-w-md mx-auto rounded-full border border-[#33272a]/20 bg-[#fffffe] p-1.5 shadow-sm">
        <button
          onClick={() => {
            setPortalType('buyer');
            setPendingNotice(null);
            setErrorMsg('');
          }}
          className={`flex-1 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            portalType === 'buyer'
              ? 'bg-[#33272a] text-[#fffffe] shadow-xs'
              : 'text-[#594a4e] hover:text-[#33272a]'
          }`}
        >
          1. Buyer / Customer
        </button>
        <button
          onClick={() => {
            setPortalType('seller');
            setPendingNotice(null);
            setErrorMsg('');
          }}
          className={`flex-1 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            portalType === 'seller'
              ? 'bg-[#ff8ba7] text-[#33272a] shadow-xs'
              : 'text-[#594a4e] hover:text-[#33272a]'
          }`}
        >
          2. Artisan / Seller
        </button>
      </div>

      {/* Demo Credentials Alert Banner */}
      <div className="mt-8 max-w-xl mx-auto rounded-3xl border border-[#ff8ba7]/40 bg-[#fffffe] p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-[#ff8ba7] font-bold">
            Demo Portal Credentials
          </span>
          <span className="text-[10px] text-[#594a4e]">Universal Demo OTP: <strong className="font-mono text-[#33272a]">{DEMO_OTP}</strong></span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => {
              loginAsDemoCustomer();
              router.push('/profile');
            }}
            className="ghost-button flex-1 text-[10px] py-1.5"
          >
            Sign In as Customer ({DEMO_CUSTOMER_MOBILE})
          </button>
          <button
            onClick={() => {
              loginAsDemoSeller();
              router.push('/seller');
            }}
            className="wax-button flex-1 text-[10px] py-1.5"
          >
            Sign In as Approved Seller ({DEMO_SELLER_MOBILE})
          </button>
          <button
            onClick={() => {
              loginAsDemoAdmin();
              router.push('/admin');
            }}
            className="rounded-full border border-[#33272a]/20 bg-[#faeee7] px-3 py-1 text-[10px] uppercase tracking-wider text-[#33272a] font-bold"
          >
            Website Admin Team ({DEMO_ADMIN_MOBILE})
          </button>
        </div>
      </div>

      {/* PORTAL FORM 1: BUYER ACCOUNT (MOBILE + EMAIL NEEDED) */}
      {portalType === 'buyer' && (
        <div className="mt-8 max-w-xl mx-auto rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
          <h2 className="display-h text-2xl text-[#33272a]">Buyer Account Registration &amp; Sign In</h2>
          <p className="mt-1 text-xs text-[#594a4e]">
            Both Mobile Number (+91) and Email Address are required to create a buyer account.
          </p>

          {errorMsg && (
            <p className="mt-4 rounded-xl bg-rose-50 p-3 text-center text-xs font-semibold text-rose-700">
              {errorMsg}
            </p>
          )}

          {authStep === 'input' ? (
            <form onSubmit={handleBuyerSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Your Full Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none focus:border-[#ff8ba7]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Mobile Number (Required)</label>
                <div className="mt-1 flex gap-2">
                  <span className="inline-flex items-center rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3 text-xs font-bold text-[#33272a]">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={buyerMobile}
                    onChange={(e) => setBuyerMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none focus:border-[#ff8ba7]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Email Address (Required)</label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="priya.sharma@example.in"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none focus:border-[#ff8ba7]"
                  required
                />
              </div>

              <button type="submit" className="wax-button w-full py-3 text-xs">
                Proceed to OTP Verification →
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyBuyerOTP} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Enter 6-Digit OTP</label>
                <p className="text-xs text-[#594a4e]">Sent to +91 {buyerMobile} &amp; {buyerEmail}</p>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="123456"
                  className="mt-2 w-full text-center text-2xl tracking-[0.5em] font-mono rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-[#33272a] outline-none focus:border-[#ff8ba7]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthStep('input')}
                  className="ghost-button px-4 py-2.5 text-xs"
                >
                  Edit Details
                </button>
                <button type="submit" className="wax-button flex-1 py-2.5 text-xs">
                  Create Buyer Account &amp; Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* PORTAL FORM 2: SELLER REGISTRATION & APPROVAL WORKFLOW */}
      {portalType === 'seller' && (
        <div className="mt-8 max-w-2xl mx-auto rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
          <h2 className="display-h text-3xl text-[#33272a]">Artisan &amp; Merchant Seller Registration</h2>
          <p className="mt-1 text-xs text-[#594a4e]">
            Complete all tax and firm details. Our website audit team reviews every firm within 24–48 hours before granting listing access.
          </p>

          {pendingNotice ? (
            <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-center text-xs text-amber-900">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-200 text-xl font-bold text-amber-900 mb-3">
                ⏳
              </div>
              <h3 className="display-h text-2xl text-amber-900">Firm Verification Pending</h3>
              <p className="mt-2 leading-relaxed">{pendingNotice}</p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/admin" className="wax-button text-xs px-6 py-2.5">
                  Open Website Team Admin Panel (To Approve) →
                </Link>
                <Link href="/seller" className="ghost-button text-xs px-6 py-2.5">
                  Check Seller Status →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSellerRegistration} className="mt-6 grid gap-5 sm:grid-cols-2">
              {errorMsg && (
                <div className="sm:col-span-2 rounded-xl bg-rose-50 p-3 text-center text-xs font-semibold text-rose-700">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Business / Firm Name</label>
                <input
                  type="text"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="e.g. Bhopa Handloom Cooperative"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Owner / Weaver Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Sunita Devi Bhopa"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Seller Mobile (+91)</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={sellerMobile}
                  onChange={(e) => setSellerMobile(e.target.value)}
                  placeholder="9123456789"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Official Business Email</label>
                <input
                  type="email"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                  placeholder="artisan@bhopacoop.in"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">State</label>
                <input
                  type="text"
                  value={sellerState}
                  onChange={(e) => setSellerState(e.target.value)}
                  placeholder="Rajasthan"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">City / Weaving Hub</label>
                <input
                  type="text"
                  value={sellerCity}
                  onChange={(e) => setSellerCity(e.target.value)}
                  placeholder="Jodhpur"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">PAN Number (Required)</label>
                <input
                  type="text"
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value)}
                  placeholder="BHPPD1234F"
                  className="mt-1 w-full font-mono uppercase tracking-wider rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">GSTIN Number (Or 'Pending')</label>
                <input
                  type="text"
                  maxLength={15}
                  value={gstinNumber}
                  onChange={(e) => setGstinNumber(e.target.value)}
                  placeholder="08BHPPD1234F1Z5"
                  className="mt-1 w-full font-mono uppercase tracking-wider rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Bank Account Number</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="98765432101234"
                  className="mt-1 w-full font-mono rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Bank IFSC Code</label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  placeholder="SBIN0001234"
                  className="mt-1 w-full font-mono uppercase rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Handloom Craft Specialty</label>
                <textarea
                  rows={2}
                  value={craftSpecialty}
                  onChange={(e) => setCraftSpecialty(e.target.value)}
                  placeholder="Hand-tied Bandhani Rai Bandhej Georgette and Dupattas..."
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <button type="submit" className="wax-button w-full py-3.5 text-xs">
                  Submit Seller Credentials for Website Team Review →
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
