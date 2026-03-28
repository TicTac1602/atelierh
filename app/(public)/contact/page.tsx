import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez l'Atelier H pour toute question sur nos ateliers, réservations ou informations générales.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-ink texture-ink py-28 md:py-36 px-[10vw] relative overflow-hidden">
        <div className="absolute left-[8vw] top-0 w-px h-full bg-linear-to-b from-ochre/40 via-ochre/10 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-ochre">
            Nous contacter
          </span>
          <div className="ochre-rule mt-4 mb-6" />
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-cream leading-none">
            Contact
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <ContactInfo />
          <div>
            <div className="flex flex-col gap-3 mb-8">
              <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-earth">
                Formulaire
              </span>
              <span className="ochre-rule" aria-hidden />
              <h2 className="font-display text-3xl font-semibold text-ink">
                Envoyez-nous un message
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
