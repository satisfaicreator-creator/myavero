import { json, cors, readBody } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";
import { getSettings, updateSettings } from "../_lib/settings.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const auth = requireAdmin(req);
  if (!auth.ok) return json(res, auth.status, { detail: auth.error });

  if (req.method === "GET") {
    return json(res, 200, await getSettings());
  }
  if (req.method === "PUT") {
    const body = await readBody(req);
    const updated = await updateSettings(body || {});
    return json(res, 200, updated);
  }
  return json(res, 405, { detail: "Method not allowed" });
}
