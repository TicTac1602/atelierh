'use client';

interface LightboxNavProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function LightboxNav({ onPrev, onNext, hasPrev, hasNext }: LightboxNavProps) {
  const btnBase =
    'w-10 h-10 flex items-center justify-center border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/60 transition-colors disabled:opacity-20 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={btnBase}
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Œuvre précédente"
      >
        ←
      </button>
      <button
        type="button"
        className={btnBase}
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Œuvre suivante"
      >
        →
      </button>
    </div>
  );
}
