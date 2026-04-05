'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VALUES = [
  {
    icon: '✦',
    title: "Partage d'expérience",
    text: "Chaque participant apporte une richesse. Les savoirs circulent, se complètent et s'inspirent mutuellement.",
  },
  {
    icon: '◈',
    title: 'Transmission artistique',
    text: "Les techniques de base sont proposées, tout en laissant une vraie place à l'exploration personnelle.",
  },
  {
    icon: '◉',
    title: 'Évolution à son rythme',
    text: 'Ici, pas de pression inutile. Chacun avance selon son envie, son énergie et son niveau.',
  },
  {
    icon: '◎',
    title: 'Ouverture et co-création',
    text: "Je partage des idées, mais j'accompagne aussi celles qui émergent du groupe et des participants.",
  },
];

export default function AtelierValues() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-ink texture-ink">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 items-center text-center">
          <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-earth">
            Philosophie
          </span>
          <span className="ochre-rule mx-auto" aria-hidden />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream">
            Nos valeurs
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              className="flex flex-col gap-4 items-center text-center p-6"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className="text-3xl text-ochre">{v.icon}</span>
              <h3 className="font-display text-xl font-semibold text-cream">{v.title}</h3>
              <p className="font-body text-cream text-sm leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center flex flex-col gap-4"
        >
          <p className="font-body text-ochre leading-relaxed">
            Il y a des lieux où l&apos;on apprend, et d&apos;autres où l&apos;on se rencontre.
            Ici, c&apos;est un peu des deux. Pas de niveau à atteindre, pas de rythme
            imposé : seulement le vôtre.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
