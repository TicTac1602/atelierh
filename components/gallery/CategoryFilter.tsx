'use client';

import Tag from '@/components/ui/Tag';
import { CATEGORIES, type ImageCategory } from '@/types';

interface CategoryFilterProps {
  active: ImageCategory | 'Tout';
  onChange: (cat: ImageCategory | 'Tout') => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
      <Tag
        label="Tout"
        active={active === 'Tout'}
        onClick={() => onChange('Tout')}
      />
      {CATEGORIES.map((cat) => (
        <Tag
          key={cat}
          label={cat}
          active={active === cat}
          onClick={() => onChange(cat)}
        />
      ))}
    </div>
  );
}
