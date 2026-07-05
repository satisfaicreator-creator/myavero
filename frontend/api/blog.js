import { getDb, ensureSeeded, json, cors } from "./_lib/db.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return json(res, 405, { detail: "Method not allowed" });
  await ensureSeeded();
  const db = await getDb();
  const docs = await db.collection("blog_posts").find({}, { projection: { _id: 0, body_html: 0 } }).sort({ date: -1 }).limit(50).toArray();
  return json(res, 200, docs);
}
