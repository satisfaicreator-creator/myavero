# Avero — PRD

## Original problem statement
Build a complete, production-ready, ultra-modern website for Avero, a premium web design & development company. Tagline "We Design. You Grow." Promise 48-hour website delivery, starting ₹2,999. Dark futuristic neon-tech theme. Convert visitors into WhatsApp / call / form / booking leads.

## Approved architecture (2026-07-05)
- React 19 (CRA + craco) + Tailwind + shadcn/ui + Framer Motion (hybrid CSS 3D scene, not full Three.js — user pick)
- FastAPI + MongoDB (Motor)
- Emergent Universal LLM key (OpenAI `gpt-4o-mini`) for AI chatbot (SSE streaming)
- Resend for lead email notifications to satisfaicreator@gmail.com
- JWT-secured admin dashboard

## User personas
- Local business owner (salon, cafe, CA, wholesale) needing a quick, trustworthy website
- Startup founder needing premium 3D-tier brand website
- Ecommerce brand needing product/catalogue site
- Avero admin (satisfaicreator@gmail.com) managing enquiries

## Core requirements (static)
- Contact form must always create a MongoDB record even if email fails.
- Chatbot must run on Emergent LLM key with a system prompt encoding Avero facts.
- Portfolio labelled as "Live Demo Concepts" — never as clients.
- Never promise guaranteed #1 SEO ranking.

## What's been implemented — 2026-07-05
- Landing page (announcement bar marquee, sticky glass header, 3D-style hero with animated headline, before/after problem, 12 services, 48-hour delivery timeline, 4 portfolio demo cards, 3D showcase, 14 industries, 3 pricing tiers, 12 why-Avero, before/after summary, lead-gen dashboard visual, AI section, contact form with 11 fields, FAQ, footer, sticky mobile CTA bar)
- Live AI chatbot (bottom-right widget) with SSE streaming
- Admin login + dashboard with stats + status transitions
- Resend email on enquiry submission (async / non-blocking)
- Auto-seeded admin from env vars
- SEO meta + JSON-LD ProfessionalService structured data
- Passes both backend and frontend testing agent (100% success rate)

## Backlog / next tasks
- P1: Verified custom sender email (SENDER_EMAIL) via Resend domain verification for higher deliverability
- P1: Portfolio card real screenshots (currently gradient placeholders)
- P2: Blog / case study section
- P2: Ecommerce package sub-page for detailed product-website features
- P2: Multi-language (Hindi) toggle for local business owners
- P3: Testimonials once real client permissions received
- P3: Rate limiting on /api/enquiries and /api/chat
