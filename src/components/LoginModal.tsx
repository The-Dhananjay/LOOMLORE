'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, DEMO_CUSTOMER_MOBILE, DEMO_SELLER_MOBILE, DEMO_OTP } from '@/lib/auth';

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, sendOTP, verifyOTP, loginAsDemoCustomer, loginAsDemoSeller } = useAuthStore();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (sendOTP(mobile)) {
      setStep('otp');
    } else {
      setError('Please enter a valid 10-digit mobile number.');
    }
  }

  function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (verifyOTP(mobile, otp)) {
      setStep('mobile');
      setMobile('');
      setOtp('');
    } else {
      setError(`Invalid OTP. Use Demo OTP: ${DEMO_OTP}`);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md font-sans"
        onClick={closeLoginModal}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeLoginModal}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-[#33272a]/15 bg-[#faeee7] text-[#33272a] text-xs font-bold"
          >
            ✕
          </button>

          <div className="text-center">
            <span className="label-eyebrow text-xs">Secure Heritage Portal</span>
            <h2 className="display-h mt-2 text-3xl text-[#33272a]">
              {step === 'mobile' ? 'Mobile Verification' : 'Enter 6-Digit OTP'}
            </h2>
            <p className="mt-1 text-xs text-[#594a4e]">
              {step === 'mobile'
                ? 'Sign in or create account using your 10-digit mobile number.'
                : `OTP sent to +91 ${mobile}. Enter OTP to continue.`}
            </p>
          </div>

          {/* Demo Alert Prompt */}
          <div className="mt-5 rounded-2xl border border-[#ff8ba7]/40 bg-[#faeee7] p-4 text-xs text-[#33272a]">
            <p className="font-bold text-[#ff8ba7] uppercase tracking-wider text-[10px]">Demo Login Credentials</p>
            <p className="mt-1">
              Customer Mobile: <strong className="font-mono">{DEMO_CUSTOMER_MOBILE}</strong><br />
              Artisan Seller Mobile: <strong className="font-mono">{DEMO_SELLER_MOBILE}</strong><br />
              Universal OTP: <strong className="font-mono">{DEMO_OTP}</strong>
            </p>
          </div>

          {error && (
            <p className="mt-3 text-center text-xs font-semibold text-rose-600">{error}</p>
          )}

          {step === 'mobile' ? (
            <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold" htmlFor="mobile">
                  Mobile Number (India +91)
                </label>
                <div className="mt-1 flex gap-2">
                  <span className="inline-flex items-center rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3 text-xs font-bold text-[#33272a]">
                    +91
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-[#33272a]/20 bg-[#fffffe] px-3.5 py-2.5 text-sm text-[#33272a] outline-none focus:border-[#ff8ba7]"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="wax-button w-full py-3 text-xs">
                Get OTP →
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold" htmlFor="otp">
                  Enter 6-Digit OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="mt-1 w-full text-center text-2xl tracking-[0.5em] font-mono rounded-xl border border-[#33272a]/20 bg-[#fffffe] px-3.5 py-2.5 text-[#33272a] outline-none focus:border-[#ff8ba7]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="ghost-button px-4 py-2.5 text-xs"
                >
                  Change Mobile
                </button>
                <button type="submit" className="wax-button flex-1 py-2.5 text-xs">
                  Verify &amp; Sign In
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Login Buttons */}
          <div className="mt-6 border-t border-[#33272a]/10 pt-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-[#594a4e] mb-2 font-semibold">1-Click Quick Demo Sign In</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={loginAsDemoCustomer}
                className="ghost-button flex-1 text-[10px] py-2"
              >
                As Customer
              </button>
              <button
                type="button"
                onClick={loginAsDemoSeller}
                className="wax-button flex-1 text-[10px] py-2"
              >
                As Artisan Seller
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
