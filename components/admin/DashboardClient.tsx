'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { type GalleryImage } from '@/types';
import ImageTable from '@/components/admin/ImageTable';

function AdminNav() {
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <header className="bg-ink text-cream px-6 py-4 flex items-center justify-between">
      <span className="font-display text-xl font-bold">
        Atelier <span className="text-ochre italic">H</span>
        <span className="font-body text-xs font-normal text-mist ml-3">Admin</span>
      </span>
      <div className="flex items-center gap-4">
        <Link href="/admin/upload" className="text-sm text-ochre hover:text-cream transition-colors">
          + Ajouter
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm text-mist hover:text-cream transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}

export default function DashboardClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setImages(data as GalleryImage[]);
        setLoading(false);
      });
  }, []);

  const handleDeleted = (id: string) =>
    setImages((imgs) => imgs.filter((i) => i.id !== id));

  const handleUpdated = (updated: GalleryImage) =>
    setImages((imgs) => imgs.map((i) => (i.id === updated.id ? updated : i)));

  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink">Galerie</h1>
            {!loading && (
              <p className="font-body text-sm text-mist mt-1">
                {images.length} œuvre{images.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <Link
            href="/admin/upload"
            className="px-5 py-2.5 bg-earth text-cream text-sm font-medium hover:bg-earth-dark transition-colors"
          >
            Ajouter une œuvre
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center font-body text-sm text-mist">
            Chargement…
          </div>
        ) : (
          <ImageTable
            images={images}
            onDeleted={handleDeleted}
            onUpdated={handleUpdated}
          />
        )}
      </main>
    </>
  );
}
