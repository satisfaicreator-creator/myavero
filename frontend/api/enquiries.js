import { getDb, ensureSeeded, json, cors, readBody } from "./_lib/db.js";
import { Resend } from "resend";

const AVERO_EMAIL = process.env.ADMIN_RECIPIENT_EMAIL;
const SENDER = process.env.SENDER_EMAIL || "onboarding@resend.dev";
const RESEND_KEY = process.env.RESEND_API_KEY;

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return json(res, 405, { detail: "Method not allowed" });

  await ensureSeeded();
  const body = await readBody(req);
  if (!body.full_name || !body.phone) return json(res, 422, { detail: "full_name and phone are required" });

  const obj = {
    id: crypto.randomUUID(),
    full_name: String(body.full_name).slice(0, 120),
    phone: String(body.phone).slice(0, 30),
    business_name: body.business_name || "",
    business_type: body.business_type || "",
    website_type: body.website_type || "",
    budget: body.budget || "",
    timeline: body.timeline || "",
    message: body.message || "",
    source: body.source || "landing",
    status: "new",
    created_at: new Date().toISOString(),
  };
  const db = await getDb();
  await db.collection("enquiries").insertOne(obj);

  // Fire-and-forget email
  if (RESEND_KEY && AVERO_EMAIL) {
    const html = `<div style="font-family:Arial,sans-serif;background:#0b0d1a;color:#fff;padding:24px;border-radius:12px">
      <h2 style="color:#22D3EE">🚀 New Avero Enquiry</h2>
      <p style="color:#A1A1AA">${obj.created_at}</p>
      <p><b>Name:</b> ${obj.full_name}<br><b>Phone:</b> ${obj.phone}<br>
      <b>Business:</b> ${obj.business_name} (${obj.business_type})<br>
      <b>Website Type:</b> ${obj.website_type}<br>
      <b>Budget:</b> ${obj.budget}<br><b>Timeline:</b> ${obj.timeline}<br>
      <b>Message:</b><br>${(obj.message || "").replace(/\n/g, "<br>")}</p>
    </div>`;
    try {
      const r = new Resend(RESEND_KEY);
      await r.emails.send({
        from: `Avero <${SENDER}>`, to: [AVERO_EMAIL],
        subject: `New Enquiry — ${obj.full_name} (${obj.website_type || "General"})`,
        html, reply_to: [AVERO_EMAIL],
      });
    } catch (e) { console.error("Resend send failed", e); }
  }
  return json(res, 200, obj);
}
