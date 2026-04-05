'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };
  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const, delay: 0.15 } },
  };

  return (
    <section
      ref={ref}
      className="relative bg-paper texture-paper py-20 md:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Photo */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="relative aspect-4/5 border border-ink/10 overflow-hidden"
        >
          <Image
            src="/hanne.jpg"
            alt="Hanne dans son atelier"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {/* Decorative corner accent */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-ochre" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-ochre" />
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-6"
        >
          <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-earth">
            À propos
          </span>
          <span className="ochre-rule" aria-hidden />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
            Une transmission née <br/><span className="italic text-earth">du geste et de l&apos;écoute</span>
          </h2>
          <p className="font-body text-charcoal leading-relaxed">
            Danoise d&apos;origine et maman de quatre enfants, Hanne découvre la peinture
            sur bois à la caséine lors d&apos;un stage à Chantilly en 2001. En arrivant à
            Reims, elle poursuit sa formation aux Bleuets, puis à l&apos;école BLOT avant
            d&apos;entreprendre le cursus de peintre en décor.
          </p>
          <p className="font-body text-charcoal leading-relaxed">
            Diplômée de l&apos;école BLOT depuis 2017, elle transmet depuis 2018 au
            collège Notre-Dame de Reims, où elle accompagne les élèves dans la
            découverte du dessin et de la peinture sur le temps du midi.
          </p>
          <p className="font-body text-charcoal leading-relaxed">
            Après une expérience auprès des enfants chez Et Caetera entre 2019 et
            2021, puis des cours particuliers à domicile, elle ouvre en 2025 son
            atelier rue de l&apos;Étape : un lieu vivant, accessible et bienveillant,
            dédié au plaisir de créer ensemble.
          </p>
          <div className="flex gap-8 pt-2">
            <div>
              <div className="font-display text-3xl font-bold text-earth">2001</div>
              <div className="font-body text-sm text-charcoal">Première rencontre avec la caséine</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-earth">2017</div>
              <div className="font-body text-sm text-charcoal">Diplômée de l&apos;école BLOT</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-earth">2018</div>
              <div className="font-body text-sm text-charcoal">Début des cours au collège Notre-Dame de Reims</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
