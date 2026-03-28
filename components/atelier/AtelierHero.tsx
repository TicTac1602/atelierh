export default function AtelierHero() {
  return (
    <div className="relative bg-ink texture-ink py-28 md:py-36 px-[10vw] overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-[8vw] top-0 w-px h-full bg-linear-to-b from-ochre/40 via-ochre/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-ochre">
          Notre espace
        </span>
        <div className="ochre-rule mt-4 mb-6" />
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-cream leading-none">
          L&apos;Atelier
        </h1>
        <p className="mt-6 font-body text-xl text-cream/60 max-w-xl leading-relaxed">
          Découvrez l&apos;atelier — son histoire, sa philosophie et nos propositions.
        </p>
      </div>
    </div>
  );
}
