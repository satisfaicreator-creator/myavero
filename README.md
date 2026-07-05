# Avero — Premium Website Development Agency

Production-ready full-stack marketing site + admin dashboard + AI chatbot for Avero.

**Tagline:** We Design. You Grow.
**Website:** https://theavero.dev
**Promise:** Website delivery in 48 hours · Starting ₹2,999

## Stack
- React 19 + Tailwind + Framer Motion + shadcn/ui
- FastAPI + MongoDB (Motor async)
- Emergent Universal LLM key (OpenAI gpt-4o-mini) for the AI chatbot
- Resend for enquiry email notifications
- JWT auth for admin dashboard

## Structure
```
/app/backend/server.py           # All /api routes
/app/frontend/src/pages/         # Landing / AdminLogin / AdminDashboard
/app/frontend/src/components/site/  # All landing sections + chatbot
```

## Routes (frontend)
- `/`            — Landing page
- `/admin/login` — Admin login (seeded from ADMIN_EMAIL/ADMIN_PASSWORD in backend/.env)
- `/admin`      — Enquiry dashboard

## API endpoints
- `POST /api/enquiries` — public lead capture
- `POST /api/admin/login` — returns JWT
- `GET  /api/admin/enquiries` — auth required
- `GET  /api/admin/stats` — auth required
- `PATCH /api/admin/enquiries/{id}` — update status (new / contacted / closed)
- `POST /api/chat` — SSE streaming AI chat

## Admin (seeded)
- Email: `admin@theavero.dev`
- Password: `Avero@2999`
See `/app/memory/test_credentials.md`.

## Environment
See `/app/backend/.env` — do **not** delete existing keys. The following must remain populated:
`MONGO_URL`, `DB_NAME`, `EMERGENT_LLM_KEY`, `RESEND_API_KEY`, `SENDER_EMAIL`, `ADMIN_RECIPIENT_EMAIL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

## Contact
- WhatsApp: https://wa.me/919680816234
- Email: satisfaicreator@gmail.com
