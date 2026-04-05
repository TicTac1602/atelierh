'use client';

import { motion, type Variants } from 'framer-motion';
import Button from '@/components/ui/Button';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function HeroText() {
  return (
    <motion.div
      className="relative z-10 flex flex-col gap-6 max-w-3xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.span
        variants={item}
        className="font-body text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-ochre"
      >
        Créer ensemble
      </motion.span>

      <motion.h1
        variants={item}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-none"
      >
        Atelier<br />
        <span className="italic text-ochre">H</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="font-body text-lg md:text-xl text-cream/70 max-w-xl leading-relaxed"
      >
        Un espace de partage, d&apos;exploration et de transmission artistique autour
        du dessin et de la peinture. Débutants ou confirmés, chacun y avance à
        son rythme.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
        <Button href="/atelier" variant="earth" size="lg">
          Voir l&apos;atelier
        </Button>
        <Button href="/galerie" variant="cream" size="lg">
          Voir la galerie
        </Button>
      </motion.div>
    </motion.div>
  );
}
