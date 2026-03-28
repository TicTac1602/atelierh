'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* Background photo */}
      <Image
        src="/atelier.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-ink/70" />

      {/* Gradient: darker at top & bottom, lighter in center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #1c191790 0%, transparent 40%, transparent 60%, #1c1917cc 100%)',
        }}
      />

      {/* Warm ochre light bloom — centre-left */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 35% 55%, #c49a3c14 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Decorative ochre accent lines */}
      <div className="absolute top-0 left-0 w-px h-2/3 bg-linear-to-b from-ochre/40 to-transparent ml-[8vw]" />
      <div className="absolute top-0 right-0 w-px h-1/2 bg-linear-to-b from-ochre/20 to-transparent mr-[12vw]" />
    </div>
  );
}
