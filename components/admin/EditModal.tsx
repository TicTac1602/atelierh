'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { CATEGORIES, type GalleryImage, type ImageCategory } from '@/types';

interface EditModalProps {
  image: GalleryImage;
  open: boolean;
  onClose: () => void;
  onUpdated: (image: GalleryImage) => void;
}

export default function EditModal({ image, open, onClose, onUpdated }: EditModalProps) {
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description ?? '');
  const [category, setCategory] = useState<ImageCategory>(image.category);
  const [year, setYear] = useState<string>(image.year?.toString() ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Le titre est obligatoire.');
      return;
    }
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { data, error: dbErr } = await supabase
      .from('images')
      .update({
        title: title.trim(),
        description: description.trim() || null,
        category,
        year: year ? parseInt(year, 10) : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', image.id)
      .select()
      .single();

    if (dbErr || !data) {
      setError(dbErr?.message ?? 'Erreur lors de la mise à jour.');
      setLoading(false);
      return;
    }

    onUpdated(data as GalleryImage);
    onClose();
  };

  const inputClass =
    'w-full px-3 py-2 text-sm border border-ink/20 bg-white text-ink focus:outline-none focus:border-ochre transition-colors';

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
          <motion.form
            className="bg-paper w-full max-w-md p-6 flex flex-col gap-5"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-semibold text-ink">
              Modifier l&apos;œuvre
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-charcoal">Titre *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-charcoal">Description</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} resize-none`} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-charcoal">Catégorie</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as ImageCategory)} className={inputClass}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-charcoal">Année</label>
                <input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(e.target.value)} className={inputClass} placeholder="ex. 2024" />
              </div>
            </div>

            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-ink/20 text-charcoal hover:border-ink transition-colors">
                Annuler
              </button>
              <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-earth text-cream hover:bg-earth-dark transition-colors disabled:opacity-60">
                {loading ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
