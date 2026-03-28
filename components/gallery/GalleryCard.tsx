'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/utils/images';
import { type GalleryImage } from '@/types';

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

export default function GalleryCard({ image, index, onClick }: GalleryCardProps) {
  const url = getPublicUrl(image.storage_path);

  return (
    <motion.article
      className="group relative overflow-hidden bg-charcoal/10 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Voir ${image.title} en plein écran`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="relative aspect-4/5">
        <Image
          src={url}
          alt={image.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/55 transition-colors duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-display text-base font-medium text-cream leading-tight">
            {image.title}
          </p>
          <p className="font-body text-xs text-cream/70 uppercase tracking-widest mt-1">
            {image.category}{image.year ? ` · ${image.year}` : ''}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
