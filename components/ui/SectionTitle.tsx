'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const align = centered ? 'items-center text-center' : 'items-start text-left';
  const ruleAlign = centered ? 'mx-auto' : '';
  const textColor = light ? 'text-cream' : 'text-ink';
  const eyebrowColor = light ? 'text-ochre' : 'text-earth';
  const subtitleColor = light ? 'text-mist' : 'text-charcoal';

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col gap-3 ${align}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span className={`font-body text-sm font-medium tracking-widest uppercase ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <span className={`ochre-rule ${ruleAlign}`} aria-hidden />
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-body text-base md:text-lg max-w-2xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
