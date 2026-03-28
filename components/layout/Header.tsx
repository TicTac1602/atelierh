"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/atelier", label: "L'Atelier" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-cream/95 backdrop-blur-sm border-b border-ink/10 shadow-sm'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`font-display text-2xl font-bold tracking-tight transition-colors ${transparent ? 'text-cream' : 'text-ink'}`}
          >
            Atelier<span className="text-ochre"> H</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-body text-sm font-medium tracking-wide transition-colors relative group ${
                    transparent
                      ? 'text-cream/80 hover:text-cream'
                      : 'text-charcoal hover:text-ink'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-ochre transition-all duration-200
                      ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button
            className={`md:hidden p-2 flex flex-col gap-1.5 ${transparent ? 'text-cream' : 'text-ink'}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} links={NAV_LINKS} pathname={pathname} />
    </>
  );
}
