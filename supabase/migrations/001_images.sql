-- ============================================================
-- Atelier H — Supabase Migration 001
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Create images table
CREATE TABLE IF NOT EXISTS public.images (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  description   text,
  category      text NOT NULL CHECK (category IN ('Peinture', 'Aquarelle', 'Acrylique', 'Pastel', 'Artisanat')),
  year          smallint,
  storage_path  text NOT NULL,
  display_order integer DEFAULT 0,
  created_at    timestamptz DEFAULT now() NOT NULL,
  updated_at    timestamptz DEFAULT now() NOT NULL
);

-- 2. Index for common query patterns
CREATE INDEX IF NOT EXISTS idx_images_category    ON public.images (category);
CREATE INDEX IF NOT EXISTS idx_images_year        ON public.images (year);
CREATE INDEX IF NOT EXISTS idx_images_created_at  ON public.images (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_images_order       ON public.images (display_order ASC);

-- 3. Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_images_updated_at ON public.images;
CREATE TRIGGER set_images_updated_at
  BEFORE UPDATE ON public.images
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Anyone can read all images (public gallery)
CREATE POLICY "Public read images"
  ON public.images FOR SELECT
  TO public
  USING (true);

-- Only authenticated (admin) users can insert
CREATE POLICY "Authenticated insert images"
  ON public.images FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated (admin) users can update
CREATE POLICY "Authenticated update images"
  ON public.images FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated (admin) users can delete
CREATE POLICY "Authenticated delete images"
  ON public.images FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- STORAGE BUCKET (run separately in Storage section OR via SQL)
-- ============================================================
-- In Supabase Dashboard → Storage → New bucket:
--   Name: gallery
--   Public: YES (so image URLs work without signing)
--
-- Or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: anyone can read objects in gallery bucket
CREATE POLICY "Public read gallery"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'gallery');

-- Authenticated users can upload
CREATE POLICY "Authenticated upload gallery"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery');

-- Authenticated users can delete their uploads
CREATE POLICY "Authenticated delete gallery"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery');
