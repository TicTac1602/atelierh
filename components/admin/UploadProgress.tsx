'use client';

interface UploadProgressProps {
  progress: number; // 0-100
  label?: string;
}

export default function UploadProgress({ progress, label }: UploadProgressProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <p className="font-body text-xs text-charcoal">{label}</p>
      )}
      <div className="h-1.5 w-full bg-ink/10 overflow-hidden">
        <div
          className="h-full bg-earth transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="font-body text-xs text-mist text-right">{progress}%</p>
    </div>
  );
}
