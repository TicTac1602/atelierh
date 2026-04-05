'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AtelierLocation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Nous trouver
            </h2>
            <span className="ochre-rule" aria-hidden />
          </div>

          <div className="flex flex-col gap-3 font-body text-charcoal">
            <p className="font-semibold text-ink">Atelier H</p>
            <p>
              15 rue de l&apos;Étape<br />
			  51100 Reims, France
			</p>
			<p>
			  <a
				href="mailto:hanne.toulouse@free.fr"
                className="text-earth hover:text-earth-dark transition-colors"
              >
                hanne.toulouse@free.fr
              </a>
            </p>
            <p>
              <a
                href="tel:+33633369107"
                className="text-earth hover:text-earth-dark transition-colors"
              >
                +33 6 33 36 91 07
              </a>
            </p>
          </div>

          {/* Google Maps embed (no API key required for basic embed) */}
          <motion.div
            className="relative w-full aspect-video border border-ink/10 overflow-hidden bg-paper"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
			{/* zoom more on the map pin */}
            <iframe
              title="Localisation de l'Atelier H"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=15%20rue%20de%20l'etape%2051100%20reims&t=&z=16&ie=UTF8&iwloc=&output=embed"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
