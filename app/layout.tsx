import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'Atelier H — Peinture & Artisanat',
    template: '%s | Atelier H',
  },
  description:
    "Atelier H, un espace de création dédié à la peinture et à l'artisanat. Cours et stages pour tous les niveaux.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atelier-h.vercel.app'
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${dmSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
