'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL: FormData = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Erreur serveur');
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
      setErrorMsg("Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.");
    }
  };

  const inputClass =
    'w-full font-body text-sm px-4 py-3 bg-transparent border border-ink/20 text-ink placeholder:text-mist focus:outline-none focus:border-ochre transition-colors';

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-4 p-8 border border-ochre/30 bg-ochre/5 text-center">
        <span className="text-3xl">✦</span>
        <h3 className="font-display text-xl font-semibold text-earth">
          Message envoyé !
        </h3>
        <p className="font-body text-sm text-charcoal">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="font-body text-sm text-earth underline-offset-2 hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-body text-xs uppercase tracking-widest text-charcoal">
            Nom *
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            className={inputClass}
            placeholder="Votre nom"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-body text-xs uppercase tracking-widest text-charcoal">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            className={inputClass}
            placeholder="votre@email.fr"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="font-body text-xs uppercase tracking-widest text-charcoal">
          Sujet
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={update('subject')}
          className={inputClass}
        >
          <option value="">Choisir un sujet</option>
          <option>Information sur les ateliers</option>
          <option>Réservation</option>
          <option>Tarifs</option>
          <option>Autre</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-body text-xs uppercase tracking-widest text-charcoal">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={update('message')}
          className={`${inputClass} resize-none`}
          placeholder="Votre message..."
        />
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="earth"
        size="lg"
        disabled={status === 'sending'}
        className="self-start"
      >
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
      </Button>
    </form>
  );
}
