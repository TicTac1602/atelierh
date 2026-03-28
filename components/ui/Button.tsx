'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { type ComponentPropsWithoutRef } from 'react';

type Variant = 'earth' | 'outline' | 'ghost' | 'cream';
type Size = 'sm' | 'md' | 'lg';

// Omit event handlers that conflict with Framer Motion's own handlers
type SafeButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>;

interface ButtonProps extends SafeButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  earth:
    'bg-earth text-cream border-2 border-earth hover:bg-earth-dark hover:border-earth-dark',
  outline:
    'bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-cream',
  ghost:
    'bg-transparent text-earth border-2 border-transparent hover:border-ochre',
  cream:
    'bg-transparent text-cream border-2 border-cream/50 hover:bg-cream hover:text-ink',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'earth',
  size = 'md',
  href,
  external,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = `inline-flex items-center justify-center font-body font-medium
    tracking-wide transition-colors duration-200 cursor-pointer
    ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <motion.div className="inline-block" {...motionProps}>
        <Link href={href} className={base} {...linkProps}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button className={base} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
