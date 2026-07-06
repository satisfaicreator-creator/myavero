import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || "avero_prod";

if (!uri) {
  console.warn("[avero] MONGO_URL is not set — API will 500 on DB calls");
}

// Cache the client across warm invocations
let cached = global.__averoMongo;
if (!cached) cached = global.__averoMongo = { client: null, promise: null };

export async function getDb() {
  if (cached.client) return cached.client.db(dbName);
  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, { maxPoolSize: 5 }).then((c) => {
      cached.client = c;
      return c;
    });
  }
  const client = await cached.promise;
  return client.db(dbName);
}

// Idempotent seed — safe to call on every cold start
let seeded = false;
export async function ensureSeeded() {
  if (seeded) return;
  seeded = true;
  try {
    const bcrypt = (await import("bcryptjs")).default;
    const { BLOG_POSTS } = await import("./blog-data.js");
    const db = await getDb();

    // Admin — idempotent: upsert on ADMIN_EMAIL, refresh password if it changed
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
      const existing = await db.collection("admins").findOne({ email: adminEmail });
      if (!existing) {
        const password_hash = await bcrypt.hash(adminPassword, 10);
        await db.collection("admins").insertOne({
          id: crypto.randomUUID(), email: adminEmail, password_hash,
          created_at: new Date().toISOString(),
        });
        console.log("[avero] Seeded admin", adminEmail);
      } else {
        // Rotate password when env var changes
        const match = await bcrypt.compare(adminPassword, existing.password_hash);
        if (!match) {
          const password_hash = await bcrypt.hash(adminPassword, 10);
          await db.collection("admins").updateOne(
            { email: adminEmail },
            { $set: { password_hash, updated_at: new Date().toISOString() } }
          );
          console.log("[avero] Rotated admin password for", adminEmail);
        }
      }
      // Remove stale admin accounts that no longer match the current ADMIN_EMAIL
      await db.collection("admins").deleteMany({ email: { $ne: adminEmail } });
    }

    // Blog
    for (const post of BLOG_POSTS) {
      await db.collection("blog_posts").updateOne(
        { slug: post.slug }, { $set: post }, { upsert: true }
      );
    }
  } catch (e) {
    seeded = false;
    console.error("[avero] Seed failed:", e);
  }
}

export function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

export async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}
