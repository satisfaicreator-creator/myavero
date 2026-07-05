# Avero — PRD

## Original problem statement
Build a complete, production-ready, ultra-modern website for Avero, a premium web design & development company. Tagline "We Design. You Grow." 48-hour delivery, starting ₹2,999. Dark futuristic neon-tech theme. Convert visitors into WhatsApp / call / form leads. Position Avero as a modern IT studio expanding into AI marketing, AI ads, model fine-tuning and trainings.

## Approved architecture
- React 19 (CRA + craco) + Tailwind + shadcn/ui + Framer Motion (hybrid CSS 3D scene)
- FastAPI + MongoDB (Motor)
- Emergent Universal LLM key (OpenAI `gpt-4o-mini`) for AI chatbot (SSE streaming)
- Resend for lead email notifications
- JWT-secured admin dashboard

## User personas
- Local business owner (salon, cafe, CA, wholesale) needing a trustworthy website — English or Hindi
- Startup founder needing premium 3D brand website
- Ecommerce brand needing product/catalogue site
- Avero admin managing enquiries

## Core requirements (static)
- Contact form always creates MongoDB record (email is fire-and-forget)
- Chatbot on Emergent LLM key with Avero-specific system prompt
- Portfolio labelled as "Live Demo Concepts", never as clients
- No promise of #1 SEO ranking
- Blog is idempotently seeded on backend startup
- i18n falls through to English if Hindi key missing

## Implemented — 2026-07-05 → 2026-07-06
### Iteration 1
Landing (16 sections), AI chatbot (SSE), Admin login/dashboard, Resend emails, SEO meta + basic JSON-LD.

### Iteration 2
Hero "Coming Soon" strip with rotating AI stack, viral MemeSection (before/after slider + SVG characters), Laptop3D (3 content tabs), Roadmap section, single ₹2,999 Mega Offer, portfolio real screenshots (mshots), positioning to "modern IT studio".

### Iteration 3 (current)
- **Blog / Case Studies**: `/blog`, `/blog/:slug`, landing preview section, 4 seeded case studies with body_html + mshots covers.
- **Hindi language toggle**: `EN/HI` in header + mobile drawer. Persists in localStorage, respects `?lang=hi` query. Translates hero + nav + coming-soon strip + blog headers.
- **Complete SEO**: robots.txt, sitemap.xml, canonical, hreflang (en/hi/x-default), OG/Twitter tags, 5 JSON-LD blocks on landing (Organization / WebSite / ProfessionalService+Offer / FAQPage / BreadcrumbList) + Article JSON-LD per blog post.

Testing: 3/3 iterations at 100% backend + 100% frontend.

## Backlog
- P1: Verify sender domain in Resend for high deliverability
- P2: Real client testimonials (once permissions received)
- P2: One-click WhatsApp follow-up template button in admin dashboard
- P2: Rate limiting on `/api/enquiries` and `/api/chat`
- P3: Split server.py into routers/ (blog, admin, chat)
- P3: react-helmet-async for cleaner meta management
