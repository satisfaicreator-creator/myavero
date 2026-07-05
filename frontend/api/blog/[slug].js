import { getDb, ensureSeeded, json, cors } from "../_lib/db.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return json(res, 405, { detail: "Method not allowed" });
  await ensureSeeded();
  const slug = req.query.slug;
  const db = await getDb();
  const doc = await db.collection("blog_posts").findOne({ slug }, { projection: { _id: 0 } });
  if (!doc) return json(res, 404, { detail: "Post not found" });
  return json(res, 200, doc);
}
