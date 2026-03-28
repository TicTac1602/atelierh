'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/utils/images';
import { type GalleryImage } from '@/types';
import LightboxNav from './LightboxNav';

interface LightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNavigate: (image: GalleryImage) => void;
}

export default function Lightbox({ image, images, onClose, onNavigate }: LightboxProps) {
  const currentIndex = image ? images.findIndex((i) => i.id === image.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handlePrev = () => hasPrev && onNavigate(images[currentIndex - 1]);
  const handleNext = () => hasNext && onNavigate(images[currentIndex + 1]);

  // Keyboard navigation
  useEffect(() => {
    if (!image) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, currentIndex]);

  // Prevent body scroll when open
  useEffect(() => {
    if (image) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [image]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-cream/70 hover:text-cream transition-colors text-xl"
            onClick={onClose}
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Image */}
          <motion.div
            className="relative max-w-5xl w-full max-h-[75vh] flex items-center justify-center"
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getPublicUrl(image.storage_path)}
              alt={image.title}
              width={1200}
              height={900}
              className="object-contain max-h-[75vh] w-auto"
              priority
            />
          </motion.div>

          {/* Caption + Nav */}
          <div
            className="flex items-center justify-between w-full max-w-5xl mt-6 px-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <p className="font-display text-lg text-cream italic">{image.title}</p>
              <p className="font-body text-xs text-mist uppercase tracking-widest">
                {image.category}{image.year ? ` · ${image.year}` : ''}
              </p>
              {image.description && (
                <p className="font-body text-sm text-cream/60 max-w-md mt-1">
                  {image.description}
                </p>
              )}
            </div>
            <LightboxNav
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-xs text-mist">
            {currentIndex + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
