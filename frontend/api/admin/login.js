import { getDb, ensureSeeded, json, cors, readBody } from "../_lib/db.js";
import { signAdminToken } from "../_lib/auth.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return json(res, 405, { detail: "Method not allowed" });
  await ensureSeeded();
  const { email, password } = await readBody(req);
  if (!email || !password) return json(res, 400, { detail: "Missing credentials" });
  const db = await getDb();
  const admin = await db.collection("admins").findOne({ email });
  if (!admin) return json(res, 401, { detail: "Invalid credentials" });
  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) return json(res, 401, { detail: "Invalid credentials" });
  return json(res, 200, { token: signAdminToken(admin.email), email: admin.email });
}
