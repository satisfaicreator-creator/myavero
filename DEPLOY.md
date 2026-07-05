# Avero — Vercel-Only Deployment Guide

Everything (frontend + backend + database connection) is deployed to **Vercel only**.
The FastAPI folder at `/app/backend` is now optional (used only for local development inside Emergent).
Production runs on **Vercel Serverless Functions** in `/app/frontend/api/`.

## Architecture
```
Vercel project (root: frontend/)
├── src/            # React (CRA) — served as static site + SPA
├── build/          # Compiled output
└── api/            # Serverless Node.js functions (auto-deployed)
     ├── enquiries.js
     ├── blog.js
     ├── blog/[slug].js
     ├── admin/login.js
     ├── admin/enquiries.js
     ├── admin/enquiries/[id].js
     ├── admin/stats.js
     ├── chat.js         (SSE streaming OpenAI chat)
     └── index.js        (health check)
```
No separate Render / Railway / FastAPI hosting required.

## Step 1 — MongoDB Atlas
1. https://www.mongodb.com/cloud/atlas/register — sign up, create free M0 cluster (AWS Mumbai `ap-south-1` is closest to India).
2. Database Access → create user `avero_admin` + auto-generated password. Save the password.
3. Network Access → add IP `0.0.0.0/0` (Vercel uses dynamic IPs).
4. Connect → Drivers → copy the connection string. Replace `<password>` with the real password.
   You now have your `MONGO_URL`, e.g.:
   ```
   mongodb+srv://avero_admin:XXXXXXXX@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 2 — Push repo to GitHub
Commit the entire `/app` folder to a GitHub repo. Both `vercel.json` files (repo root + `/frontend`) are included.

## Step 3 — Import project into Vercel
1. https://vercel.com/new — import your GitHub repo.
2. **Root Directory** → click "Edit" → select `frontend`.
3. **Framework Preset** → Create React App (auto-detected from `vercel.json`).
4. Click **Deploy**. First deploy will fail because env vars are missing — that's expected.

## Step 4 — Add environment variables in Vercel
Project Settings → Environment Variables. Add these **9 variables** (apply to Production, Preview, Development):

| Key | Example value | Where to get it |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://avero_admin:pw@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority` | From Step 1 |
| `DB_NAME` | `avero_prod` | Any name |
| `OPENAI_API_KEY` | `sk-proj-...` | https://platform.openai.com/api-keys (adds ~$0.15 per 1M tokens on gpt-4o-mini — very cheap) |
| `OPENAI_MODEL` | `gpt-4o-mini` | Any OpenAI chat model |
| `RESEND_API_KEY` | `re_...` | https://resend.com → API Keys |
| `SENDER_EMAIL` | `no-reply@theavero.dev` | Must verify domain in Resend first, or use `onboarding@resend.dev` |
| `ADMIN_RECIPIENT_EMAIL` | `satisfaicreator@gmail.com` | Your inbox |
| `JWT_SECRET` | a random 32+ char string | Generate: `openssl rand -hex 32` |
| `ADMIN_EMAIL` | `admin@theavero.dev` | Auto-seeded on first API call |
| `ADMIN_PASSWORD` | strong password | Auto-seeded (change from `Avero@2999` for prod) |

**Do NOT set** `REACT_APP_BACKEND_URL` — leaving it empty makes the frontend call `/api/*` on the same Vercel domain (which is exactly what we want).

## Step 5 — Redeploy
Deployments tab → three-dot on last deploy → **Redeploy** → uncheck "Use existing build cache" → Redeploy.

## Step 6 — Verify
Open your Vercel URL and check:
- `https://YOUR-VERCEL-URL.vercel.app/` → landing page loads
- `https://YOUR-VERCEL-URL.vercel.app/api/` → `{"service":"avero","status":"ok","runtime":"vercel-serverless"}`
- Submit contact form → check MongoDB Atlas → **Browse Collections** → `avero_prod.enquiries` → your enquiry is there
- Log in at `/admin/login` with `admin@theavero.dev` / `Avero@2999` → dashboard shows enquiry
- Send message in the chatbot → streaming response
- Email hits `satisfaicreator@gmail.com` (check spam if using `onboarding@resend.dev`)

## Step 7 — Custom domain
1. Vercel → Project → Settings → Domains → add `theavero.dev`.
2. Add the DNS records Vercel gives you at your domain registrar.
3. HTTPS auto-provisions.

## Free-tier limits to know
- **Vercel Hobby**: serverless function invocation duration 10s (fine for enquiries, blog, admin). Chat streaming works within 10s for short replies.
- **MongoDB Atlas M0**: 512 MB storage, shared CPU. Plenty for 100k+ enquiries.
- **OpenAI**: pay as you go — gpt-4o-mini is ~$0.15 per 1M input tokens. Budget $5/month covers ~30k chat replies.
- **Resend Free**: 100 emails/day, 3,000/month. Enough unless you're getting >100 leads/day.

Upgrade Vercel to Pro ($20/mo) later if:
- Chatbot replies get cut off at 10s
- Cold-start latency is annoying

## Local development (optional — Emergent env)
Keep `/app/backend/` for local dev. It's a FastAPI clone of the same endpoints. `REACT_APP_BACKEND_URL` in `frontend/.env` points to the local FastAPI. Delete `/app/backend/` and `/app/render.yaml` before pushing to production if you want a clean repo — but Vercel ignores them anyway (project root is `frontend/`).

---

# SEO checklist — do this after deploy
1. Verify `https://theavero.dev` in Google Search Console → paste token into `google-site-verification` meta.
2. Verify in Bing Webmaster Tools → paste token into `msvalidate.01`.
3. Submit `https://theavero.dev/sitemap.xml` in Search Console.
4. Create Google Business Profile (biggest local-SEO win).
5. Publish 1 blog post/week targeting long-tail keywords ("48-hour website for CA firm", "affordable ecommerce website Jaipur", etc.)
6. Get backlinks from Clutch / GoodFirms / DesignRush / LinkedIn / Quora.
