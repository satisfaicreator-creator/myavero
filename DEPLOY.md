# Avero — Vercel-Only Deployment Guide (Zero Recurring Cost)

Everything runs on **Vercel + MongoDB Atlas + Resend** — all free tiers. No OpenAI, no Render, no paid services.
Chatbot uses a **rule-based responder** (keyword-matched canned replies streamed word-by-word) — the visitor experience feels like AI but costs ₹0.

## Architecture
```
Vercel project (root: frontend/)
├── src/               # React (CRA) — served as static site
└── api/               # Vercel Serverless Functions (Node.js)
     ├── enquiries.js         # Save lead + send Resend email
     ├── blog.js / blog/[slug].js
     ├── admin/login.js       # JWT admin auth
     ├── admin/enquiries.js   # list + [id].js patch status
     ├── admin/stats.js
     ├── chat.js              # Rule-based SSE chatbot
     └── _lib/                # db.js, auth.js, responder.js, blog-data.js
```

## Step 1 — MongoDB Atlas (Free M0, 512 MB)
1. https://www.mongodb.com/cloud/atlas/register → sign up.
2. Build Database → Free M0 (AWS Mumbai `ap-south-1`).
3. Database Access → create user (`avero_admin` + auto-gen password — save it).
4. Network Access → Add `0.0.0.0/0` (allow all — Vercel uses dynamic IPs).
5. Connect → Drivers → copy connection string, replace `<password>`:
   ```
   mongodb+srv://avero_admin:XXXX@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 2 — Resend (Free: 100 emails/day)
1. https://resend.com → sign up.
2. API Keys → **Create API key** → copy the `re_...` value.
3. **Optional but recommended**: Domains → Add `theavero.dev` → follow DNS instructions. Once verified, you can send from `no-reply@theavero.dev` (better deliverability than `onboarding@resend.dev`).

## Step 3 — Push repo to GitHub
Commit the whole `/app` folder. Both `vercel.json` files are ready.

## Step 4 — Import into Vercel
1. https://vercel.com/new → import your GitHub repo.
2. **Root Directory** → set to `frontend`.
3. Framework Preset auto-detects **Create React App** from `vercel.json`.
4. Click Deploy (will fail first time on missing env — expected).

## Step 5 — Add Environment Variables in Vercel
Settings → Environment Variables → add these **8 vars** (apply to Production + Preview + Development):

| Key | Example | Where from |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://avero_admin:XXXX@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority` | Step 1 |
| `DB_NAME` | `avero_prod` | Any name — Atlas creates it on first write |
| `RESEND_API_KEY` | `re_...` | Step 2 |
| `SENDER_EMAIL` | `onboarding@resend.dev` **OR** `no-reply@theavero.dev` (if domain verified) | Resend |
| `ADMIN_RECIPIENT_EMAIL` | `satisfaicreator@gmail.com` | Your inbox |
| `JWT_SECRET` | 32+ char random string — run `openssl rand -hex 32` | Any |
| `ADMIN_EMAIL` | `admin@theavero.dev` | Auto-seeded on first API call |
| `ADMIN_PASSWORD` | strong password (change from `Avero@2999`) | Auto-seeded |

**Do NOT set `REACT_APP_BACKEND_URL`** — leaving it empty makes the frontend call same-origin `/api/*`, which is what we want.

## Step 6 — Redeploy
Deployments → three-dot on last → Redeploy → uncheck build cache → Redeploy.

## Step 7 — Verify Everything
- `https://YOUR-URL.vercel.app/` → landing page loads.
- `https://YOUR-URL.vercel.app/api/` → `{"service":"avero","status":"ok","runtime":"vercel-serverless"}`.
- Submit the contact form → MongoDB Atlas → Browse Collections → `avero_prod.enquiries` → your row is there.
- Email arrives at `satisfaicreator@gmail.com` (check spam first time).
- Log in at `/admin/login` with `admin@theavero.dev` / your password → dashboard populates.
- Send `"what is the price?"` in the chatbot → get canned pricing reply, word-by-word.

## Step 8 — Custom domain
Vercel → Settings → Domains → add `theavero.dev` → set DNS → SSL auto-provisions.

---

## Total monthly cost (as configured)
| Service | Free-tier limit | Cost |
|---|---|---|
| Vercel Hobby | 100 GB bandwidth, 100 GB-hrs functions | **₹0** |
| MongoDB Atlas M0 | 512 MB storage | **₹0** |
| Resend | 100 emails/day, 3,000/month | **₹0** |
| **Total** | — | **₹0/month** |

## When to upgrade (only if you outgrow free tier)
- **Vercel Pro ($20/mo)** — if chatbot streams hit the 10-second timeout OR bandwidth exceeds 100 GB.
- **Resend Pro ($20/mo)** — if you send >3,000 emails/month.

---

## SEO — do after deploy
1. https://search.google.com/search-console → verify property → paste token into `google-site-verification` meta in `public/index.html`.
2. Submit `https://theavero.dev/sitemap.xml`.
3. https://www.bing.com/webmasters → verify → paste into `msvalidate.01`.
4. https://business.google.com → create Google Business Profile (biggest local-SEO win).
5. Publish 1 case study per week targeting long-tail keywords ("48-hour website for CA firm", "affordable ecommerce Jaipur", etc).
6. Get listed on Clutch / GoodFirms / DesignRush.
