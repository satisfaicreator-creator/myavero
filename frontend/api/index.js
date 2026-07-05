import { cors, json } from "./_lib/db.js";
export default function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  return json(res, 200, { service: "avero", status: "ok", runtime: "vercel-serverless" });
}
