'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const EXPERIENCE = [
  {
    year: '2001',
    title: 'Découverte de la peinture sur bois à la caséine',
    details: "Stage à Chantilly, point de départ d'un parcours artistique et pédagogique.",
  },
  {
    year: '2017',
    title: "Diplômée de l'école BLOT",
    details: 'Aboutissement du cursus de peintre en décor après plusieurs années de formation.',
  },
  {
    year: '2018',
    title: 'Ateliers au collège Notre-Dame de Reims',
    details: 'Accompagnement des élèves dans leurs découvertes du dessin et de la peinture sur le temps du midi.',
  },
  {
    year: '2019-2021',
    title: 'Expérience auprès des enfants chez Et Caetera',
    details: "Une période décisive pour affiner une pédagogie tournée vers l'imaginaire et l'expression personnelle.",
  },
  {
    year: '2025',
    title: "Ouverture de l'atelier rue de l'Étape",
    details: "Création d'un lieu vivant, accessible et bienveillant, pensé pour créer ensemble.",
  },
];

const MILESTONES = [
  { year: '2019', label: 'Création de Et Caetera' },
  { year: '2025', label: `Ouverture de l'Atelier H rue de l'Étape` },
];

export default function AtelierPresentation() {
  const storyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: '-60px' });
  const quoteInView = useInView(quoteRef, { once: true, margin: '-60px' });
  const experienceRef = useRef<HTMLDivElement>(null);
  const experienceInView = useInView(experienceRef, { once: true, margin: '-60px' });

  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };
  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
  };

  return (
    <>
      {/* ── Story section ── */}
      <section className="relative bg-cream py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        {/* Subtle vertical rule */}
        <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-transparent via-ochre/20 to-transparent hidden lg:block ml-[8vw]" />

        <div
          ref={storyRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24"
        >
          {/* Photo */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={storyInView ? 'show' : 'hidden'}
            className="relative aspect-4/5 overflow-hidden border border-ink/10 bg-charcoal/10 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-linear-to-br from-earth/10 to-ochre/5" />
          	<span className="font-display text-4xl text-charcoal/20 italic select-none z-10">Photo</span>
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-ochre pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-ochre pointer-events-none" />
          </motion.div>

          {/* Story text */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={storyInView ? 'show' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-earth">
              L&apos;histoire de l&apos;atelier
            </span>
            <span className="ochre-rule" aria-hidden />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
              Un parcours de transmission,<br />
              <span className="italic text-ochre">ancré dans la pratique</span>
            </h2>
            <p className="font-body text-charcoal leading-relaxed">
              L&apos;Atelier H a ouvert ses portes en 2019, sous le nom de Et Cetera rue chanzy à Reims. 
			  L&apos;atelier proposait alors des cours particuliers à domicile et quelques cours directement dans les locaux.
			  
            </p>
            <p className="font-body text-charcoal leading-relaxed">
              Au fil des années et avec l&apos;expérience, l&apos;envie de créer un espace plus personnel 
			  et dédié à la peinture a mûri. 
			  C&apos;est en 2025 que l&apos;atelier a ouvert ses portes rue de l&apos;Étape.
			  Cet espace vivant, accessible et bienveillant est dédié au
              partage, à l&apos;expérimentation et au plaisir de créer ensemble.
            </p>

			{/* Milestones */}
            <div className="flex gap-8 pt-2 border-t border-ink/10 mt-6">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <span className="font-display text-3xl font-bold text-earth">{m.year}</span>
                  <span
                    className="font-body text-sm text-charcoal leading-snug"
                    dangerouslySetInnerHTML={{ __html: m.label }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-ink texture-ink">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <motion.div
            ref={quoteRef}
            className="max-w-3xl mx-auto text-center flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="font-display text-5xl text-ochre leading-none" aria-hidden>&quot;</span>
            <blockquote className="font-display text-2xl md:text-3xl text-cream font-semibold leading-snug italic">
              Je viens avec mon expérience, mais c&apos;est ensemble que nous la faisons
              évoluer.
            </blockquote>
            <p className="font-body text-cream/50 text-sm tracking-widest uppercase">— Hanne</p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-paper texture-paper py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div ref={experienceRef} className="max-w-7xl mx-auto flex flex-col gap-12">
          <motion.div
            className="flex flex-col gap-3  "
            initial={{ opacity: 0, y: 24 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-earth">
              Mon expérience
            </span>
            <span className="ochre-rule " aria-hidden />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink">
              Des étapes qui ont façonné <br/> <span className="italic text-ochre"> ma manière d&apos;enseigner</span> 
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0 border border-ink/10 divide-y divide-ink/10 mt-4">
            {EXPERIENCE.map((item, i) => (
              <motion.div
                key={item.year}
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-6 bg-cream/60"
                initial={{ opacity: 0, y: 20 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="font-display text-3xl font-bold text-ochre w-20 shrink-0">
                  {item.year}
                </span>
                <div className="w-px h-10 bg-ink/10 shrink-0 hidden sm:block" />
                <div className="flex flex-col gap-0.5">
                  <p className={`font-display text-lg font-bold text-ink`}>{item.title}</p>
                  <p
                    className="font-body text-sm text-charcoal"
                    dangerouslySetInnerHTML={{ __html: item.details }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
