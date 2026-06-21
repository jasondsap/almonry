# Almonry Marketing Site — Feature Update Spec

Goal: bring the one-page marketing site (`app/page.tsx`) in line with what the
Advancement Platform now actually does. **Additive only** — reuse the existing
design system (CSS classes in `globals.css`: `.eyebrow`, `.does-row`, `.pillar`,
`.cat`, `.section-head`, etc.), fonts, colors, and voice. No redesign. Anything
that would change the visual language gets flagged, not assumed.

## Voice guardrails (unchanged)
- "Where generosity is kept." The almoner who *received* gifts, *recorded* them,
  and *kept faith* with donors — including keeping up the correspondence.
- Warm, plainspoken, for small-budget community nonprofits. No enterprise jargon,
  no per-seat-fee framing, no apologies.
- Only claim what's real. SMS / events / peer-to-peer / auction exist in the
  product (deployment flags gate them per org) — fine to market as capabilities.

## What the site says today vs. what's shipped
Site today: online giving (one-time + monthly), auto receipts, donor ledger +
lapse reports, funds/campaigns. Shipped but unmentioned: **donor outreach
(email/SMS/mail), fundraising pages + events + peer-to-peer + auctions, the Dori
AI assistant, pledges, year-end statements, QuickBooks export, per-org branding
on giving pages + receipts.**

## Changes (section by section)

### 1. Hero subhead + note (`.subhead`, `.hero-note`)
Broaden the one-liner so it names the three pillars of the real product without
bloating. Draft:
- subhead: **"Donor management, online giving, fundraising pages, and donor
  outreach — built for community nonprofits, not enterprise budgets."**
- hero-note: **"Online giving · Fundraising pages & events · Email, text &
  mail outreach · No per-seat fees"**

### 2. Keep the 3 pillars (`.pillar-grid`) — light copy tweak only
Faithful / Warm / Within reach stay. Under **Warm**, add a clause that nods to
outreach ("…and reach them like you actually know them — by email, text, or a
letter in the mail."). No structural change.

### 3. Expand "What it does" (`.does-row`) from 3 → 6 rows
Keep the existing three (donations log themselves · lapse-aware ledger ·
campaigns). Add three new rows in the same alternating-visual format:

- **Outreach — "Keep up the correspondence."**
  Reach donors by **email, text, or printed letter** from one place. Pick who
  hears from you (everyone, or just donors to a fund), drop in their name and
  details, and send. Unsubscribe + consent handled for you (CAN-SPAM / TCPA).
  *Visual:* a small email/SMS mock (reuse `.vis` card; a "To: lapsed donors" +
  open-rate line).

- **More ways to raise — "A page for every appeal."**
  Spin up a **donation form or fundraising page** in minutes; run **events with
  tickets**, let supporters fundraise for you **peer-to-peer**, or hold an
  **online auction** — all feeding the same donor records and goal bars.
  *Visual:* a goal bar + a "🎟 2 tickets" / "🔨 high bid" chip row.

- **Dori, the assistant — "Ask your data a question."**
  Type a plain-English question ("who lapsed since last year and gave to the
  Village fund?") and get an answer — and let Dori draft warm, specific
  thank-yous. *Visual:* a tiny chat bubble mock.

### 4. New section: "Everything in one place" (capability grid)
A compact grid AFTER "what it does" and BEFORE "who it's for", so the narrative
rows stay tight while the page still conveys real depth. ~12 short items, grouped:
- **Give:** one-time & monthly · pledges · tributes (in honor/memory) ·
  matching-gift capture · cover-the-fees
- **Steward:** donor records & households · soft credits · funds, campaigns &
  appeals · LYBUNT/SYBUNT lapse reports
- **Receipt & report:** instant tax receipts · year-end giving statements ·
  QuickBooks export
- **Reach & raise:** email / text / mail outreach · fundraising pages, events,
  peer-to-peer, auctions · the Dori assistant
*Implementation:* a new `.features` section reusing the bordered-grid look of
`.pillar-grid` (small new CSS, same border/parchment tokens — flag for approval).

### 5. New section (short): "Your name on every gift"
One band on the per-org branding / quiet white-label angle: each org's **logo
and colors** appear on its giving pages and tax receipts; donors see the
nonprofit, not Almonry. Reuse the `.forwhom` band style. Draft headline:
**"Donors give to you — so your name is the one they see."**

### 6. Category strip + "Who it's for" — unchanged
Still accurate. Leave as-is.

### 7. Request form / footer — unchanged
`RequestForm` + `/api/request-access` stay. Footer stays.

## CSS notes
- Reuse existing classes everywhere possible. Two small additions, both built
  from existing tokens (parchment/brass/oxblood borders), to flag for approval:
  `.features` grid (capability grid) and minor chip styles for the new `.vis`
  mocks. No new fonts, no new colors, no layout system change.

## Out of scope (v1)
Pricing page, blog, screenshots/product tour, customer logos, analytics, CMS.
(Worth a later pass once there are real screenshots — note for the backlog.)

## Build note
All edits land in `app/page.tsx` (+ a few lines in `globals.css`). Stop after the
"what it does" rows for a copy review before the capability grid, since that's
the largest new block.
