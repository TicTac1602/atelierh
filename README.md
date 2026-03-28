# Atelier H — Site officiel

Website for the painting & arts workshop **Atelier H**.
Built with **Next.js 16** (App Router) · **Tailwind CSS v4** · **Framer Motion** · **Supabase** · deployed on **Vercel**.

---

## Quick start (local dev)

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in your env vars
cp .env.local.example .env.local
# → Edit .env.local with your Supabase keys

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon / public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API → service_role (**keep secret**) |
| `NEXT_PUBLIC_SITE_URL` | Your production URL, e.g. `https://atelier-h.vercel.app` |

---

## Supabase setup (one-time)

### 1 — Create a Supabase project
Go to [supabase.com](https://supabase.com), create a free project and note your URL + keys.

### 2 — Run the migration SQL
In Supabase Dashboard → **SQL Editor**, paste and run the contents of:

```
supabase/migrations/001_images.sql
```

This creates the `images` table, RLS policies, the `gallery` storage bucket, and storage policies.

### 3 — Create admin accounts
Go to Supabase Dashboard → **Authentication → Users → Invite user**.
Create 2 accounts (one per admin). They will use email + password to log in at `/admin/login`.

---

## Deployment on Vercel

1. Push the project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. In **Environment Variables**, add all four variables from the table above.
4. Click **Deploy**. That's it.

> The site is fully static (SSG) for public pages. Only admin pages run dynamically.
> Images are served from Supabase Storage CDN.

---

## Project structure

```
app/
  (public)/          Public routes (/, /atelier, /galerie, /contact)
  admin/             Protected admin routes (login, dashboard, upload)
  api/contact/       Contact form API route (placeholder — add email provider here)
  globals.css        Tailwind v4 theme tokens (@theme {})
  layout.tsx         Root layout (fonts, html lang)
  sitemap.ts         Auto-generated sitemap
  robots.ts          robots.txt (blocks /admin)

components/
  layout/            Header, MobileMenu, Footer
  ui/                Button, SectionTitle, Tag
  home/              HeroSection (+ sub-components), AboutSection, FeaturedWorks, CtaSection
  atelier/           AtelierHero, AtelierLocation, AtelierSchedule, AtelierPricing, AtelierValues
  gallery/           GalerieClient, GalleryGrid, GalleryCard, Lightbox, LightboxNav, CategoryFilter, YearFilter
  contact/           ContactForm, ContactInfo
  admin/             LoginForm, DashboardClient, ImageTable, ImageRow, DeleteModal, EditModal,
                     UploadForm, UploadPreview, UploadProgress

lib/
  supabase/client.ts   Browser Supabase client
  supabase/server.ts   Server Supabase client (uses cookies)
  utils/images.ts      getPublicUrl / uploadImage / deleteImage helpers

middleware.ts          Edge middleware — protects /admin/* routes
types/index.ts         GalleryImage type, ImageCategory enum, CATEGORIES constant
supabase/migrations/   SQL migration files
```

---

## Adding a real email provider to the contact form

Open `app/api/contact/route.ts`. Find the `// TODO` comment and replace it with your provider:

**Option A — Resend (recommended, free 100/day)**
```bash
npm install resend
```
```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: 'Atelier H <contact@atelier-h.fr>',
  to: 'admin@atelier-h.fr',
  subject: `[Contact] ${body.subject ?? 'Nouveau message'}`,
  html: `<p><b>${body.name}</b> (${body.email})</p><p>${body.message}</p>`,
});
```

---

## Gallery categories

`Peinture` · `Aquarelle` · `Acrylique` · `Pastel` · `Artisanat`

To add or rename a category:
1. Update the `CHECK` constraint in the SQL migration.
2. Update `CATEGORIES` in `types/index.ts`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
