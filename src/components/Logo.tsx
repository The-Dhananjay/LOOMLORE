import Link from 'next/link';

export function Logo({ size = 'medium', href = '/' }: { size?: 'small' | 'medium' | 'large'; href?: string }) {
  const iconSizes = {
    small: 'h-9 w-9 p-1',
    medium: 'h-12 w-12 p-1.5',
    large: 'h-16 w-16 p-2'
  };

  const titleSizes = {
    small: 'text-xl tracking-[0.16em]',
    medium: 'text-2xl sm:text-3xl tracking-[0.18em]',
    large: 'text-4xl sm:text-5xl tracking-[0.2em]'
  };

  const subtextSizes = {
    small: 'text-[9px] tracking-[0.28em]',
    medium: 'text-[10px] tracking-[0.32em]',
    large: 'text-[12px] tracking-[0.36em]'
  };

  return (
    <Link href={href} className="group inline-flex items-center gap-3.5 cursor-pointer select-none relative z-10" aria-label="Loomlore Home - Go to Homepage">
      {/* Bold High-Definition Lotus & L Interlocking Emblem */}
      <div className={`relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8ba7] via-[#fffffe] to-[#faeee7] shadow-md border-2 border-[#33272a]/20 transition duration-300 group-hover:scale-105 group-hover:border-[#ff8ba7] ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Decorative Dashed Ring */}
          <circle cx="50" cy="50" r="44" stroke="#33272a" strokeWidth="5" opacity="0.25" />
          <circle cx="50" cy="50" r="44" stroke="#ff8ba7" strokeWidth="4" strokeDasharray="12 8" />
          
          {/* Bold Lotus Petal Motif */}
          <path d="M50 14 C58 32 78 35 81 52 C84 69 66 81 50 83 C34 81 16 69 19 52 C22 35 42 32 50 14 Z" fill="#33272a" opacity="0.15" />
          <path d="M50 20 Q62 44 76 54 Q50 70 50 82 Q50 70 24 54 Q38 44 50 20 Z" fill="url(#logoGradBold)" />
          
          {/* Bold Interlocking L Accent */}
          <path d="M36 32 V68 H64" stroke="#fffffe" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 32 V68 H64" stroke="#33272a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

          <defs>
            <linearGradient id="logoGradBold" x1="24" y1="20" x2="76" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff8ba7" />
              <stop offset="0.6" stopColor="#ffc6c7" />
              <stop offset="1" stopColor="#33272a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Soria Serif Wordmark - Fully Clickable to Home */}
      <div className="flex flex-col cursor-pointer">
        <span className={`display-h text-[#33272a] font-bold leading-none transition-colors duration-200 group-hover:text-[#ff8ba7] ${titleSizes[size]}`}>
          LOOMLORE
        </span>
        <span className={`font-sans text-[#ff8ba7] font-bold uppercase leading-tight mt-1 transition-colors duration-200 group-hover:text-[#33272a] ${subtextSizes[size]}`}>
          Heirlooms of India
        </span>
      </div>
    </Link>
  );
}
