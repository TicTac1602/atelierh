import { createClient } from '@/lib/supabase/client';

const BUCKET = 'gallery';

/**
 * Returns the public URL for an image stored in Supabase Storage.
 */
export function getPublicUrl(storagePath: string): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

/**
 * Uploads a file to Supabase Storage and returns the storage path.
 */
export async function uploadImage(
  file: File,
  path: string
): Promise<{ path: string; error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: false, cacheControl: '3600' });

  if (error) return { path: '', error: error.message };
  return { path: data.path, error: null };
}

/**
 * Removes a file from Supabase Storage.
 */
export async function deleteImage(
  storagePath: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([storagePath]);

  return { error: error ? error.message : null };
}
