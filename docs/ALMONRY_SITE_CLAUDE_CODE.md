# Claude Code — Build the Almonry Marketing Site (Next.js → Vercel)

Goal: turn the static `almonry-landing-v2.html` into a clean Next.js App Router project that deploys to Vercel, with a working "Request early access" form. This is a **separate repo** from the Advancement Platform app — it's just the public marketing site.

## Context
- Brand: **Almonry** — "Where generosity is kept." Stewardship software for community nonprofits.
- Domain: `almonry.app` (will point at Vercel).
- A reference HTML file is in the repo root: `almonry-landing-v2.html`. It is the source of truth for design, copy, colors, fonts, and layout. Reproduce it faithfully.

## Stack
- Next.js 15 (App Router), TypeScript
- No CSS framework needed — port the existing CSS as-is (global stylesheet or CSS modules). Do NOT redesign.
- Fonts: Fraunces, Newsreader, Inter — load via `next/font/google` (not the `<link>` tags), so they're optimized and self-hosted.
- Deploys to Vercel (zero config).

## Build steps (stop after each for review)

1. **Scaffold:** `npx create-next-app@latest almonry-site --typescript --app --no-tailwind --no-src-dir --eslint`. Confirm it runs with `npm run dev`.

2. **Port the page:** Convert `almonry-landing-v2.html` into `app/page.tsx`.
   - Move the `<style>` block into `app/globals.css` verbatim (the CSS variables, all selectors). Keep it exactly — colors and spacing are deliberate.
   - Replace the Google Fonts `<link>` with `next/font/google` imports for Fraunces, Newsreader, Inter; wire their CSS variables in `app/layout.tsx` so `font-family:'Fraunces'` etc. still resolve. (Map each to a `--font-*` var and update the CSS to use them, OR keep the literal family names by setting the font `variable` + `display:swap` and referencing the family — pick the cleaner path and tell me which.)
   - Convert inline `style="..."` attributes in the receipt/campaign visuals to JSX `style={{}}` objects or move them into `globals.css` classes (preferred — cleaner).
   - Convert the IntersectionObserver scroll-reveal script into a small client component (`'use client'`) using `useEffect`, or a tiny `components/Reveal.tsx` wrapper. Keep the reduced-motion handling.
   - Preserve all `id` anchors (#what, #why, #story, #request) and smooth scroll.

3. **Metadata + favicon:**
   - Set `metadata` in `layout.tsx`: title "Almonry — Where generosity is kept", description matching the subhead, Open Graph tags (title, description, type=website, url=https://almonry.app), and a theme-color of `#F2EBDC`.
   - Generate a favicon from the Ledger Arch SVG (the two-pages-and-keystone mark). Add `app/icon.svg` and an `app/apple-icon.png`.
   - Add an OG image (`app/opengraph-image.tsx` using `next/og` ImageResponse) — parchment background, the wordmark, the tagline. Keep it on-brand.

4. **"Request early access" form (the one piece of real functionality):**
   - Replace the `#request` CTA buttons so they open a simple form (inline section or a modal): fields = Name, Organization, Email, optional "What are you using now?".
   - On submit, POST to a route handler `app/api/request-access/route.ts` that sends an email via **Resend** to Jason (notification) and optionally a confirmation to the requester. Reuse the Resend pattern from the Advancement Platform (`RESEND_API_KEY`, a verified from-domain; until `almonry.app` is verified in Resend, use the fallback sender).
   - No database needed for v1 — email is enough. Validate fields server-side; return a friendly success/error message in the interface's voice (no apologies, tell them what happened).
   - Honeypot field + basic rate-limit guard against spam.

5. **Quality floor:** responsive down to mobile (the CSS already has breakpoints — verify), visible keyboard focus states on nav/buttons/inputs, `prefers-reduced-motion` respected, semantic landmarks (`<header> <main> <section> <footer>`), alt/aria on the SVG marks. Lighthouse pass for accessibility + performance.

6. **Deploy:** Initialize git, push to GitHub (`jasondsap`). Then Vercel: import the repo, framework auto-detects Next.js, add env var `RESEND_API_KEY` (and `RESEND_FROM_FALLBACK`), deploy. Confirm the preview URL renders identically to the reference HTML.

## Domain (manual, after deploy)
In Vercel → Project → Settings → Domains, add `almonry.app`. Vercel shows the DNS records (an A record or CNAME). Add those at the `almonry.app` registrar. SSL is automatic. (This step is Jason's to do in the registrar dashboard; Claude Code just needs to surface the records Vercel gives.)

## Env vars
```
RESEND_API_KEY=
RESEND_FROM_FALLBACK=   # e.g. hello@made180.com until almonry.app verified in Resend
NOTIFY_EMAIL=           # where access requests are sent (Jason's inbox)
```

## Do NOT
- Do not redesign or "improve" the visual design — port it faithfully. Any deviation must be flagged and approved.
- Do not add a CMS, blog, analytics, or auth. This is a one-page marketing site with a contact form.
- Do not pull in Tailwind or a component library. The CSS is hand-written and complete.

After step 1, show me the folder structure and confirm dev server runs before porting.
