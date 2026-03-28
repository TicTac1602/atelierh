'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="relative bg-earth texture-ink deco-letter-h py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-cream/60">
          Rejoignez-nous
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
          Commencez votre<br />
          <span className="italic">aventure créative</span>
        </h2>
        <p className="font-body text-cream/70 text-lg max-w-xl leading-relaxed">
          Inscrivez-vous à l&apos;un de nos ateliers ou venez simplement découvrir
          l&apos;espace. Nous serons ravis de vous accueillir.
        </p>
        <Button href="/contact" variant="outline" size="lg">
          Nous contacter
        </Button>
      </motion.div>
    </section>
  );
}
