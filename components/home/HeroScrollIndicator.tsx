'use client';

import { motion } from 'framer-motion';

export default function HeroScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-ochre/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <span className="font-body text-xs tracking-widest uppercase">
        Défiler
      </span>
      <motion.div
        className="w-px h-12 bg-linear-to-b from-ochre/70 to-transparent origin-top"
        animate={{ scaleY: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
