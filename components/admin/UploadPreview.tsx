'use client';

import Image from 'next/image';

interface UploadPreviewProps {
  file: File | null;
  previewUrl: string | null;
}

export default function UploadPreview({ file, previewUrl }: UploadPreviewProps) {
  if (!previewUrl || !file) {
    return (
      <div className="aspect-[4/3] border-2 border-dashed border-ink/20 flex flex-col items-center justify-center gap-3 text-mist bg-paper/50">
        <span className="text-4xl opacity-30">◈</span>
        <p className="font-body text-sm">Aperçu de l&apos;image</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/10">
        <Image
          src={previewUrl}
          alt="Aperçu"
          fill
          className="object-contain"
        />
      </div>
      <p className="font-body text-xs text-mist">
        {file.name} — {(file.size / 1024 / 1024).toFixed(2)} Mo
      </p>
    </div>
  );
}
