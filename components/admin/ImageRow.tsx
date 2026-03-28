'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/utils/images';
import { type GalleryImage } from '@/types';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

interface ImageRowProps {
  image: GalleryImage;
  onDeleted: (id: string) => void;
  onUpdated: (image: GalleryImage) => void;
}

export default function ImageRow({ image, onDeleted, onUpdated }: ImageRowProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const url = getPublicUrl(image.storage_path);

  const modals = typeof window !== 'undefined' ? createPortal(
    <>
      <DeleteModal
        image={image}
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onDeleted={onDeleted}
      />
      <EditModal
        image={image}
        open={showEdit}
        onClose={() => setShowEdit(false)}
        onUpdated={onUpdated}
      />
    </>,
    document.body
  ) : null;

  return (
    <>
      <tr className="border-b border-ink/8 hover:bg-ochre/5 transition-colors">
        <td className="py-3 px-4">
          <div className="relative w-12 h-16 shrink-0 overflow-hidden bg-charcoal/10">
            <Image
              src={url}
              alt={image.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        </td>
        <td className="py-3 px-4">
          <p className="font-medium text-ink text-sm">{image.title}</p>
          {image.description && (
            <p className="text-xs text-mist mt-0.5 line-clamp-1">{image.description}</p>
          )}
        </td>
        <td className="py-3 px-4 text-sm text-charcoal hidden md:table-cell">
          {image.category}
        </td>
        <td className="py-3 px-4 text-sm text-charcoal hidden lg:table-cell">
          {image.year ?? '—'}
        </td>
        <td className="py-3 px-4 text-sm text-mist hidden xl:table-cell">
          {new Date(image.created_at).toLocaleDateString('fr-FR')}
        </td>
        <td className="py-3 px-4">
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className="text-xs px-3 py-1.5 border border-ink/20 text-charcoal hover:border-ochre hover:text-ochre transition-colors"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={() => setShowDelete(true)}
              className="text-xs px-3 py-1.5 border border-ink/20 text-charcoal hover:border-red-400 hover:text-red-600 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </td>
      </tr>

      {modals}
    </>
  );
}
