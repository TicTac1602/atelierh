import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import CtaSection from '@/components/home/CtaSection';

export const metadata: Metadata = {
  title: 'Atelier H — Peinture & Artisanat',
  description:
    "Atelier H, un espace de création dédié à la peinture et à l'artisanat. Cours et stages pour tous les niveaux.",
  openGraph: {
    title: 'Atelier H — Peinture & Artisanat',
    description: "Un espace de création, d'exploration et de partage.",
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedWorks />
      <CtaSection />
    </>
  );
}
