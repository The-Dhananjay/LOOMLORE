'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/lib/auth';
import {
  sanitizeInput,
  isValidEmail,
  isValidIndianMobile,
  isValidPAN,
  isValidGSTIN,
  checkRateLimit,
  logSecurityEvent
} from '@/lib/security';

export default function LoginPage() {
  const router = useRouter();
  const {
    googleLogin,
    emailLogin,
    emailRegister,
    sendPasswordReset,
    loading: fbLoading,
    user: fbUser
  } = useAuth();
  
  const { isLoggedIn, registerSeller } = useAuthStore();

  const [portalType, setPortalType] = useState<'buyer' | 'seller'>('buyer');
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Buyer Form Inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Seller Form Inputs
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

  // Status & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [pendingNotice, setPendingNotice] = useState<string | null>(null);

  // Redirect to profile if already logged in
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

  function formatAuthError(err: any): string {
    const code = err?.code || '';
    const msg = err?.message || '';

    if (code.includes('unauthorized-domain') || msg.includes('unauthorized-domain')) {
      return 'Google Sign-In is restricted to authorized domains in Firebase Console. Please sign in with your Email & Password below, or add your current domain under Firebase Console → Auth → Settings → Authorized Domains.';
    }
    if (code.includes('popup-closed-by-user') || msg.includes('popup-closed')) {
      return 'Google Sign-In popup was closed before completing authentication.';
    }
    if (code.includes('wrong-password') || code.includes('user-not-found') || code.includes('invalid-credential')) {
      return 'Incorrect email address or password. Please check your credentials.';
    }
    if (code.includes('email-already-in-use')) {
      return 'An account with this email address already exists. Please sign in instead.';
    }
    if (code.includes('too-many-requests')) {
      return 'Too many login attempts. Please wait a moment and try again.';
    }
    return msg || 'Authentication failed. Please try again.';
  }

  // Google 1-Click Login
  async function handleGoogleSignIn() {
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);
    try {
      await googleLogin();
      logSecurityEvent('LOGIN_SUCCESS', 'google_user@loomlore.in');
      router.push('/profile');
    } catch (err: any) {
      logSecurityEvent('LOGIN_FAILED', 'google_user@loomlore.in', 'WARNING');
      setErrorMsg(formatAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle Form Submit
  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    if (!isValidEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Rate Limiting Check (Max 5 attempts per minute)
    const rateCheck = checkRateLimit(`login_${cleanEmail}`, 5, 60000);
    if (!rateCheck.allowed) {
      const waitSeconds = Math.ceil(rateCheck.remainingMs / 1000);
      logSecurityEvent('LOGIN_FAILED', cleanEmail, 'BLOCKED');
      setErrorMsg(`Too many failed attempts. Security lock active for ${waitSeconds} seconds.`);
      return;
    }

    // Forgot Password Mode
    if (authMode === 'forgot') {
      setIsSubmitting(true);
      try {
        await sendPasswordReset(cleanEmail);
        logSecurityEvent('PASSWORD_RESET', cleanEmail);
        setSuccessMsg(`Password reset link sent to ${cleanEmail}. Check your email inbox.`);
      } catch (err: any) {
        logSecurityEvent('LOGIN_FAILED', cleanEmail, 'WARNING');
        setErrorMsg(formatAuthError(err));
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (cleanPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    // Register Mode
    if (authMode === 'register') {
      try {
        await emailRegister(cleanEmail, cleanPassword, sanitizeInput(fullName) || 'Valued Customer');
        logSecurityEvent('LOGIN_SUCCESS', cleanEmail);
        router.push('/profile');
      } catch (err: any) {
        logSecurityEvent('LOGIN_FAILED', cleanEmail, 'WARNING');
        setErrorMsg(formatAuthError(err));
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Login Mode
    if (authMode === 'login') {
      try {
        await emailLogin(cleanEmail, cleanPassword);
        logSecurityEvent('LOGIN_SUCCESS', cleanEmail);
        router.push('/profile');
      } catch (err: any) {
        logSecurityEvent('LOGIN_FAILED', cleanEmail, 'WARNING');
        setErrorMsg(formatAuthError(err));
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  // Seller Registration
  function handleSellerRegistration(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    const cleanMobile = sellerMobile.replace(/\D/g, '');
    if (!isValidIndianMobile(cleanMobile)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number starting with 6-9.');
      return;
    }
    if (!isValidPAN(panNumber)) {
      setErrorMsg('Invalid PAN format. Please enter a valid 10-character PAN (e.g. ABCDE1234F).');
      return;
    }
    if (!isValidGSTIN(gstinNumber)) {
      setErrorMsg('Invalid GSTIN format. Please enter a valid 15-character GSTIN or "PENDING".');
      return;
    }

    const reg = registerSeller({
      firmName: sanitizeInput(firmName),
      ownerName: sanitizeInput(ownerName),
      mobile: cleanMobile,
      email: sanitizeInput(sellerEmail),
      state: sanitizeInput(sellerState),
      city: sanitizeInput(sellerCity),
      panNumber: panNumber.toUpperCase().trim(),
      gstinNumber: gstinNumber.toUpperCase().trim() || 'PENDING',
      bankAccount: sanitizeInput(bankAccount),
      ifscCode: ifscCode.toUpperCase().trim(),
      craftSpecialty: sanitizeInput(craftSpecialty)
    });

    logSecurityEvent('SELLER_REGISTRATION', sanitizeInput(sellerEmail));

    const approvalUrl = typeof window !== 'undefined' ? `${window.location.origin}/seller/approve?id=${reg.id}` : `/seller/approve?id=${reg.id}`;
    const mailtoLink = `mailto:yadav98dhananjay@gmail.com?subject=${encodeURIComponent(`Approval Needed: New Artisan Seller Firm (${reg.firmName})`)}&body=${encodeURIComponent(
      `Respected Admin,\n\nA new weaver artisan firm has submitted credentials for verification on Loomlore:\n\n• Firm Name: ${reg.firmName}\n• Owner Name: ${reg.ownerName}\n• Mobile: +91 ${reg.mobile}\n• Email: ${reg.email}\n• PAN: ${reg.panNumber}\n• GSTIN: ${reg.gstinNumber}\n• Specialty: ${reg.craftSpecialty}\n\nTo approve this seller firm, click the official approval link below:\n${approvalUrl}\n\nThank you,\nLoomlore Heritage Architecture`
    )}`;

    setPendingNotice(
      `Registration Submitted for "${reg.firmName}" (ID: ${reg.id}). An official approval email request has been sent to Team Admin (yadav98dhananjay@gmail.com).`
    );

    if (typeof window !== 'undefined') {
      window.location.href = mailtoLink;
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-36 font-sans bg-[#faeee7] text-[#33272a]">
      <header className="text-center max-w-2xl mx-auto">
        <span className="label-eyebrow text-xs">Heritage Subcontinent Authentication</span>
        <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">
          {authMode === 'login' ? 'Sign In' : authMode === 'register' ? 'Create Account' : 'Reset Password'}
        </h1>
        <p className="mt-3 text-sm text-[#594a4e]">
          Access your handloom orders, saved addresses, and profile details.
        </p>
      </header>

      {/* Segmented Control */}
      <div className="mt-10 flex max-w-md mx-auto rounded-full border border-[#33272a]/20 bg-[#fffffe] p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => {
            setPortalType('buyer');
            setPendingNotice(null);
            setErrorMsg('');
            setSuccessMsg('');
          }}
          className={`flex-1 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            portalType === 'buyer'
              ? 'bg-[#33272a] text-[#fffffe] shadow-xs'
              : 'text-[#594a4e] hover:text-[#33272a]'
          }`}
        >
          Customer Portal
        </button>
        <button
          type="button"
          onClick={() => {
            setPortalType('seller');
            setPendingNotice(null);
            setErrorMsg('');
            setSuccessMsg('');
          }}
          className={`flex-1 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            portalType === 'seller'
              ? 'bg-[#ff8ba7] text-[#33272a] shadow-xs'
              : 'text-[#594a4e] hover:text-[#33272a]'
          }`}
        >
          Artisan Seller
        </button>
      </div>

      {/* BUYER FORM */}
      {portalType === 'buyer' && (
        <div className="mt-8 max-w-md mx-auto rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
          {/* Mode Tabs */}
          <div className="flex border-b border-[#33272a]/15 mb-6 text-center">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                authMode === 'login'
                  ? 'border-[#ff8ba7] text-[#33272a]'
                  : 'border-transparent text-[#594a4e] hover:text-[#33272a]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
                authMode === 'register'
                  ? 'border-[#ff8ba7] text-[#33272a]'
                  : 'border-transparent text-[#594a4e] hover:text-[#33272a]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Google Sign-In */}
          {authMode !== 'forgot' && (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
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
                <span>{isSubmitting ? 'Connecting...' : 'Continue with Google'}</span>
              </button>

              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#33272a]/15" />
                </div>
                <span className="relative bg-[#fffffe] px-3 text-[10px] uppercase tracking-widest text-[#594a4e] font-bold">
                  OR
                </span>
              </div>
            </>
          )}

          {errorMsg && (
            <p className="mb-4 rounded-xl bg-rose-50 p-3 text-center text-xs font-semibold text-rose-700">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-800 border border-emerald-200">
              {successMsg}
            </p>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none focus:border-[#ff8ba7]"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.in"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none focus:border-[#ff8ba7]"
                required
              />
            </div>

            {authMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Password</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#ff8ba7] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2.5 text-sm text-[#33272a] outline-none focus:border-[#ff8ba7]"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="wax-button w-full py-3 text-xs flex items-center justify-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#33272a] border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>
                  {authMode === 'login' && 'SIGN IN'}
                  {authMode === 'register' && 'CREATE ACCOUNT'}
                  {authMode === 'forgot' && 'SEND RESET LINK'}
                </span>
              )}
            </button>
          </form>

          {authMode === 'forgot' && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-xs text-[#ff8ba7] font-bold uppercase tracking-wider hover:underline"
              >
                ← Back to Sign In
              </button>
            </div>
          )}
        </div>
      )}

      {/* SELLER FORM */}
      {portalType === 'seller' && (
        <div className="mt-8 max-w-2xl mx-auto rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-md">
          <h2 className="display-h text-3xl text-[#33272a]">Artisan &amp; Merchant Seller Registration</h2>
          <p className="mt-1 text-xs text-[#594a4e]">
            Complete all tax and firm details. Our website audit team reviews every firm before granting listing access.
          </p>

          {pendingNotice ? (
            <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-center text-xs text-amber-900 space-y-3">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-200 text-xl font-bold text-amber-900 mb-2">
                ✉️
              </div>
              <h3 className="display-h text-2xl text-amber-900">Seller Approval Request Dispatched to Team Email</h3>
              <p className="leading-relaxed">{pendingNotice}</p>

              <div className="rounded-xl border border-amber-200 bg-white p-4 text-left text-xs font-mono text-slate-800 space-y-1">
                <p className="font-bold text-amber-900 font-sans">Official Team Email Recipient:</p>
                <p>yadav98dhananjay@gmail.com</p>
                <p className="pt-2 font-bold text-amber-900 font-sans">Direct Team Approval URL:</p>
                <p className="break-all text-rose-700">{typeof window !== 'undefined' ? `${window.location.origin}/seller/approve?id=${pendingNotice.match(/sel-req-\d+/)?.[0] || ''}` : '/seller/approve'}</p>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-3 pt-2">
                {pendingNotice.match(/sel-req-\d+/)?.[0] && (
                  <Link
                    href={`/seller/approve?id=${pendingNotice.match(/sel-req-\d+/)?.[0]}`}
                    className="wax-button text-xs px-6 py-2.5"
                  >
                    Open Team Email Approval Link →
                  </Link>
                )}
                <Link href="/admin" className="ghost-button text-xs px-6 py-2.5">
                  Open Admin Panel →
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
                <button type="submit" className="wax-button w-full py-3.5 text-xs font-bold">
                  Submit Seller Credentials for Team Review →
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
