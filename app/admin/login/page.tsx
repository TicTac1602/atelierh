import type { Metadata } from 'next';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Administration — Atelier H',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-ink texture-ink">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* Brand */}
        <div className="text-center">
          <span className="font-display text-3xl font-bold text-cream">
            Atelier <span className="text-ochre italic">H</span>
          </span>
          <p className="font-body text-sm text-mist mt-2">Espace administration</p>
        </div>

        <div className="bg-paper p-8">
          <h1 className="font-display text-xl font-semibold text-ink mb-6">
            Connexion
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
