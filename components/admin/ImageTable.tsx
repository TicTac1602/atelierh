'use client';

import { type GalleryImage } from '@/types';
import ImageRow from './ImageRow';

interface ImageTableProps {
  images: GalleryImage[];
  onDeleted: (id: string) => void;
  onUpdated: (image: GalleryImage) => void;
}

export default function ImageTable({ images, onDeleted, onUpdated }: ImageTableProps) {
  if (images.length === 0) {
    return (
      <div className="py-16 text-center text-charcoal font-body text-sm">
        Aucune œuvre pour l&apos;instant.{' '}
        <a href="/admin/upload" className="text-earth underline-offset-2 hover:underline">
          Ajouter la première
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="border-b-2 border-ink/10 text-left">
            <th className="py-3 px-4 font-medium text-charcoal text-xs uppercase tracking-widest w-16">
              Image
            </th>
            <th className="py-3 px-4 font-medium text-charcoal text-xs uppercase tracking-widest">
              Titre
            </th>
            <th className="py-3 px-4 font-medium text-charcoal text-xs uppercase tracking-widest hidden md:table-cell">
              Catégorie
            </th>
            <th className="py-3 px-4 font-medium text-charcoal text-xs uppercase tracking-widest hidden lg:table-cell">
              Année
            </th>
            <th className="py-3 px-4 font-medium text-charcoal text-xs uppercase tracking-widest hidden xl:table-cell">
              Ajoutée le
            </th>
            <th className="py-3 px-4 font-medium text-charcoal text-xs uppercase tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {images.map((img) => (
            <ImageRow
              key={img.id}
              image={img}
              onDeleted={onDeleted}
              onUpdated={onUpdated}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
