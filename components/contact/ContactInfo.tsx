const INFO = [
  {
    icon: '◉',
    label: 'Adresse',
    value: '15 Rue de l\'Étape\n51100 Reims, France',
  },
  {
	icon: '◎',
	label: 'Réseaux sociaux',
	value: '@atelier_h_reims',
	href: 'https://www.instagram.com/atelier_h_reims'
  },
  {
    icon: '◈',
    label: 'Email',
    value: 'hanne.toulouse@free.fr',
    href: 'mailto:hanne.toulouse@free.fr',
  },

  {
    icon: '✦',
    label: 'Téléphone',
    value: '+33 6 33 36 91 07',
    href: 'tel:+33633369107'
  }
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-earth">
          Coordonnées
        </span>
        <span className="ochre-rule" aria-hidden />
        <h2 className="font-display text-3xl font-semibold text-ink">
          Venez nous rendre visite
        </h2>
        <p className="font-body text-charcoal leading-relaxed max-w-sm">
          Nous sommes ouverts sur les créneaux de cours. N&apos;hésitez pas à passer nous voir
          ou à nous écrire pour toute question.
        </p>
      </div>

      <ul className="flex flex-col gap-6">
        {INFO.map(({ icon, label, value, href }) => (
          <li key={label} className="flex gap-4 items-start">
            <span className="text-ochre text-lg shrink-0 mt-0.5">{icon}</span>
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-mist mb-1">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="font-body text-sm text-earth hover:text-earth-dark transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="font-body text-sm text-charcoal whitespace-pre-line">
                  {value}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
