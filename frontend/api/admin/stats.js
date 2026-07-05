import { getDb, json, cors } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return json(res, 405, { detail: "Method not allowed" });
  const auth = requireAdmin(req);
  if (!auth.ok) return json(res, auth.status, { detail: auth.error });
  const db = await getDb();
  const enq = db.collection("enquiries");
  const [total, newCount, contacted, closed] = await Promise.all([
    enq.countDocuments({}),
    enq.countDocuments({ status: "new" }),
    enq.countDocuments({ status: "contacted" }),
    enq.countDocuments({ status: "closed" }),
  ]);
  return json(res, 200, { total, new: newCount, contacted, closed });
}
