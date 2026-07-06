import { getDb, json, cors } from "./_lib/db.js";
import { DEFAULT_SETTINGS, getSettings } from "./_lib/settings.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return json(res, 405, { detail: "Method not allowed" });
  try {
    const s = await getSettings();
    return json(res, 200, s);
  } catch (e) {
    console.error("[avero] settings get failed", e);
    return json(res, 200, DEFAULT_SETTINGS);
  }
}
