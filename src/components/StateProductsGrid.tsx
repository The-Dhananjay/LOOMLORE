'use client';

import { useState } from 'react';
import type { Product } from '@/data/catalog';
import { ProductCard } from './ProductCard';

type StateCategory = 'all' | 'garments' | 'jewelry';

export function StateProductsGrid({ stateName, products }: { stateName: string; products: Product[] }) {
  // Filter out any combo set products
  const stateProducts = products.filter((p) => p.garment !== 'Combo Set' && !p.name.includes('Combo') && !p.badge?.includes('Combo'));
  const [activeTab, setActiveTab] = useState<StateCategory>('all');

  const garmentsList = stateProducts.filter((p) => p.garment !== 'Jewelry' && p.garment !== 'Kamarbandh');
  const jewelryList = stateProducts.filter((p) => p.garment === 'Jewelry' || p.garment === 'Kamarbandh');

  const filteredProducts = stateProducts.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'garments') return p.garment !== 'Jewelry' && p.garment !== 'Kamarbandh';
    if (activeTab === 'jewelry') return p.garment === 'Jewelry' || p.garment === 'Kamarbandh';
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* 2 State Option Tabs */}
      <div className="flex flex-wrap gap-3">
        {[
          { id: 'all', label: `All ${stateName} Items (${stateProducts.length})` },
          { id: 'garments', label: `1. Textiles & Clothes (${garmentsList.length})` },
          { id: 'jewelry', label: `2. Traditional Jewelry (${jewelryList.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as StateCategory)}
            className={`rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === tab.id
                ? 'bg-[#33272a] text-white shadow-md'
                : 'border border-[#33272a]/20 bg-[#fffffe] text-[#33272a] hover:border-[#ff8ba7]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filtered Grid Display */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-12 text-center">
          <h3 className="display-h text-3xl text-[#33272a]">No Items Found in this Category</h3>
          <p className="mt-2 text-xs text-[#594a4e]">Browse all products or switch to another option tab above.</p>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className="wax-button mt-6 text-xs px-6 py-2.5"
          >
            Show All {stateName} Products →
          </button>
        </div>
      )}
    </div>
  );
}
