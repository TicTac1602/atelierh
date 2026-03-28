'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getPublicUrl } from '@/lib/utils/images';
import { type GalleryImage } from '@/types';
import SectionTitle from '@/components/ui/SectionTitle';

function FeaturedCard({ image, index }: { image: GalleryImage; index: number }) {
  const url = getPublicUrl(image.storage_path);
  return (
    <motion.div
      className="group relative aspect-3/4 overflow-hidden bg-charcoal/10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Image
        src={url}
        alt={image.title}
        fill
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 30vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-300 flex items-end p-4">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-display text-lg text-cream italic">{image.title}</p>
          <p className="font-body text-xs text-cream/70 uppercase tracking-widest mt-1">
            {image.category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="aspect-[3/4] bg-charcoal/10 animate-pulse" />
  );
}

export default function FeaturedWorks() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setImages(data as GalleryImage[]);
        setLoading(false);
      });
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Galerie"
            title="Œuvres récentes"
            subtitle="Un aperçu des dernières créations de l'atelier."
          />
          <Link
            href="/galerie"
            className="font-body text-sm text-earth border-b border-earth pb-0.5 hover:text-earth-dark hover:border-earth-dark transition-colors whitespace-nowrap"
          >
            Voir toute la galerie →
          </Link>
        </div>

        {inView && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : images.length > 0
              ? images.map((img, i) => <FeaturedCard key={img.id} image={img} index={i} />)
              : Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-charcoal/10 flex items-center justify-center">
                    <span className="font-display text-2xl text-charcoal/20 italic">Œuvre {i + 1}</span>
                  </div>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
