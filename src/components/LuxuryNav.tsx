'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiSearch } from './AiSearch';
import { Logo } from './Logo';
import { CartDrawer } from './CartDrawer';
import { LoginModal } from './LoginModal';
import { useCartStore } from '@/lib/cart';
import { useAuthStore } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_SECTIONS = [
  { href: '/catalog', label: 'Shop' },
  { href: '/states', label: 'Regions' },
  { href: '/collections', label: 'Collections' },
  { href: '/seller', label: 'Artisan Portal' }
];

export function LuxuryNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.getItemCount());
  const { user, isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Filter out Artisan Portal when logged in as Buyer (Customer)
  const navSections = ALL_SECTIONS.filter((s) => {
    if (mounted && isLoggedIn && user?.role === 'customer' && s.href === '/seller') {
      return false;
    }
    return true;
  });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#33272a]/15 bg-[#faeee7]/95 backdrop-blur-md shadow-xs'
            : 'border-b border-[#33272a]/10 bg-[#faeee7]'
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-[#ff8ba7] focus:px-4 focus:py-2 focus:text-[#33272a] font-bold"
        >
          Skip to content
        </a>
        
        {/* Full-width container with edge-to-edge balance */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-3.5 sm:px-10 font-sans">
          
          {/* Left Column: Brand Logo */}
          <div className="flex items-center">
            <Logo size="small" />
          </div>

          {/* Center Column: Primary Navigation Links */}
          <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Primary">
            {navSections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="nav-link"
              >
                {s.label}
              </Link>
            ))}
          </nav>

          {/* Right Column: Search, Bag (Left of Profile), Profile (Far Right) */}
          <div className="hidden items-center justify-end gap-3.5 md:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#33272a]/20 bg-[#fffffe] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[#33272a] font-semibold transition hover:border-[#ff8ba7] hover:bg-[#fffffe] shadow-sm"
              aria-label="Search"
            >
              <svg className="h-4 w-4 shrink-0 text-[#ff8ba7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span>Search</span>
            </button>

            {/* 1. BAG BUTTON: Visible ONLY when Logged In as Buyer (Customer) */}
            {mounted && isLoggedIn && user?.role === 'customer' && (
              <button
                onClick={openCart}
                className="wax-button flex items-center gap-2 px-5 py-1.5 text-xs"
              >
                <span>Bag</span>
                {itemCount > 0 && (
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[#33272a] text-[10px] font-bold text-[#fffffe]">
                    {itemCount}
                  </span>
                )}
              </button>
            )}

            {/* 2. PROFILE / SIGN IN BUTTON: Placed on the FAR RIGHT */}
            {mounted && isLoggedIn && user ? (
              <Link
                href={user.role === 'seller' ? '/seller' : '/profile'}
                className="flex items-center gap-2 rounded-full border border-[#33272a]/20 bg-[#fffffe] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[#33272a] font-semibold transition hover:border-[#ff8ba7] shadow-sm"
              >
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full border border-[#33272a]/20 bg-[#fffffe] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[#33272a] font-semibold transition hover:border-[#ff8ba7] shadow-sm"
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Premium Animated 3-Line Hamburger Button */}
          <button
            className="flex items-center gap-2.5 rounded-full border border-[#33272a]/20 bg-[#fffffe] px-3.5 py-2 lg:hidden text-[#33272a] shadow-xs hover:border-[#ff8ba7] transition active:scale-95"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#33272a]">
              {open ? 'CLOSE' : 'MENU'}
            </span>
            <div className="relative flex h-3.5 w-4 flex-col justify-between items-center">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-4 rounded-full bg-[#ff8ba7]"
              />
              <motion.span
                animate={open ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-[2px] w-4 rounded-full bg-[#33272a]"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-4 rounded-full bg-[#ff8ba7]"
              />
            </div>
          </button>
        </div>

        {/* Premium Mobile Navigation Slide Drawer */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-[#33272a]/15 bg-[#faeee7]/98 backdrop-blur-xl lg:hidden font-sans shadow-2xl"
              aria-label="Mobile"
            >
              <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-6 py-7">
                
                {/* Search Bar Button */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-2.5 w-full rounded-2xl border border-[#33272a]/15 bg-[#fffffe] px-4 py-3 text-xs text-[#594a4e] shadow-2xs hover:border-[#ff8ba7] transition"
                >
                  <svg className="h-4 w-4 shrink-0 text-[#ff8ba7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span>Search Banarasi, Sherwani, Kurta, Kanjeevaram...</span>
                </button>

                {/* Primary Section Links */}
                <div className="space-y-1.5 border-t border-[#33272a]/10 pt-4">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#ff8ba7] font-bold mb-2">Explore Collections</p>
                  {navSections.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#33272a] hover:bg-[#fffffe] hover:text-[#ff8ba7] transition"
                      onClick={() => setOpen(false)}
                    >
                      <span>{s.label}</span>
                      <span className="text-xs text-[#33272a]/40">→</span>
                    </Link>
                  ))}
                </div>

                {/* Logged in User Status & Actions */}
                <div className="border-t border-[#33272a]/10 pt-4 space-y-3">
                  {mounted && isLoggedIn && user ? (
                    <div className="rounded-2xl border border-[#33272a]/15 bg-[#fffffe] p-4 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#ff8ba7] font-bold">
                            {user.role === 'seller' ? 'Artisan Seller' : 'Verified Buyer'}
                          </span>
                          <p className="text-sm font-bold text-[#33272a]">{user.name}</p>
                          <p className="text-[10px] text-[#594a4e]">+91 {user.mobile}</p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setOpen(false);
                          }}
                          className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-[10px] uppercase font-bold text-rose-700 hover:bg-rose-100"
                        >
                          Sign Out
                        </button>
                      </div>

                      <div className="flex gap-2 pt-1">
                        {user.role === 'customer' && (
                          <button
                            onClick={() => {
                              setOpen(false);
                              openCart();
                            }}
                            className="wax-button flex-1 py-2 text-xs"
                          >
                            Bag ({itemCount})
                          </button>
                        )}
                        <Link
                          href={user.role === 'seller' ? '/seller' : '/profile'}
                          onClick={() => setOpen(false)}
                          className="ghost-button flex-1 py-2 text-xs text-center"
                        >
                          Go to Dashboard
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="wax-button flex-1 py-3 text-xs text-center"
                      >
                        Sign In / Register →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Modal & Cart Drawer Overlay */}
      {mounted && (
        <>
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-16 md:pt-24 backdrop-blur-md"
                onClick={() => setSearchOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: -20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AiSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <LoginModal />
          {isLoggedIn && user?.role === 'customer' && <CartDrawer />}
        </>
      )}
    </>
  );
}
