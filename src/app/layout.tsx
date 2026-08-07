import type { Metadata } from 'next';
import './globals.css';
import { LuxuryNav } from '@/components/LuxuryNav';
import { StateTheme } from '@/components/StateTheme';

export const metadata: Metadata = {
  title: 'Loomlore — Luxury Indian Heritage & Handloom Architecture',
  description:
    'A minimal luxury digital archive of Indian traditional clothing — Banarasi, Kanjeevaram, Phulkari, Bandhani, Kasavu, Pashmina and more.',
  metadataBase: new URL('https://loomlore.in'),
  openGraph: {
    title: 'Loomlore — Luxury Indian Heritage & Handloom Architecture',
    description: 'A clean, minimal digital archive of Indian traditional clothing from every state.',
    type: 'website',
    locale: 'en_IN'
  },
  robots: { index: true, follow: true }
};

import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-[#33272a] bg-[#faeee7]" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#faeee7" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen text-[#33272a] bg-[#faeee7] antialiased font-serif" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-[#ff8ba7] focus:px-4 focus:py-2 focus:text-[#33272a] font-bold"
        >
          Skip to content
        </a>
        <AuthProvider>
          <ProtectedRoute>
            <StateTheme />
            <LuxuryNav />
            <main id="main">{children}</main>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
