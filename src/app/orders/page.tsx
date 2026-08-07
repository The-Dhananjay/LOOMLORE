'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/profile');
  }, [router]);

  return (
    <div className="mx-auto flex h-96 w-full max-w-md flex-col items-center justify-center p-8 text-center font-sans">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff8ba7] border-t-transparent mb-4" />
      <p className="text-xs uppercase tracking-widest text-[#594a4e] font-bold">Redirecting to My Orders...</p>
    </div>
  );
}
