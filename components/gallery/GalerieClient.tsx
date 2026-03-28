'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CATEGORIES, type GalleryImage, type ImageCategory } from '@/types';
import CategoryFilter from './CategoryFilter';
import YearFilter from './YearFilter';
import GalleryGrid from './GalleryGrid';
import Lightbox from './Lightbox';

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-[4/5] bg-charcoal/10 animate-pulse" />
      ))}
    </div>
  );
}

export default function GalerieClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<ImageCategory | 'Tout'>('Tout');
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('images')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setImages(data as GalleryImage[]);
        setLoading(false);
      });
  }, []);

  const years = useMemo(() => {
    const ys = images
      .map((i) => i.year)
      .filter((y): y is number => y !== null);
    return Array.from(new Set(ys)).sort((a, b) => b - a);
  }, [images]);

  const filtered = useMemo(() => {
    return images.filter((img) => {
      const catOk = categoryFilter === 'Tout' || img.category === categoryFilter;
      const yearOk = yearFilter === null || img.year === yearFilter;
      return catOk && yearOk;
    });
  }, [images, categoryFilter, yearFilter]);

  // Lightbox images follow the current filter
  const lightboxImages = filtered;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <CategoryFilter active={categoryFilter} onChange={setCategoryFilter} />
        <YearFilter years={years} active={yearFilter} onChange={setYearFilter} />
      </div>

      {/* Results count */}
      {!loading && (
        <p className="font-body text-sm text-mist mb-6">
          {filtered.length} œuvre{filtered.length !== 1 ? 's' : ''}
          {categoryFilter !== 'Tout' ? ` · ${categoryFilter}` : ''}
          {yearFilter ? ` · ${yearFilter}` : ''}
        </p>
      )}

      {loading ? (
        <SkeletonGrid />
      ) : (
        <GalleryGrid images={filtered} onSelect={setLightboxImage} />
      )}

      <Lightbox
        image={lightboxImage}
        images={lightboxImages}
        onClose={() => setLightboxImage(null)}
        onNavigate={setLightboxImage}
      />
    </>
  );
}
