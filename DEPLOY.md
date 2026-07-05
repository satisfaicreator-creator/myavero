# Avero — Full Deployment & SEO Guide

## 1. Where to deploy the FastAPI backend

You **cannot** deploy the FastAPI backend on Vercel — Vercel is for static/serverless (Next.js) apps.
Deploy the backend to one of these (all have free tiers):

### Option A — Render.com (recommended, easiest)
1. Go to https://render.com → sign up (GitHub login is fine).
2. Push this repo to GitHub if you haven't (the whole `/app` folder, or split backend into its own repo).
3. Click **New → Web Service** → connect your GitHub repo.
4. Render will auto-detect the `render.yaml` at repo root and pre-fill everything.
5. In the **Environment** tab, fill in the secrets that Render couldn't auto-generate (see env-var list below).
6. Click **Deploy**. In ~3 min you'll get a URL like `https://avero-backend.onrender.com`.
7. **This URL is what you paste into Vercel as `REACT_APP_BACKEND_URL`.**

### Option B — Railway.app
Similar flow — connect GitHub, Railway auto-detects Python, set env vars, deploy. URL like `https://avero-production.up.railway.app`.

### Option C — Fly.io
CLI-based: `fly launch` from `/app/backend`. Slightly more technical but cheap and global.

### Option D — DigitalOcean / AWS / your VPS
Only if you want full control. `uvicorn server:app --host 0.0.0.0 --port 8001` + a reverse proxy (nginx/Caddy).

## 2. MongoDB — where the leads live

The FastAPI backend uses MongoDB via the `MONGO_URL` env var. In your local Emergent env this is `mongodb://localhost:27017`. In production you need a hosted MongoDB.

### MongoDB Atlas (free tier — recommended)
1. Go to https://www.mongodb.com/cloud/atlas → sign up.
2. Create a **Free Shared Cluster** (M0 tier, 512 MB — plenty for lead capture).
3. Under **Database Access**, create a database user (username + password).
4. Under **Network Access**, add IP `0.0.0.0/0` (allow from anywhere — for Render/Railway).
5. Click **Connect → Drivers** → copy the connection string, it looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```
6. Paste this as `MONGO_URL` in Render's environment variables.
7. Set `DB_NAME=avero_prod` (any name — Atlas creates it on first write).

**Collections that will be created automatically** on first use:
- `admins` — the seeded admin account (`admin@theavero.dev`)
- `enquiries` — every lead-form submission
- `blog_posts` — the 4 seeded case studies
- `chat_messages` — chatbot conversation history

You don't need to create these manually. `seed_admin()` and `seed_blog()` run on backend startup and upsert idempotently.

## 3. All env vars — checklist

### Backend (Render / Railway) — 10 vars
| Key | Value / Example | Notes |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority` | From MongoDB Atlas |
| `DB_NAME` | `avero_prod` | Any name |
| `CORS_ORIGINS` | `https://theavero.dev,https://www.theavero.dev` | Comma-separated |
| `EMERGENT_LLM_KEY` | your Emergent Universal key | For AI chatbot |
| `RESEND_API_KEY` | your Resend key (starts `re_`) | For lead-email notifications |
| `SENDER_EMAIL` | `no-reply@theavero.dev` (verified in Resend) OR `onboarding@resend.dev` | Verified domain gives higher deliverability |
| `ADMIN_RECIPIENT_EMAIL` | `satisfaicreator@gmail.com` | Where lead emails are sent |
| `JWT_SECRET` | long random string (Render can auto-generate) | For admin JWT tokens |
| `ADMIN_EMAIL` | `admin@theavero.dev` | Auto-seeded on startup |
| `ADMIN_PASSWORD` | strong password (e.g. `Avero@2999` — change for prod) | Auto-seeded |

### Frontend (Vercel) — 1 var
| Key | Value | Notes |
|---|---|---|
| `REACT_APP_BACKEND_URL` | `https://avero-backend.onrender.com` (no trailing slash) | Points to the Render URL from step 1 |

## 4. Post-deploy checklist
- [ ] Add your custom domain `theavero.dev` in Vercel Domains → Vercel gives you DNS records → set them in your domain registrar (GoDaddy/Namecheap/Cloudflare).
- [ ] In Resend → **Domains** → verify `theavero.dev` — this unlocks sending from `no-reply@theavero.dev` (much better inbox delivery than `onboarding@resend.dev`).
- [ ] In Vercel env vars, set `REACT_APP_BACKEND_URL` to your Render URL, then redeploy.
- [ ] Visit `https://theavero.dev/admin/login` → test admin login.
- [ ] Submit a test lead form → confirm the enquiry appears in the dashboard AND you receive the email.

---

# SEO — What's done + what's still needed to rank #1 for "website development"

## ✅ Already implemented (technical SEO — the foundation)
| Item | Status |
|---|---|
| `<title>` optimized (Avero \| Premium Websites in 48 Hours · Starting ₹2,999) | ✅ |
| Meta description (keyword-rich, ~155 chars) | ✅ |
| Meta keywords | ✅ (deprecated by Google, but harmless) |
| Canonical link | ✅ |
| Open Graph (og:title, og:description, og:image, og:url, og:type, og:site_name, og:locale) | ✅ |
| Twitter Card (summary_large_image) | ✅ |
| hreflang alternates (en / hi / x-default) | ✅ |
| Search-engine verification meta placeholders (Google, Bing, Yandex) | ✅ (fill in tokens) |
| `robots.txt` | ✅ |
| `sitemap.xml` | ✅ (root, blog list, 4 blog posts) |
| JSON-LD: Organization | ✅ |
| JSON-LD: WebSite (with SearchAction) | ✅ |
| JSON-LD: ProfessionalService + Offer (₹2,999 INR) | ✅ |
| JSON-LD: LocalBusiness (with Jaipur/Rajasthan/India address) | ✅ (just added) |
| JSON-LD: FAQPage (5 Q&A — Google shows FAQ rich snippets) | ✅ |
| JSON-LD: BreadcrumbList | ✅ |
| JSON-LD: Article per blog post | ✅ |
| Semantic HTML5 (`<main>`, `<article>`, `<nav>`, `<h1>` unique) | ✅ |
| Mobile-first responsive | ✅ |
| Font preconnect + font-display: swap | ✅ |
| Alt text on all images | ✅ |
| Loading="lazy" on non-critical images | ✅ |
| SPA fallback for direct blog URLs (via vercel.json rewrite) | ✅ |
| Hindi language variant for local audience | ✅ |

## ⚠️ You need to do (SEO admin tasks — free but manual)
1. **Google Search Console** — https://search.google.com/search-console
   - Add your property (`https://theavero.dev`)
   - Copy the verification meta tag → paste it into `google-site-verification` in `index.html` (replace `REPLACE_WITH_GSC_TOKEN`)
   - Submit `https://theavero.dev/sitemap.xml` in the Sitemaps section.
2. **Bing Webmaster Tools** — https://www.bing.com/webmasters
   - Same drill; paste token into `msvalidate.01`.
3. **Google Business Profile** — https://business.google.com
   - Free listing that dominates local searches ("website designer Jaipur", "web development near me").
   - Fill in address, hours, phone, and add a link to `theavero.dev`.
   - Post updates monthly — this alone drives free traffic.
4. **Backlinks** — the single biggest lever for competitive keywords like "website development":
   - List Avero on: Clutch.co, GoodFirms, DesignRush, DesignWanted, ThemeForest author profile, Behance, Dribbble.
   - Answer relevant questions on Quora and Reddit (r/webdev, r/india) with genuine value + a link back.
   - Publish your case studies on LinkedIn / Medium with a canonical link back to your `/blog/{slug}`.
5. **Content velocity**:
   - Publish **1 new blog post per week** (case study, industry deep-dive, "website checklist for X business").
   - Target long-tail keywords: "48 hour website for CA firm", "affordable ecommerce website Jaipur", "AI chatbot for salon website" — you'll rank these fast because competition is thin.
6. **Add a physical address in the footer** — Google trusts sites with real NAP (Name-Address-Phone) info. Even a co-working address is fine.

## 🚫 Realistic honest note on ranking #1 for "website development"
- The keyword **"website development"** is one of the most competitive in the world (millions of results).
- Ranking #1 for it on Google.com globally is **not realistic** in <18 months even with perfect SEO — you're competing with WordPress.com, Wix, GoDaddy, HubSpot, Webflow.
- **What IS realistic and where your traffic will come from:**
  - `website development in Jaipur` — reachable in ~3–6 months with Google Business Profile + local backlinks.
  - `48 hour website development` — reachable in ~2–3 months (very few competitors on this angle).
  - `affordable ai website development India` — reachable in ~4 months.
  - `website development for CA firms / salons / cafes / wholesalers` — reachable in ~1–3 months per keyword.
- **Focus on 30–50 long-tail queries** that each bring 100–1,000 searches/month. Sum of those beats a single #1 for "website development" every time.

## 🎯 30-day action plan (in order)
1. Deploy backend + frontend (this guide, steps 1–3).
2. Verify Google Search Console + Bing + submit sitemap.
3. Create Google Business Profile.
4. Publish 1 blog post/week for 4 weeks (targeting long-tail keywords above).
5. Build 10 backlinks from directories (Clutch, GoodFirms) + LinkedIn + Quora answers.
6. Track rankings weekly via free tools: Google Search Console (impressions/clicks), Ahrefs Webmaster Tools (free), Ubersuggest (free tier).

Do this and you'll be ranked top-3 for at least 5 long-tail Indian web-development queries within 60–90 days — which converts far better than "website development" #1 anyway (higher intent = higher price).
