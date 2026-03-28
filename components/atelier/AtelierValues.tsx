'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VALUES = [
  {
    icon: '✦',
    title: 'Bienveillance',
    text: "Chaque participant avance à son rythme, dans un environnement encourageant et sans jugement.",
  },
  {
    icon: '◈',
    title: 'Expérimentation',
    text: "Nous encourageons la prise de risque créative. Se tromper fait partie du processus.",
  },
  {
    icon: '◉',
    title: 'Partage',
    text: "L'atelier est avant tout un lieu de rencontres, d'échanges et de transmission.",
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
      </div>
    </section>
  );
}
