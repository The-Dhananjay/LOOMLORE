'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSellerStore } from '@/lib/seller';
import { useAuthStore } from '@/lib/auth';
import { formatINR } from '@/lib/india';
import type { Culture, Fabric, GarmentType, Gender, Occasion } from '@/data/catalog';

export default function SellerPortalPage() {
  const { sellerProducts, sellerOrders, addProduct, removeProduct, updateOrderStatus } = useSellerStore();
  const { user, isLoggedIn } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add'>('products');

  // New Garment Form state with Offers & Image Upload Preview
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('Women');
  const [garment, setGarment] = useState<GarmentType>('Saree');
  const [culture, setCulture] = useState<Culture>('North India');
  const [stateName, setStateName] = useState('Rajasthan');
  const [region, setRegion] = useState('Jaipur');
  const [fabric, setFabric] = useState<Fabric>('Banarasi Silk');
  const [occasion, setOccasion] = useState<Occasion>('Wedding');
  const [originalPriceINR, setOriginalPriceINR] = useState(12999);
  const [offerPriceINR, setOfferPriceINR] = useState(8999);
  const [badgeTag, setBadgeTag] = useState('Festive 30% Off');
  const [artisan, setArtisan] = useState('Jaipur Royal Weavers Guild');
  const [story, setStory] = useState('Hand-loomed traditional clothing with authentic zari borders and vegetable dyes.');
  const [imageUrl, setImageUrl] = useState('/products/bandhani-saree.jpg');
  const [message, setMessage] = useState('');

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Access Control Checks
  if (!isLoggedIn || !user) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-40 text-center font-sans bg-[#faeee7] text-[#33272a]">
        <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-10 shadow-xl">
          <span className="label-eyebrow text-xs">Artisan Merchant Portal</span>
          <h1 className="display-h mt-2 text-4xl text-[#33272a]">Seller Login Required</h1>
          <p className="mt-3 text-sm text-[#594a4e]">
            Please sign in with your seller account or register your firm to manage products and incoming orders.
          </p>
          <Link href="/login" className="wax-button mt-6 text-xs px-8 py-3 inline-flex">
            Go to Seller Registration &amp; Login Page →
          </Link>
        </div>
      </div>
    );
  }

  if (user.role === 'customer') {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-40 text-center font-sans bg-[#faeee7] text-[#33272a]">
        <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-10 shadow-xl">
          <span className="label-eyebrow text-xs">Buyer Account Detected</span>
          <h1 className="display-h mt-2 text-3xl text-[#33272a]">Separate Seller Portal</h1>
          <p className="mt-3 text-sm text-[#594a4e]">
            You are logged in as a Buyer ({user.name}). To list clothes and set prices, register your firm on the Seller Login page.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="wax-button text-xs px-6 py-3">
              Register as Artisan Seller →
            </Link>
            <Link href="/profile" className="ghost-button text-xs px-6 py-3">
              View Buyer Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (user.sellerStatus === 'pending') {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-40 text-center font-sans bg-[#faeee7] text-[#33272a]">
        <div className="rounded-3xl border border-amber-300 bg-[#fffffe] p-12 shadow-xl">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-100 text-2xl font-bold text-amber-900 mb-4">
            ⏳
          </div>
          <span className="label-eyebrow text-xs text-amber-700">Verification In Progress</span>
          <h1 className="display-h mt-2 text-4xl text-[#33272a]">Firm Review Pending (24–48 Hours)</h1>
          <p className="mt-4 text-sm text-[#594a4e] leading-relaxed">
            Thank you for registering <strong className="text-[#33272a]">{user.sellerDetails?.firmName || 'your firm'}</strong> (PAN: <span className="font-mono text-[#33272a]">{user.sellerDetails?.panNumber}</span>). Our website audit team is reviewing your tax and handloom credentials.
          </p>

          <div className="mt-8 rounded-2xl bg-[#faeee7] p-5 text-xs text-[#33272a] text-left max-w-md mx-auto space-y-1">
            <p><strong>Owner:</strong> {user.sellerDetails?.ownerName}</p>
            <p><strong>Mobile:</strong> +91 {user.sellerDetails?.mobile}</p>
            <p><strong>GSTIN:</strong> {user.sellerDetails?.gstinNumber}</p>
            <p><strong>Bank A/C:</strong> {user.sellerDetails?.bankAccount}</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/admin" className="wax-button text-xs px-7 py-3">
              Open Admin Review Panel (Click to Approve) →
            </Link>
            <Link href="/login" className="ghost-button text-xs px-7 py-3">
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    const created = addProduct({
      name,
      gender,
      garment,
      culture,
      region: `${region}, ${stateName}`,
      state: stateName,
      occasion,
      fabric,
      colors: ['Heritage Custom'],
      sizes: ['Free Size', 'S', 'M', 'L', 'XL'],
      priceINR: Number(offerPriceINR),
      gstPct: 5,
      hsnCode: '5007',
      story,
      highlights: [
        '100% Authentic Handwoven',
        `Original Price: ${formatINR(originalPriceINR)}`,
        `Special Offer: ${formatINR(offerPriceINR)}`,
        'Includes blouse/pajama fabric'
      ],
      artisan: artisan || user?.name || 'Master Artisan Guild',
      swatch: '#ff8ba7',
      shipsFromCity: region,
      image: imageUrl || '/products/bandhani-saree.jpg',
      badge: badgeTag || 'Special Offer'
    });

    setMessage(`Success! Garment "${created.name}" is now live at ${formatINR(offerPriceINR)}!`);
    setName('');
    setActiveTab('products');
    setTimeout(() => setMessage(''), 4000);
  }

  const totalRevenue = sellerOrders.reduce((sum, o) => sum + o.totalAmountINR, 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 font-sans bg-[#faeee7] text-[#33272a]">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-[#33272a]/15 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="label-eyebrow text-xs">Approved Artisan Merchant</span>
            <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-emerald-800 font-bold">
              Verified Seller ✓
            </span>
          </div>
          <h1 className="display-h mt-2 text-4xl text-[#33272a] sm:text-5xl">
            {user.sellerDetails?.firmName || user.name} Dashboard
          </h1>
          <p className="mt-1 text-xs text-[#594a4e]">
            PAN: <strong className="font-mono text-[#33272a]">{user.sellerDetails?.panNumber || 'APPROVED'}</strong> · GSTIN: <strong className="font-mono text-[#33272a]">{user.sellerDetails?.gstinNumber || 'VERIFIED'}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/profile" className="ghost-button text-xs px-5 py-2.5">
            Customer View
          </Link>
          <button
            onClick={() => setActiveTab('add')}
            className="wax-button text-xs px-6 py-2.5"
          >
            + Upload New Garment
          </button>
        </div>
      </header>

      {/* Analytics Summary */}
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="royal-card p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Listed Products</p>
          <p className="display-h mt-1 text-3xl text-[#33272a]">{sellerProducts.length} Garments</p>
          <p className="mt-1 text-xs text-[#594a4e]">Live across 28 states catalog</p>
        </div>
        <div className="royal-card p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Incoming Buyer Orders</p>
          <p className="display-h mt-1 text-3xl text-[#33272a]">{sellerOrders.length} Orders</p>
          <p className="mt-1 text-xs text-[#594a4e]">Real-time buyer notifications</p>
        </div>
        <div className="royal-card p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Gross Sales Revenue</p>
          <p className="display-h mt-1 text-3xl text-[#33272a]">{formatINR(totalRevenue)}</p>
          <p className="mt-1 text-xs text-[#594a4e]">Direct artisan bank payouts</p>
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 text-center">
          {message}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="mt-10 flex gap-4 border-b border-[#33272a]/15 pb-4">
        <button
          onClick={() => setActiveTab('products')}
          className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'products' ? 'bg-[#33272a] text-[#fffffe]' : 'border border-[#33272a]/20 bg-[#fffffe] text-[#33272a]'
          }`}
        >
          My Listed Garments ({sellerProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'orders' ? 'bg-[#33272a] text-[#fffffe]' : 'border border-[#33272a]/20 bg-[#fffffe] text-[#33272a]'
          }`}
        >
          Incoming Buyer Orders ({sellerOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'add' ? 'bg-[#ff8ba7] text-[#33272a]' : 'border border-[#33272a]/20 bg-[#fffffe] text-[#33272a]'
          }`}
        >
          + Upload Garment &amp; Make Offers
        </button>
      </div>

      {/* TAB 1: LISTED PRODUCTS & OFFERS */}
      {activeTab === 'products' && (
        <div className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sellerProducts.map((p) => (
              <div key={p.id} className="royal-card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <img src={p.image} alt={p.name} className="h-20 w-16 rounded-xl object-cover border border-[#33272a]/15 bg-[#faeee7]" />
                    <span className="rounded-full bg-[#ff8ba7] px-3 py-1 text-[9px] uppercase tracking-wider text-[#33272a] font-bold">
                      {p.gender} · {p.garment}
                    </span>
                  </div>

                  <h3 className="display-h mt-3 text-xl text-[#33272a] line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-[#594a4e]">{p.state} · {p.fabric}</p>
                  <p className="mt-2 text-xs text-[#594a4e]/80 line-clamp-2">{p.story}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#33272a]/10 pt-3">
                  <div>
                    <span className="display-h text-xl text-[#33272a] font-bold">{formatINR(p.priceINR)}</span>
                    {p.badge && (
                      <span className="ml-2 rounded-full bg-[#faeee7] px-2 py-0.5 text-[9px] font-bold text-[#ff8ba7]">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeProduct(p.id)}
                    className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-[10px] uppercase tracking-wider text-rose-700 font-bold hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INCOMING BUYER ORDERS */}
      {activeTab === 'orders' && (
        <div className="mt-8 space-y-6">
          {sellerOrders.length > 0 ? (
            sellerOrders.map((ord) => (
              <div key={ord.orderId} className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#33272a]/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#ff8ba7] font-bold">Incoming Buyer Order</span>
                    <p className="display-h text-2xl text-[#33272a]">{ord.orderId}</p>
                    <p className="text-xs text-[#594a4e]">Ordered on {ord.orderedAt}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-[#594a4e] font-semibold">Dispatch Status</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.orderId, e.target.value as any)}
                      className="mt-1 block rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3 py-1.5 text-xs text-[#33272a] font-bold outline-none"
                    >
                      <option value="Received">Received</option>
                      <option value="In Production">In Production (Weaving)</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 rounded-2xl bg-[#faeee7] p-4 text-xs">
                  <div>
                    <strong className="text-[#33272a] uppercase tracking-wider text-[10px]">Buyer Name &amp; Contact:</strong>
                    <p className="mt-1 text-[#33272a] font-bold">{ord.customerName} (+91 {ord.customerMobile})</p>
                    <p className="text-[#594a4e]">Payment Method: {ord.paymentMethod}</p>
                  </div>
                  <div>
                    <strong className="text-[#33272a] uppercase tracking-wider text-[10px]">Delivery Shipping Address:</strong>
                    <p className="mt-1 text-[#594a4e]">{ord.shippingAddress}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="text-[10px] uppercase tracking-wider text-[#ff8ba7] font-bold">Ordered Garments</p>
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-[#33272a]/10 pb-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.productName} className="h-12 w-10 rounded-lg object-cover border border-[#33272a]/15 bg-[#faeee7]" />
                        <div>
                          <p className="font-bold text-[#33272a]">{item.productName}</p>
                          <p className="text-[#594a4e]">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#33272a]">{formatINR(item.priceINR * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-right">
                  <span className="display-h text-2xl text-[#33272a] font-bold">Total Order Value: {formatINR(ord.totalAmountINR)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-12 text-center">
              <p className="display-h text-2xl text-[#33272a]">No incoming buyer orders yet.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: UPLOAD GARMENT, IMAGE PREVIEW & MAKE OFFERS */}
      {activeTab === 'add' && (
        <div className="mt-8 rounded-3xl border border-[#33272a]/15 bg-[#fffffe] p-8 shadow-xs max-w-3xl mx-auto">
          <h2 className="display-h text-3xl text-[#33272a]">Upload Garment &amp; Create Offer</h2>
          <p className="mt-1 text-xs text-[#594a4e]">Add product images, set original prices, and create special festive offers.</p>

          <form onSubmit={handleCreateProduct} className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Device Image Upload & Live Preview */}
            <div className="sm:col-span-2 rounded-2xl border border-[#33272a]/15 bg-[#faeee7] p-5 flex flex-wrap items-center gap-6">
              <div className="relative h-32 w-28 overflow-hidden rounded-xl border border-[#33272a]/20 bg-[#fffffe] shadow-xs flex-shrink-0">
                <img src={imageUrl} alt="Garment live preview" className="h-full w-full object-cover" />
                <span className="absolute bottom-1 right-1 rounded-md bg-[#33272a]/80 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-[#fffffe] font-bold">
                  Preview
                </span>
              </div>
              <div className="flex-1 min-w-[240px] space-y-3">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">
                    1. Upload Photo From Your Device (Phone / Laptop)
                  </label>
                  <label className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#ff8ba7] bg-[#fffffe] px-4 py-3 text-xs font-bold text-[#33272a] transition hover:bg-[#faeee7]">
                    <svg className="h-4 w-4 text-[#ff8ba7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Click to Choose Photo File from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#594a4e] font-semibold">
                    2. Or Paste Image URL / Select Preset
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://... or /products/..."
                    className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#fffffe] px-3.5 py-2 text-xs text-[#33272a] outline-none font-mono"
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-[10px]">
                  <span className="text-[#594a4e] font-semibold">Quick Presets:</span>
                  {['/products/bandhani-saree.jpg', '/products/kanjeevaram-bridal.jpg', '/products/chikankari-kurta-men.jpg', '/products/mughal-sherwani.jpg'].map((path) => (
                    <button
                      key={path}
                      type="button"
                      onClick={() => setImageUrl(path)}
                      className="rounded-full border border-[#33272a]/20 bg-[#fffffe] px-2.5 py-0.5 text-[#33272a] font-mono hover:border-[#ff8ba7]"
                    >
                      {path.split('/').pop()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Garment Title / Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Bandhani Rai Bandhej Silk Saree"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Category / Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
              >
                <option value="Women">Women Traditional</option>
                <option value="Men">Men Traditional</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Garment Type</label>
              <select
                value={garment}
                onChange={(e) => setGarment(e.target.value as GarmentType)}
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
              >
                <option value="Saree">Saree</option>
                <option value="Lehenga">Lehenga</option>
                <option value="Salwar Kameez">Salwar Kameez</option>
                <option value="Anarkali">Anarkali</option>
                <option value="Kurta">Kurta</option>
                <option value="Sherwani">Sherwani</option>
                <option value="Bandhgala">Bandhgala</option>
                <option value="Mundu">Mundu</option>
                <option value="Veshti">Veshti</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Original MRP Price (INR)</label>
              <input
                type="number"
                value={originalPriceINR}
                onChange={(e) => setOriginalPriceINR(Number(e.target.value))}
                placeholder="12999"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Offer Selling Price (INR)</label>
              <input
                type="number"
                value={offerPriceINR}
                onChange={(e) => setOfferPriceINR(Number(e.target.value))}
                placeholder="8999"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] font-bold outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Special Offer Badge Tag</label>
              <input
                type="text"
                value={badgeTag}
                onChange={(e) => setBadgeTag(e.target.value)}
                placeholder="e.g. Festival 30% Off, Handloom Certified"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">State</label>
              <input
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder="Rajasthan"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">City / Weaving Hub</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Jaipur"
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#ff8ba7] font-bold">Craft &amp; Weaving Details</label>
              <textarea
                rows={3}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#33272a]/20 bg-[#faeee7] px-3.5 py-2 text-xs text-[#33272a] outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="wax-button flex-1 py-3.5 text-xs">
                Upload Garment &amp; Publish Offer →
              </button>
              <button type="button" onClick={() => setActiveTab('products')} className="ghost-button px-6 py-3.5 text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
