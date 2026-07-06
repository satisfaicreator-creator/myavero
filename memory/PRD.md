# Avero — PRD

## Original problem statement
Build a complete, production-ready, ultra-modern website for Avero, a premium web design & development company. Tagline "We Design. You Grow." 48-hour delivery, starting ₹2,999. Dark futuristic neon-tech theme. Convert visitors into WhatsApp / call / form leads. Position Avero as a modern IT studio expanding into AI marketing, AI ads, model fine-tuning and trainings.

## Approved architecture
- React 19 (CRA + craco) + Tailwind + shadcn/ui + Framer Motion (hybrid CSS 3D scene)
- **Local preview**: FastAPI + MongoDB (Motor) at `/app/backend/server.py`
- **Production (Vercel)**: React + Vercel Serverless Functions at `/app/frontend/api/` + MongoDB Atlas
- **Chatbot**: 100% rule-based, zero API cost (OpenAI removed)
- Resend for lead email notifications
- JWT-secured admin dashboard

## User personas
- Local business owner (salon, cafe, CA, wholesale) needing a trustworthy website — English or Hindi
- Startup founder needing premium 3D brand website
- Ecommerce brand needing product/catalogue site
- Avero admin managing enquiries + site content

## Core requirements
- Contact form always creates MongoDB record (email is fire-and-forget via Resend)
- Rule-based chatbot with Avero FAQ intents (SSE streaming)
- Portfolio labelled as "Live Demo Concepts", never as clients
- Blog & default settings idempotently seeded on backend startup
- i18n falls through to English if Hindi key missing
- Admin can update pricing / offer / announcement bar / features list live from dashboard

## Implemented

### Iteration 1 (2026-07-05)
Landing (16 sections), AI chatbot (SSE), Admin login/dashboard, Resend emails, SEO meta + basic JSON-LD.

### Iteration 2
Hero "Coming Soon" strip with rotating AI stack, viral MemeSection (before/after slider + SVG characters), Laptop3D (3 content tabs), Roadmap section, single ₹2,999 Mega Offer, portfolio real screenshots (mshots), positioning to "modern IT studio".

### Iteration 3
- Blog / Case Studies: `/blog`, `/blog/:slug`, landing preview section, 4 seeded case studies with body_html + mshots covers.
- Hindi language toggle: EN/HI in header + mobile drawer, localStorage + `?lang=hi` query.
- Complete SEO: robots.txt, sitemap.xml, canonical, hreflang (en/hi/x-default), OG/Twitter tags, 5 JSON-LD blocks on landing + Article JSON-LD per blog post.

### Iteration 4 – Vercel migration
- Migrated backend logic to Vercel Serverless Functions in `/app/frontend/api/`.
- Removed OpenAI SDK / Emergent LLM key. Chatbot rewritten as rule-based streaming (`_lib/responder.js`).
- Added chunked `/api/blog/[slug].js`, `/api/admin/*.js`, `/api/enquiries.js`, `/api/chat.js`.

### Iteration 5 – 2026-07-06 (this session)
- **Header styling fix**: Reduced desktop nav from 9 to 7 items (removed Process + 3D Sites), added `whitespace-nowrap`, compact logo (no tagline) in header, breathing spacing between LanguageToggle + WhatsApp + Start Project buttons. Verified single-row layout at 1024 / 1280 / 1440.
- **Admin site settings**: Live-editable pricing, offer copy, announcement marquee, features list. New endpoints:
  - `GET /api/settings` (public, no auth)
  - `GET /api/admin/settings` (JWT)
  - `PUT /api/admin/settings` (JWT)
  - Implemented in both FastAPI (`/app/backend/server.py`) AND Vercel serverless (`/app/frontend/api/settings.js`, `/app/frontend/api/admin/settings.js`, `_lib/settings.js`).
  - Idempotent seed on first read.
- **Frontend settings integration**: `SettingsProvider` in `/app/frontend/src/lib/settings.jsx`. Pricing.jsx + AnnouncementBar.jsx consume settings.
- **Admin dashboard tabs**: `Enquiries` + `Site Settings` sections with lists, add/remove, live save + toast confirmation.
- **Vercel 404 fix**: Simplified rewrite pattern in both `/app/vercel.json` and `/app/frontend/vercel.json` to `{ source: "/((?!api/).*)", destination: "/index.html" }` (fixes `/admin/login` returning 404 on Vercel).
- **End-to-end lead flow verified**: form → MongoDB → admin dashboard (13+ test enquiries stored & displayed, status transitions PATCH working).

Testing: 5/5 iterations at 100% backend (21/21 pytest) + 100% frontend.

## Data models
- **enquiries**: `{ id, full_name, phone, business_name, business_type, website_type, budget, timeline, message, source, status, created_at }`
- **admins**: `{ id, email, password_hash, created_at }`
- **blog_posts**: `{ slug, title, excerpt, body_html, cover_image, date, author }`
- **settings**: `{ key: "site", starting_price, original_price, save_percent, slots_left, delivery, offer_title, offer_tagline, guarantee_note, announcement_items[], features[], updated_at }`

## Backlog
- P1: Verify sender domain in Resend for high deliverability
- P1: Delete deprecated FastAPI at /app/backend once fully committed to Vercel serverless
- P2: Real client testimonials (once permissions received)
- P2: One-click WhatsApp follow-up template button in admin dashboard
- P2: Rate limiting on `/api/enquiries` and `/api/chat`
- P2: Live push settings via WebSocket / polling so landing updates without full reload
- P2: Pydantic StatusUpdate model for PATCH enquiry status validation
- P3: Split server.py into routers/ (blog, admin, chat, settings)
- P3: react-helmet-async for cleaner meta management
- P3: AI Marketing / AI Ads real service pages (currently teased in Coming Soon strip)
