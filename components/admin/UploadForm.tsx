'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { uploadImage } from '@/lib/utils/images';
import { CATEGORIES, type ImageCategory } from '@/types';
import UploadPreview from './UploadPreview';
import UploadProgress from './UploadProgress';

const INITIAL = {
  title: '',
  description: '',
  category: 'Peinture' as ImageCategory,
  year: '',
};

const MAX_SIZE_MB = 8;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function UploadForm() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState(INITIAL);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const update = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null;
    if (!picked) return;

    if (!ALLOWED_TYPES.includes(picked.type)) {
      setError('Format non supporté. Utilisez JPEG, PNG ou WebP.');
      return;
    }
    if (picked.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`L'image ne doit pas dépasser ${MAX_SIZE_MB} Mo.`);
      return;
    }

    setError('');
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setError('Veuillez sélectionner une image.'); return; }
    if (!fields.title.trim()) { setError('Le titre est obligatoire.'); return; }

    setUploading(true);
    setError('');
    setProgress(10);

    // Build unique storage path
    const ext = file.name.split('.').pop();
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const storagePath = `${fields.category.toLowerCase()}/${safeName}`;

    setProgress(30);
    const { path, error: uploadErr } = await uploadImage(file, storagePath);
    if (uploadErr) {
      setError(`Erreur upload : ${uploadErr}`);
      setUploading(false);
      setProgress(0);
      return;
    }

    setProgress(70);
    const supabase = createClient();
    const { error: dbErr } = await supabase.from('images').insert({
      title: fields.title.trim(),
      description: fields.description.trim() || null,
      category: fields.category,
      year: fields.year ? parseInt(fields.year, 10) : null,
      storage_path: path,
    });

    if (dbErr) {
      setError(`Erreur base de données : ${dbErr.message}`);
      setUploading(false);
      setProgress(0);
      return;
    }

    setProgress(100);
    router.push('/admin/dashboard');
  };

  const inputClass =
    'w-full px-3 py-2.5 text-sm border border-ink/20 bg-white text-ink focus:outline-none focus:border-ochre transition-colors';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: image */}
        <div className="flex flex-col gap-5">
          <UploadPreview file={file} previewUrl={previewUrl} />
          <div>
            <label
              htmlFor="file-input"
              className="block font-body text-xs uppercase tracking-widest text-charcoal mb-1.5"
            >
              Fichier image * (JPEG / PNG / WebP, max {MAX_SIZE_MB} Mo)
            </label>
            <input
              ref={fileRef}
              id="file-input"
              type="file"
              accept={ALLOWED_TYPES.join(',')}
              onChange={handleFile}
              className="w-full text-sm font-body text-charcoal file:mr-4 file:px-4 file:py-2 file:border file:border-ink/20 file:bg-paper file:text-charcoal file:cursor-pointer hover:file:border-ochre transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Right: metadata */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="font-body text-xs uppercase tracking-widest text-charcoal">Titre *</label>
            <input id="title" type="text" required value={fields.title} onChange={update('title')} className={inputClass} placeholder="Titre de l'œuvre" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="font-body text-xs uppercase tracking-widest text-charcoal">Description</label>
            <textarea id="description" rows={4} value={fields.description} onChange={update('description')} className={`${inputClass} resize-none`} placeholder="Description optionnelle…" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="font-body text-xs uppercase tracking-widest text-charcoal">Catégorie *</label>
              <select id="category" value={fields.category} onChange={update('category')} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="year" className="font-body text-xs uppercase tracking-widest text-charcoal">Année</label>
              <input id="year" type="number" min="1900" max="2100" value={fields.year} onChange={update('year')} className={inputClass} placeholder="2024" />
            </div>
          </div>

          {uploading && (
            <UploadProgress progress={progress} label="Téléchargement en cours…" />
          )}

          {error && (
            <p className="font-body text-sm text-red-600" role="alert">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-earth text-cream text-sm font-medium hover:bg-earth-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? 'Envoi en cours…' : 'Publier l\'œuvre'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-3 border border-ink/20 text-charcoal text-sm hover:border-ink transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
