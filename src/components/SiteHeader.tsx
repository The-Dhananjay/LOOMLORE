import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-maroon/10 bg-parchment-50/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-full font-display text-lg font-bold text-parchment-50"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 30%, #f1d68a 0%, #caa14a 40%, #7a1f2b 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 4px rgba(0,0,0,0.35), 0 6px 10px -4px rgba(58,30,10,0.45)'
            }}
            aria-hidden
          >
            L
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-maroon-deep">
            Loomlore
          </span>
          <span className="hidden rounded-full border border-maroon/30 bg-parchment-100 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-maroon-deep md:inline">
            India
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-earth-700 md:flex">
          <Link href="/" className="hover:text-maroon-deep">Home</Link>
          <Link href="/catalog" className="hover:text-maroon-deep">Catalog</Link>
          <Link href="/festivals" className="hover:text-maroon-deep">Festivals</Link>
          <Link href="/payments" className="hover:text-maroon-deep">Payments</Link>
          <Link href="/journal" className="hover:text-maroon-deep">Journal</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-maroon/40 px-3 py-1.5 text-xs font-medium text-maroon-deep md:inline-flex">
            IN - Rs
          </button>
          <Link href="/catalog" className="badge-button">Shop the loom</Link>
        </div>
      </div>
    </header>
  );
}
