'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  open: boolean;
  links: NavLink[];
  pathname: string;
}

export default function MobileMenu({ open, links, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          key="mobile-menu"
          className="fixed inset-0 z-40 bg-ink texture-ink flex flex-col items-center justify-center gap-8 md:hidden"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          aria-label="Navigation mobile"
        >
          {links.map(({ href, label }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <Link
                href={href}
                className={`font-display text-3xl font-semibold text-cream transition-colors hover:text-ochre
                  ${pathname === href ? 'text-ochre' : ''}`}
              >
                {label}
              </Link>
            </motion.div>
          ))}

          <motion.div
            className="absolute bottom-8 text-mist font-body text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Atelier H
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
