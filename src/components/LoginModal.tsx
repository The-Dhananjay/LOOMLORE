'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/auth';

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthStore();

  if (!isLoginModalOpen) return null;

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
              Firebase Account Authentication
            </h2>
            <p className="mt-2 text-xs text-[#594a4e] leading-relaxed">
              Sign in with your Email &amp; Password or Google Account to manage orders and delivery addresses.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={closeLoginModal}
              className="wax-button w-full text-center py-3 text-xs font-bold"
            >
              Open Dedicated Sign In Page →
            </Link>
            <button
              onClick={closeLoginModal}
              className="ghost-button w-full py-2.5 text-xs font-semibold"
            >
              Continue Browsing Handlooms
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
