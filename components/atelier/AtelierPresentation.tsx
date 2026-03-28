'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const CREDENTIALS = [
  {
    year: '2003',
    title: 'DNSEP — Diplôme national supérieur d&apos;expression plastique',
    school: 'École nationale supérieure des beaux-arts de Lyon',
  },
  {
    year: '2008',
    title: 'Formation en aquarelle botanique',
    school: 'Royal Botanic Gardens, Kew — Londres',
  },
  {
    year: '2014',
    title: 'Certificat de pédagogie artistique',
    school: 'Institut national de formation des arts',
  },
];

const MILESTONES = [
  { year: '2015', label: 'Ouverture de l&apos;Atelier H' },
  { year: '2018', label: 'Premier cours collectif hebdomadaire' },
  { year: '2021', label: 'Exposition collective des élèves' },
  { year: '2024', label: '+200 élèves formés' },
];

export default function AtelierPresentation() {
  const storyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const credRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: '-60px' });
  const quoteInView = useInView(quoteRef, { once: true, margin: '-60px' });
  const credInView = useInView(credRef, { once: true, margin: '-60px' });

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
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center"
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
              Notre histoire
            </span>
            <span className="ochre-rule" aria-hidden />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
              Né d&apos;une passion,<br />
              <span className="italic text-ochre">transmis avec soin</span>
            </h2>
            <p className="font-body text-charcoal leading-relaxed">
              L&apos;Atelier H a ouvert ses portes en 2015, porté par une seule conviction :
              l&apos;art n&apos;est pas réservé à quelques-uns. Après plusieurs années de
              pratique professionnelle et d&apos;enseignement, Hanne a voulu créer un lieu
              à son image — chaleureux, exigeant et ouvert à tous les niveaux.
            </p>
            <p className="font-body text-charcoal leading-relaxed">
              Ce qui devait être un petit atelier de quartier est devenu, au fil des années,
              un espace vivant où se croisent débutants curieux et peintres confirmés,
              retraités et étudiants, amateurs d&apos;aquarelle et passionnés d&apos;acrylique.
              Le point commun ? Le plaisir de créer ensemble.
            </p>
            <p className="font-body text-charcoal leading-relaxed">
              Aujourd&apos;hui, l&apos;Atelier H propose des cours réguliers, des stages
              thématiques et des ateliers découverte, toujours pensés pour respecter le
              rythme et la sensibilité de chaque participant.
            </p>

            {/* Milestones */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-ink/10 mt-2">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <span className="font-display text-2xl font-bold text-earth">{m.year}</span>
                  <span
                    className="font-body text-xs text-charcoal leading-snug"
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
				Chaque pinceau posé sur la toile est un acte de confiance en soi.
				Mon rôle est de protéger cet élan.
			</blockquote>
			<p className="font-body text-cream/50 text-sm tracking-widest uppercase">— Hanne</p>
			</motion.div>
		</div>
      </section>

      {/* ── Credentials ── */}
      {/* <section className="relative bg-paper texture-paper py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div ref={credRef} className="max-w-7xl mx-auto flex flex-col gap-12">
          <motion.div
            className="flex flex-col gap-3 items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={credInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-earth">
              Formation &amp; diplômes
            </span>
            <span className="ochre-rule mx-auto" aria-hidden />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink">
              Un enseignement fondé sur l&apos;expertise
            </h2>
            <p className="font-body text-charcoal max-w-xl text-center leading-relaxed mt-2">
              La pédagogie de l&apos;Atelier H s&apos;appuie sur un parcours académique solide
              et une pratique artistique continue depuis plus de vingt ans.
            </p>
          </motion.div>

          <div className="flex flex-col gap-0 border border-ink/10 divide-y divide-ink/10">
            {CREDENTIALS.map((c, i) => (
              <motion.div
                key={c.year}
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-6 bg-cream/60"
                initial={{ opacity: 0, y: 20 }}
                animate={credInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="font-display text-3xl font-bold text-ochre w-20 shrink-0">
                  {c.year}
                </span>
                <div className="w-px h-10 bg-ink/10 shrink-0 hidden sm:block" />
                <div className="flex flex-col gap-0.5">
                  <p
                    className="font-display text-lg font-semibold text-ink"
                    dangerouslySetInnerHTML={{ __html: c.title }}
                  />
                  <p className="font-body text-sm text-charcoal">{c.school}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
