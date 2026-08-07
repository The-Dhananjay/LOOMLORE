'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';

function SellerApproveContent() {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get('id');
  const { pendingSellers, approveSeller } = useAuthStore();
  const [approvedSeller, setApprovedSeller] = useState<any>(null);

  useEffect(() => {
    if (sellerId) {
      const found = pendingSellers.find((s) => s.id === sellerId);
      if (found) {
        approveSeller(sellerId);
        setApprovedSeller(found);
      }
    }
  }, [sellerId, pendingSellers, approveSeller]);

  return (
    <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-10 shadow-xl text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-800 mb-4">
        ✓
      </div>
      <span className="label-eyebrow text-xs">Official Email Approval Processed</span>
      <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">
        Artisan Seller Account Approved!
      </h1>

      {approvedSeller ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-left text-xs text-emerald-950 space-y-2">
          <p className="font-bold text-sm text-emerald-900">Firm Credentials Verified:</p>
          <p>• <strong>Firm Name:</strong> {approvedSeller.firmName}</p>
          <p>• <strong>Weaver / Owner:</strong> {approvedSeller.ownerName}</p>
          <p>• <strong>PAN Number:</strong> <span className="font-mono">{approvedSeller.panNumber}</span></p>
          <p>• <strong>GSTIN Number:</strong> <span className="font-mono">{approvedSeller.gstinNumber}</span></p>
          <p>• <strong>State &amp; City:</strong> {approvedSeller.city}, {approvedSeller.state}</p>
          <p>• <strong>Craft Specialty:</strong> {approvedSeller.craftSpecialty}</p>
        </div>
      ) : (
        <p className="mt-4 text-xs text-[#594a4e]">
          Seller registration ID ({sellerId || 'SELLER_REQ'}) has been approved for listing handloom products.
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/seller" className="wax-button text-xs px-8 py-3">
          Go to Artisan Seller Portal →
        </Link>
        <Link href="/admin" className="ghost-button text-xs px-6 py-3">
          Open Website Team Admin Panel →
        </Link>
      </div>
    </div>
  );
}

export default function SellerApprovePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-36 font-sans bg-[#faeee7] text-[#33272a]">
      <Suspense
        fallback={
          <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-10 shadow-xl text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff8ba7] border-t-transparent mx-auto mb-4" />
            <p className="text-xs uppercase tracking-widest text-[#594a4e] font-bold">Processing Approval Link...</p>
          </div>
        }
      >
        <SellerApproveContent />
      </Suspense>
    </div>
  );
}
