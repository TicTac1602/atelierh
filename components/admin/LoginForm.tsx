'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  };

  const inputClass =
    'w-full px-4 py-3 bg-white border border-ink/20 text-ink text-sm focus:outline-none focus:border-ochre transition-colors';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs uppercase tracking-widest text-charcoal">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="admin@atelier-h.fr"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs uppercase tracking-widest text-charcoal">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-earth text-cream text-sm font-medium tracking-wide border-2 border-earth hover:bg-earth-dark hover:border-earth-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}
