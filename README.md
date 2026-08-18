# 6STANZA — Full-Stack Website

A real Next.js 14 app: React frontend + server-side API backend + a real Postgres
database via Supabase.

## What's actually here

- **Frontend** — Next.js App Router, React components, cinematic scroll animations
  (GSAP + ScrollTrigger): pinned hero, horizontal "Six S" filmstrip, sequential process
  reveal, crossfading vision section, branded loading screen.
- **Backend** — a real API route at `app/api/inquiries/route.js`:
  - `POST /api/inquiries` — validates and saves a "Start a Project" submission.
  - `GET /api/inquiries` — returns all submissions, protected by an admin key.
- **Database** — Supabase (hosted Postgres). Data is stored in a real `inquiries`
  table, not a file. See setup below.
- **Admin dashboard** — `/admin` — enter your admin key to view every submission that
  came through the site.

## One-time setup: Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql` from this repo, and run it. This creates the `inquiries`
   table.
3. Go to **Settings → API** in your Supabase project and copy:
   - **Project URL**
   - **service_role key** (not the `anon` key — the service role key is required
     because it's the one used server-side to read/write; it's never sent to the
     browser, so it's safe to use here)
4. Copy `.env.local.example` to `.env.local` and fill in:
   ```
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ADMIN_SECRET=choose-your-own-password
   ```

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Submit the "Start a Project" form, then check
http://localhost:3000/admin (enter your `ADMIN_SECRET`) to see it show up — it's
really being saved in your Supabase database at this point, you can also see it live
in the Supabase dashboard under **Table Editor → inquiries**.

If `.env.local` isn't filled in yet, the form and admin page will still load, but
submitting or viewing data will return a clear error telling you Supabase isn't
configured yet — nothing crashes silently.

## Project structure

```
app/
  page.js                 → homepage, assembles all sections
  layout.js                → fonts + metadata + loader
  globals.css              → design system (colors, type, layout)
  admin/page.js             → password-gated dashboard for inquiries
  api/inquiries/route.js    → backend API (POST to save, GET to list)
components/                 → Nav, Hero, SixS, About, Capabilities, Process, Vision,
                              Trust, ContactForm, Footer, SocialLinks, WhatsAppFloat,
                              Loader, MotionController (GSAP)
lib/
  db.js                     → Supabase data layer (insert/select on `inquiries`)
  socialLinks.js             → your Facebook/Instagram/TikTok/LinkedIn/WhatsApp URLs
supabase/schema.sql          → run once in Supabase's SQL Editor
public/logo.webp, logo-hero.webp → your logo, cleaned up and optimized
```

## Honest limitations, so nothing surprises you

- **No email notifications yet.** There's a comment in the API route showing where
  to add one (e.g. with [Resend](https://resend.com) or SendGrid) so your team gets
  pinged the moment someone submits the form, instead of only checking `/admin`.
- **Admin auth is a single shared password**, fine for a small team, not real
  per-person accounts. For that, upgrade to Supabase Auth or NextAuth later.
- **No CMS, blog, portfolio/case-study database, or client portal yet** — natural
  next phases once this foundation is live (your original blueprint's Module 9 and
  "Future Platform" section).
- **Social links are placeholders** (`lib/socialLinks.js`) — drop your real profile
  URLs in there whenever you have them.

## Deploying

- **Frontend + API routes:** [Vercel](https://vercel.com) — connect the GitHub repo,
  it deploys automatically. This now works correctly on Vercel (the old file-based
  storage didn't, Supabase does).
- In Vercel's project settings, add the same three environment variables
  (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SECRET`) under
  **Settings → Environment Variables**.
- **Custom domain:** point your domain at Vercel once deployed.
