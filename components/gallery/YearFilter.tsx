'use client';

interface YearFilterProps {
  years: number[];
  active: number | null;
  onChange: (year: number | null) => void;
}

export default function YearFilter({ years, active, onChange }: YearFilterProps) {
  if (years.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="year-filter" className="font-body text-xs text-charcoal uppercase tracking-widest">
        Année
      </label>
      <select
        id="year-filter"
        value={active ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className="font-body text-sm px-3 py-1.5 bg-cream border border-ink/20 text-ink
          focus:outline-none focus:border-ochre transition-colors cursor-pointer"
      >
        <option value="">Toutes</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
