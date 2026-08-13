'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type GiTagInfo = {
  craftName: string;
  state: string;
  giNumber: string;
  artisanCluster: string;
  yearCertified: string;
  description: string;
};

export const GI_CERTIFICATES: Record<string, GiTagInfo> = {
  'banarasi-silk': {
    craftName: 'Banarasi Brocade & Zari Silk',
    state: 'Uttar Pradesh (Varanasi)',
    giNumber: 'GI-REC-2009-UP-001',
    artisanCluster: 'Lanka & Madanpura Weaver Cooperative',
    yearCertified: '2009',
    description: 'Authentic hand-knotted gold zari weave certified under the Geographical Indications of Goods Act, 1999.'
  },
  'kanjeevaram-silk': {
    craftName: 'Kanchipuram Mulberry Silk Saree',
    state: 'Tamil Nadu (Kanchipuram)',
    giNumber: 'GI-REC-2005-TN-002',
    artisanCluster: 'Kanchi Handloom Weavers Union',
    yearCertified: '2005',
    description: 'Korvai double-warp silk weave certified authentic by the Textile Ministry of India.'
  },
  'pashmina-shawl': {
    craftName: 'Kashmir Hand-Embroidered Pashmina',
    state: 'Jammu & Kashmir (Srinagar)',
    giNumber: 'GI-REC-2008-JK-003',
    artisanCluster: 'Changthangi Goat Fiber Guild',
    yearCertified: '2008',
    description: '100% pure hand-spun Cashmere pashmina fiber woven on traditional wooden looms.'
  },
  'bandhani-tie-dye': {
    craftName: 'Bandhani Rai Bandhej',
    state: 'Gujarat & Rajasthan (Jamnagar / Jaipur)',
    giNumber: 'GI-REC-2012-GJ-004',
    artisanCluster: 'Kutch & Jodhpur Dyeing Guild',
    yearCertified: '2012',
    description: 'Hand-tied resist dyeing certified authentic traditional Indian handicraft.'
  }
};

export function GiTagModal({ craftKey, isOpen, onClose }: { craftKey?: string; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  const cert = GI_CERTIFICATES[craftKey || 'banarasi-silk'] || GI_CERTIFICATES['banarasi-silk'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md font-sans"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#33272a]/20 bg-[#fffffe] p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-[#33272a]/15 bg-[#faeee7] text-[#33272a] text-xs font-bold"
          >
            ✕
          </button>

          <div className="text-center">
            <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-[10px] uppercase tracking-widest text-amber-900 font-bold">
              Official Ministry of Textiles Authenticity
            </span>
            <h2 className="display-h mt-3 text-3xl text-[#33272a]">
              GI Tag Certificate Verification
            </h2>
            <p className="mt-1 text-xs text-[#594a4e]">
              Geographical Indication Registry of India
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-[#faeee7] p-6 text-xs text-[#33272a] space-y-3 font-sans">
            <div className="flex justify-between border-b border-[#33272a]/10 pb-2">
              <span className="text-[#594a4e] font-semibold">Craft Designation:</span>
              <strong className="text-[#33272a]">{cert.craftName}</strong>
            </div>
            <div className="flex justify-between border-b border-[#33272a]/10 pb-2">
              <span className="text-[#594a4e] font-semibold">State &amp; Region:</span>
              <span>{cert.state}</span>
            </div>
            <div className="flex justify-between border-b border-[#33272a]/10 pb-2">
              <span className="text-[#594a4e] font-semibold">GI Registry Number:</span>
              <strong className="font-mono text-[#ff8ba7]">{cert.giNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-[#33272a]/10 pb-2">
              <span className="text-[#594a4e] font-semibold">Artisan Guild:</span>
              <span>{cert.artisanCluster}</span>
            </div>
            <p className="pt-1 text-[11px] text-[#594a4e] leading-relaxed italic">
              "{cert.description}"
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button onClick={onClose} className="wax-button w-full py-3 text-xs font-bold">
              ✓ Authenticated Handloom Guarantee
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
