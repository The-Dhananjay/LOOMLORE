'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ConfirmationResult } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { googleLogin, sendPhoneOTP, verifyOTP, loading: fbLoading, user: fbUser } = useAuth();
  const {
    isLoggedIn,
    registerBuyer,
    registerSeller
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

  // Firebase Auth State
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingNotice, setPendingNotice] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  // Redirect if user is already logged in
  useEffect(() => {
    if (!fbLoading && (fbUser || isLoggedIn)) {
      const storeUser = useAuthStore.getState().user;
      if (storeUser?.role === 'seller') {
        router.replace('/seller');
      } else {
        router.replace('/profile');
      }
    }
  }, [fbUser, fbLoading, isLoggedIn, router]);

  // Resend OTP Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle Google Sign-In
  async function handleGoogleSignIn() {
    setErrorMsg('');
    setIsAuthLoading(true);
    try {
      await googleLogin();
      router.push('/profile');
    } catch (err: any) {
      setErrorMsg(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  }

  // Send Firebase Phone OTP
  async function handleBuyerSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const cleanMobile = buyerMobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Mobile number must be exactly 10 digits (e.g. 9876543210).');
      return;
    }
    if (!buyerEmail.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsAuthLoading(true);

    try {
      const result = await sendPhoneOTP(cleanMobile, 'recaptcha-container');
      setConfirmationResult(result);
      setAuthStep('otp');
      setResendTimer(30);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send OTP. Please check your mobile number.');
    } finally {
      setIsAuthLoading(false);
    }
  }

  // Verify Firebase Phone OTP
  async function handleVerifyBuyerOTP(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const cleanOtp = otpInput.trim();
    if (cleanOtp.length !== 6) {
      setErrorMsg('OTP must be exactly 6 digits.');
      return;
    }

    if (!confirmationResult) {
      setErrorMsg('Verification session expired. Please request a new OTP.');
      return;
    }

    setIsAuthLoading(true);

    try {
      const cleanMobile = buyerMobile.replace(/\D/g, '');
      await verifyOTP(confirmationResult, cleanOtp);
      registerBuyer(buyerName || 'Valued Customer', cleanMobile, buyerEmail);
      router.push('/profile');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid OTP code. Please check and re-enter.');
    } finally {
      setIsAuthLoading(false);
    }
  }

  // Resend OTP Handler
  async function handleResendOTP() {
    if (resendTimer > 0 || isAuthLoading) return;
    setErrorMsg('');
    setIsAuthLoading(true);
    try {
      const cleanMobile = buyerMobile.replace(/\D/g, '');
      const result = await sendPhoneOTP(cleanMobile, 'recaptcha-container');
      setConfirmationResult(result);
      setResendTimer(30);
      setErrorMsg('New OTP code sent to your mobile phone!');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to resend OTP.');
    } finally {
      setIsAuthLoading(false);
    }
  }

  // Seller Registration
  function handleSellerRegistration(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    const cleanMobile = sellerMobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
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
      mobile: cleanMobile,
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
      `Registration Submitted for "${reg.firmName}". Our website audit team will review your PAN (${reg.panNumber}) and firm credentials within 24–48 hours. A verification notification has been sent to ${reg.email}.`
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-36 font-sans bg-[#faeee7] text-[#33272a]">
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" className="sr-only" aria-hidden="true" />

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
          type="button"
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
          type="button"
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

      {/* PORTAL FORM 1: BUYER ACCOUNT (REAL FIREBASE AUTH) */}
      {portalType === 'buyer' && (
        <div className="mt-8 max-w-xl mx-auto rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
          <h2 className="display-h text-2xl text-[#33272a]">Buyer Account Registration &amp; Sign In</h2>
          <p className="mt-1 text-xs text-[#594a4e]">
            Sign in with your Google account or receive a real SMS OTP on your +91 mobile number.
          </p>

          {/* Google Sign-In Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isAuthLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#33272a]/20 bg-[#fffffe] py-3 text-xs font-bold text-[#33272a] shadow-xs transition hover:border-[#ff8ba7] hover:bg-[#faeee7] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sign in with Google"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span>{isAuthLoading ? 'Connecting to Google...' : 'Continue with Google Account'}</span>
            </button>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#33272a]/15" />
            </div>
            <span className="relative bg-[#fffffe] px-4 text-[10px] uppercase tracking-widest text-[#594a4e] font-bold">
              Or Sign In with Real SMS OTP
            </span>
          </div>

          {errorMsg && (
            <p className="mb-4 rounded-xl bg-rose-50 p-3 text-center text-xs font-semibold text-rose-700">
              {errorMsg}
            </p>
          )}

          {authStep === 'input' ? (
            <form onSubmit={handleBuyerSubmit} className="space-y-4">
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

              <button
                type="submit"
                disabled={isAuthLoading}
                className="wax-button w-full py-3 text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthLoading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#33272a] border-t-transparent" />
                    <span>Sending Real SMS OTP...</span>
                  </>
                ) : (
                  <span>Send Real SMS OTP →</span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyBuyerOTP} className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Enter 6-Digit SMS OTP</label>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || isAuthLoading}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#ff8ba7] hover:underline disabled:text-zinc-400 disabled:no-underline"
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>
                <p className="text-xs text-[#594a4e]">Sent to +91 {buyerMobile} &amp; {buyerEmail}</p>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter SMS OTP"
                  className="mt-2 w-full text-center text-2xl tracking-[0.5em] font-mono rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-[#33272a] outline-none focus:border-[#ff8ba7]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthStep('input')}
                  className="ghost-button px-4 py-2.5 text-xs"
                  disabled={isAuthLoading}
                >
                  Edit Details
                </button>
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="wax-button flex-1 py-2.5 text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuthLoading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#33272a] border-t-transparent" />
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <span>Verify OTP &amp; Sign In</span>
                  )}
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
