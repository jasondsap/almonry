# Almonry — marketing site

> Where generosity is kept.

The public one-page marketing site for **Almonry**, stewardship software for
community nonprofits. This is a standalone repo, separate from the Advancement
Platform app. Next.js 16 (App Router) + TypeScript, no CSS framework — the
design is hand-written CSS ported from `docs/almonry-landing-v2.html`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in the values to exercise the
early-access form locally:

```
RESEND_API_KEY=          # Resend API key
RESEND_FROM_FALLBACK=    # sender until almonry.app is verified, e.g. hello@made180.com
NOTIFY_EMAIL=            # where access requests are delivered
```

## What's here

- `app/page.tsx` — the landing page (ported verbatim from the reference HTML)
- `app/globals.css` — the brand stylesheet (fonts wired via `next/font` CSS vars)
- `app/layout.tsx` — fonts (Fraunces, Newsreader, Inter), metadata, OG tags
- `app/icon.svg`, `app/opengraph-image.tsx` — favicon + social card (the Ledger Arch mark)
- `components/RequestForm.tsx` — the "Request early access" form (the one piece of real functionality)
- `components/Reveal.tsx` — scroll-reveal observer
- `app/api/request-access/route.ts` — POST handler; emails the request via Resend

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo. Framework auto-detects
   as Next.js; no build config needed.
3. Add the three env vars above under **Settings → Environment Variables**.
4. Deploy. The preview URL should render identically to the reference HTML.

### Domain

In Vercel → **Settings → Domains**, add `almonry.app`. Vercel shows the DNS
records (an A record and/or CNAME) to add at the registrar. SSL is automatic.
