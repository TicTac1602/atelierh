'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';

const VENUES = [
  {
    place: 'Collège Notre-Dame',
    public: 'Cours enfants',
    days: ['Mar', 'Mer', 'Jeu'],
    description:
      `Cours d'arts plastiques auprès des élèves sur les temps de midi. L'année scolaire est rythmée par des projets artistiques variés.`,
    available: true,
  },
  {
    place: 'Atelier H',
    public: 'Cours enfants',
    days: ['Mar', 'Mer'],
    description:
      "Des ateliers créatifs proposés en dehors du temps scolaire, ouverts aux enfants. Peinture, collage, techniques mixtes.",
    available: true,
  },
  {
    place: 'Atelier H',
    public: 'Cours adultes',
    days: ['Jeu'],
    description:
      "Des cours du soir dédiés aux adultes sont en cours de préparation. Le jeudi sera l'occasion de se retrouver pour peindre, progresser et partager dans une ambiance conviviale et bienveillante.",
    available: false,
  },
];

export default function AtelierPricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-cream texture-cream">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-ochre">
            Où nous retrouver
          </span>
          <span className="ochre-rule" aria-hidden />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink">
            Nos propositions d&apos;ateliers
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {VENUES.map((v, i) => (
            <motion.div
              key={v.description}
              className={`relative flex flex-col gap-5 p-6 md:p-8 border transition-colors border-cream/15 bg-cream/5 hover:border-ochre/40`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {!v.available && (
                <span className="absolute top-4 right-4 font-body text-[10px] font-medium tracking-widest uppercase text-ochre/70 border border-ochre/30 px-2 py-0.5">
                  Bientôt
                </span>
              )}

              <div className="flex flex-col gap-1">
                <p className="font-display text-xl font-semibold text-ink">
                  {v.place}
                </p>
                <p className="font-body text-md text-ochre">{v.public}</p>
              </div>

              {v.days && (
                <div className="flex gap-2">
                  {v.days.map((d) => (
                    <span
                      key={d}
                      className="font-body text-xs font-medium px-2.5 py-1 border border-ochre/40 text-ochre"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}

              <p className="font-body text-sm text-ink/60 leading-relaxed flex-1">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/contact" variant="outline" size="md">
            Prendre contact
          </Button>
        </div>
      </div>
    </section>
  );
}
