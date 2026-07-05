import { getDb, json, cors, readBody } from "../../_lib/db.js";
import { requireAdmin } from "../../_lib/auth.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "PATCH") return json(res, 405, { detail: "Method not allowed" });
  const auth = requireAdmin(req);
  if (!auth.ok) return json(res, auth.status, { detail: auth.error });
  const id = req.query.id;
  const body = await readBody(req);
  const status = body.status || "new";
  const db = await getDb();
  const r = await db.collection("enquiries").updateOne({ id }, { $set: { status } });
  if (r.matchedCount === 0) return json(res, 404, { detail: "Not found" });
  return json(res, 200, { ok: true });
}
