# Deploying Avero frontend to Vercel

Avero's frontend is a **Create React App** (CRA) — **not Next.js**.
Vercel was auto-detecting Next.js from your repo. The included `vercel.json` fixes this.

## Two `vercel.json` files are provided:

1. **`/vercel.json`** (repo root) — use this if you push the **entire** `/app` directory
   (both `backend/` and `frontend/`). Vercel will `cd frontend && yarn build`.
2. **`/frontend/vercel.json`** — use this if you push **only** the `/frontend` folder as
   the Vercel project root.

Vercel will pick up whichever one lives at your project's root.

## Vercel project settings
- Framework Preset: **Create React App** (already set via `vercel.json`)
- Root Directory: `.` (if repo root) OR `frontend` (if you set root to frontend)
- Build Command: auto (from vercel.json)
- Output Directory: `build`

## Environment variables to set on Vercel
- `REACT_APP_BACKEND_URL` — the URL where your FastAPI backend is deployed
  (Vercel does NOT host the FastAPI backend — deploy it separately on
  Railway / Render / Fly.io / a VPS. Your frontend will call this URL for `/api/*`).

## After configuring, redeploy from the Vercel dashboard.
The build should now say **"Detected Create React App"** instead of Next.js.
