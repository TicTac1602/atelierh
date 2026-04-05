import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import CtaSection from '@/components/home/CtaSection';

export const metadata: Metadata = {
  title: 'Atelier H — Créer ensemble à Reims',
  description:
    "Atelier H, un espace de partage et de transmission artistique à Reims. Dessin, peinture et ateliers en petit groupe dans un cadre bienveillant.",
  openGraph: {
    title: 'Atelier H — Créer ensemble à Reims',
    description: "Un espace de partage, d'exploration et de transmission artistique.",
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
