import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Les champs nom, email et message sont obligatoires.' },
      { status: 422 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 422 });
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { error: 'Le message doit contenir au moins 10 caractères.' },
      { status: 422 }
    );
  }

  // TODO: Replace this placeholder with a real email provider:
  //   - Resend: https://resend.com  (npm install resend)
  //   - Nodemailer with SMTP credentials
  //   - Supabase Edge Function
  //
  // Example with Resend:
  //   import { Resend } from 'resend';
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ from: 'contact@atelier-h.fr', to: 'admin@atelier-h.fr', subject: ..., html: ... });

  console.log('[Contact form submission]', {
    name: name.trim(),
    email: email.trim(),
    subject: body.subject?.trim() ?? '—',
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
