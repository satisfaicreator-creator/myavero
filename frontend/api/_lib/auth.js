import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "change_me";

export function signAdminToken(email) {
  return jwt.sign({ sub: email, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function requireAdmin(req) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return { ok: false, status: 401, error: "Missing token" };
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (data.role !== "admin") return { ok: false, status: 403, error: "Forbidden" };
    return { ok: true, admin: data };
  } catch (e) {
    return { ok: false, status: 401, error: "Invalid token" };
  }
}
