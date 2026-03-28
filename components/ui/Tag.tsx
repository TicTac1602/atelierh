import { type ImageCategory } from '@/types';

interface TagProps {
  label: string | ImageCategory;
  active?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, active = false, onClick }: TagProps) {
  const base =
    'inline-block px-3 py-1 text-xs font-body font-medium tracking-wide uppercase border transition-colors duration-150';
  const activeClass = 'bg-earth text-cream border-earth';
  const inactiveClass =
    'bg-transparent text-charcoal border-charcoal/40 hover:border-earth hover:text-earth';

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${active ? activeClass : inactiveClass} cursor-pointer`}
    >
      {label}
    </button>
  ) : (
    <span className={`${base} ${active ? activeClass : inactiveClass}`}>
      {label}
    </span>
  );
}
