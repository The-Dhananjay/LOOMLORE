import Link from 'next/link';

export function Logo({ size = 'medium', href = '/' }: { size?: 'small' | 'medium' | 'large'; href?: string }) {
  const iconSizes = {
    small: 'h-7 w-7',
    medium: 'h-9 w-9',
    large: 'h-12 w-12'
  };

  const titleSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  const subtextSizes = {
    small: 'text-[8px]',
    medium: 'text-[9px]',
    large: 'text-[11px]'
  };

  return (
    <Link href={href} className="group inline-flex items-center gap-3" aria-label="Loomlore Home">
      {/* Lotus & Loom Interlocking Emblem */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffc6c7] via-[#fffffe] to-[#faeee7] p-1.5 shadow-md border border-[#33272a]/20 transition duration-300 group-hover:scale-105 group-hover:border-[#ff8ba7] ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="44" stroke="#33272a" strokeWidth="4" opacity="0.2" />
          <circle cx="50" cy="50" r="44" stroke="#ff8ba7" strokeWidth="3" strokeDasharray="12 8" />
          
          {/* Stylized Lotus & L Motif */}
          <path d="M50 15 C55 32 75 35 78 52 C81 69 64 80 50 82 C36 80 19 69 22 52 C25 35 45 32 50 15 Z" fill="#33272a" opacity="0.1" />
          <path d="M50 22 Q60 45 74 54 Q50 68 50 80 Q50 68 26 54 Q40 45 50 22 Z" fill="url(#logoGrad)" />
          
          {/* L Letter Interlocking Accent */}
          <path d="M38 34 V68 H62" stroke="#fffffe" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 34 V68 H62" stroke="#33272a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          <defs>
            <linearGradient id="logoGrad" x1="26" y1="22" x2="74" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff8ba7" />
              <stop offset="0.7" stopColor="#ffc6c7" />
              <stop offset="1" stopColor="#33272a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Soria Serif Wordmark */}
      <div className="flex flex-col">
        <span className={`display-h tracking-[0.18em] text-[#33272a] font-bold leading-none ${titleSizes[size]}`}>
          LOOMLORE
        </span>
        <span className={`font-sans tracking-[0.32em] text-[#ff8ba7] font-bold uppercase leading-tight mt-0.5 ${subtextSizes[size]}`}>
          Heirlooms of India
        </span>
      </div>
    </Link>
  );
}
