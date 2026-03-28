import type { Metadata } from 'next';
import GalerieClient from '@/components/gallery/GalerieClient';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    "Explorez les œuvres de l'Atelier H : peintures, aquarelles, acryliques, pastels et artisanat.",
};

export default function GaleriePage() {
  return (
    <>
      {/* Page hero */}
      <div className="bg-ink texture-ink py-28 md:py-36 px-[10vw] relative overflow-hidden">
        <div className="absolute left-[8vw] top-0 w-px h-full bg-gradient-to-b from-ochre/40 via-ochre/10 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-ochre">
            Créations
          </span>
          <div className="ochre-rule mt-4 mb-6" />
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-cream leading-none">
            Galerie
          </h1>
          <p className="mt-6 font-body text-xl text-cream/60 max-w-xl leading-relaxed">
            Un aperçu des œuvres nées dans l&apos;atelier. Filtrez par technique ou par
            année.
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <GalerieClient />
        </div>
      </section>
    </>
  );
}
