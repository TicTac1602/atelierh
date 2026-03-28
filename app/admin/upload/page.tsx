import type { Metadata } from 'next';
import Link from 'next/link';
import UploadForm from '@/components/admin/UploadForm';

export const metadata: Metadata = {
  title: 'Ajouter une œuvre — Admin',
  robots: { index: false, follow: false },
};

export default function UploadPage() {
  return (
    <>
      <header className="bg-ink text-cream px-6 py-4 flex items-center justify-between">
        <Link href="/admin/dashboard" className="font-display text-xl font-bold hover:text-ochre transition-colors">
          Atelier <span className="text-ochre italic">H</span>
          <span className="font-body text-xs font-normal text-mist ml-3">Admin</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="font-body text-sm text-earth hover:text-earth-dark transition-colors">
            ← Retour au dashboard
          </Link>
          <h1 className="font-display text-3xl font-semibold text-ink mt-4">
            Ajouter une œuvre
          </h1>
          <p className="font-body text-sm text-mist mt-1">
            L&apos;œuvre sera visible dans la galerie dès sa publication.
          </p>
        </div>

        <UploadForm />
      </main>
    </>
  );
}
