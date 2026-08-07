'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/lib/auth';

const PROTECTED_ROUTES = ['/profile', '/cart', '/checkout', '/payments', '/address', '/orders'];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user: fbUser, loading: fbLoading } = useAuth();
  const { isLoggedIn, user: storeUser } = useAuthStore();

  useEffect(() => {
    if (fbLoading) return;

    // A user is strictly authenticated only if fbUser exists OR storeUser exists with isLoggedIn
    const authenticated = fbUser !== null || (isLoggedIn && storeUser !== null);

    // 1. If accessing protected routes while unauthenticated, redirect to /login
    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && !authenticated) {
      router.replace('/login');
    }

    // 2. Only redirect away from /login if fbUser is actively signed in & email verified
    if (pathname === '/login' && fbUser !== null && fbUser.emailVerified) {
      if (storeUser?.role === 'seller') {
        router.replace('/seller');
      } else {
        router.replace('/profile');
      }
    }
  }, [fbUser, fbLoading, isLoggedIn, storeUser, pathname, router]);

  if (fbLoading && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return (
      <div className="mx-auto flex h-96 w-full max-w-md flex-col items-center justify-center p-8 text-center font-sans">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff8ba7] border-t-transparent mb-4" />
        <p className="text-xs uppercase tracking-widest text-[#594a4e] font-bold">Verifying Authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
