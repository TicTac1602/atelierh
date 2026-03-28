export type ImageCategory =
  | 'Peinture'
  | 'Aquarelle'
  | 'Acrylique'
  | 'Pastel'
  | 'Artisanat';

export const CATEGORIES: ImageCategory[] = [
  'Peinture',
  'Aquarelle',
  'Acrylique',
  'Pastel',
  'Artisanat',
];

export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  category: ImageCategory;
  year: number | null;
  storage_path: string;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}
