'use client';

import { type GalleryImage } from '@/types';
import GalleryCard from './GalleryCard';

interface GalleryGridProps {
  images: GalleryImage[];
  onSelect: (image: GalleryImage) => void;
}

function EmptyState() {
  return (
    <div className="col-span-full py-20 flex flex-col items-center gap-4 text-center">
      <span className="font-display text-6xl text-charcoal/20 italic">∅</span>
      <p className="font-body text-charcoal text-sm">
        Aucune œuvre ne correspond à votre sélection.
      </p>
    </div>
  );
}

export default function GalleryGrid({ images, onSelect }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
      {images.map((image, i) => (
        <GalleryCard
          key={image.id}
          image={image}
          index={i}
          onClick={() => onSelect(image)}
        />
      ))}
    </div>
  );
}
