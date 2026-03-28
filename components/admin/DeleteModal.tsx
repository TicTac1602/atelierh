'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { deleteImage } from '@/lib/utils/images';
import { type GalleryImage } from '@/types';

interface DeleteModalProps {
  image: GalleryImage;
  open: boolean;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export default function DeleteModal({ image, open, onClose, onDeleted }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    // 1. Remove from Storage
    const { error: storageErr } = await deleteImage(image.storage_path);
    if (storageErr) {
      setError(`Erreur Storage : ${storageErr}`);
      setLoading(false);
      return;
    }

    // 2. Remove from DB
    const supabase = createClient();
    const { error: dbErr } = await supabase
      .from('images')
      .delete()
      .eq('id', image.id);

    if (dbErr) {
      setError(`Erreur base de données : ${dbErr.message}`);
      setLoading(false);
      return;
    }

    onDeleted(image.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-paper w-full max-w-sm p-6 flex flex-col gap-5"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-semibold text-ink">
              Supprimer l&apos;œuvre
            </h2>
            <p className="font-body text-sm text-charcoal">
              Voulez-vous vraiment supprimer <span className="italic">&laquo;{image.title}&raquo;</span> ?
              Cette action est irréversible.
            </p>
            {error && (
              <p className="text-sm text-red-600" role="alert">{error}</p>
            )}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border border-ink/20 text-charcoal hover:border-ink transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {loading ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
