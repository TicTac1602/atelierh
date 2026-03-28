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
            Un lieu où la<br />
            <span className="italic text-earth">création</span> prend vie
          </h2>
          <p className="font-body text-charcoal leading-relaxed">
            Bienvenue à l&apos;Atelier H — un espace chaleureux dédié à la peinture et à
            l&apos;artisanat. Que vous soyez débutant ou artiste confirmé, chaque
            séance est pensée pour vous permettre de vous exprimer librement, à
            votre rythme.
          </p>
          <p className="font-body text-charcoal leading-relaxed">
            Chaque atelier propose un cadre bienveillant où l&apos;expérimentation est
            encouragée. Aquarelle, acrylique, pastel, peinture à l&apos;huile ou
            petits objets artisanaux — explorez les techniques qui vous inspirent.
          </p>
          <div className="flex gap-8 pt-2">
            <div>
              <div className="font-display text-3xl font-bold text-earth">10+</div>
              <div className="font-body text-sm text-charcoal">Années d&apos;expérience</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-earth">50+</div>
              <div className="font-body text-sm text-charcoal">Élèves accompagnés</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-earth">5</div>
              <div className="font-body text-sm text-charcoal">Techniques enseignées</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
