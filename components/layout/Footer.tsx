import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/atelier', label: "L'Atelier" },
  { href: '/galerie', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-light text-cream/70 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-cream/10">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="font-display text-2xl font-bold text-cream">
              Atelier<span className="text-ochre"> H</span>
            </span>
            <p className="text-sm max-w-xs text-cream/50">
              Un espace vivant de partage et de transmission artistique à Reims.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Liens de pied de page">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm hover:text-cream transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/40">
          <span>© {year} Atelier H. Tous droits réservés.</span>
          <span>Fait avec passion</span>
        </div>
      </div>
    </footer>
  );
}
