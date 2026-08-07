import Link from 'next/link';
import { Logo } from './Logo';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#33272a]/15 bg-[#faeee7] text-[#33272a] font-sans">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 text-sm md:grid-cols-4 lg:px-10">
        <div>
          <Logo size="small" />
          <p className="mt-4 max-w-xs leading-relaxed text-[#594a4e] text-xs">
            Handpicked traditional wear from weaver clusters across India — Banarasi, Kanjeevaram, Phulkari, Bandhani, Mekhela Chador and more.
          </p>
          <p className="mt-4 text-[11px] text-[#594a4e]/80 leading-normal">
            GSTIN 09ABCDE1234F1Z5 · CIN U52399UP2026PTC000000<br />
            Registered office: Plot 14, Sarai Nandan, Varanasi 221005
          </p>
        </div>

        <div>
          <p className="font-semibold text-[#33272a] uppercase tracking-wider text-xs">Collections</p>
          <ul className="mt-3 space-y-2 text-xs text-[#594a4e]">
            <li><Link href="/catalog?occasion=Wedding" className="hover:text-[#ff8ba7]">Wedding Edit</Link></li>
            <li><Link href="/catalog?occasion=Diwali" className="hover:text-[#ff8ba7]">Diwali Edit</Link></li>
            <li><Link href="/catalog?occasion=Navratri" className="hover:text-[#ff8ba7]">Navratri Edit</Link></li>
            <li><Link href="/catalog?occasion=Eid" className="hover:text-[#ff8ba7]">Eid Edit</Link></li>
            <li><Link href="/catalog?culture=Pan-India" className="hover:text-[#ff8ba7]">Khadi &amp; Pan-India</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-[#33272a] uppercase tracking-wider text-xs">Customer Care (India)</p>
          <ul className="mt-3 space-y-2 text-xs text-[#594a4e]">
            <li>Shipping across India in 2–7 business days</li>
            <li>Free shipping above ₹1,500</li>
            <li>Easy 7-day returns &amp; exchanges</li>
            <li>Email: care@loomlore.in</li>
            <li>Mon–Sat, 10:00 AM – 8:00 PM IST</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-[#33272a] uppercase tracking-wider text-xs">Newsletter</p>
          <p className="mt-3 text-xs text-[#594a4e] leading-relaxed">
            One monthly edition on rare weaves, festival edits, and weaver stories.
          </p>
          <form className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="you@email.in"
              className="w-full rounded-full border border-[#33272a]/20 bg-[#fffffe] px-4 py-2 text-xs text-[#33272a] placeholder:text-[#594a4e]/50 outline-none focus:border-[#ff8ba7] shadow-xs"
            />
            <button type="button" className="wax-button px-5 py-2 text-xs">Join</button>
          </form>
          <p className="mt-3 text-[10px] leading-relaxed text-[#594a4e]/70">
            All prices are inclusive of GST. A GST tax invoice is emailed with every order.
          </p>
        </div>
      </div>

      <div className="border-t border-[#33272a]/10 bg-[#fffffe] py-4">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-[#594a4e] lg:px-10">
          <p>© {new Date().getFullYear()} Loomlore Pvt. Ltd. · Made in India, for India.</p>
          <p>Warm Luxury Palette Edition (#faeee7 / #33272a / #ff8ba7)</p>
        </div>
      </div>
    </footer>
  );
}
