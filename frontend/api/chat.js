import { getDb, cors, readBody } from "./_lib/db.js";
import { matchReply } from "./_lib/responder.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const body = await readBody(req);
  const sessionId = body.session_id || crypto.randomUUID();
  const userMessage = (body.message || "").trim();

  // Save user message (best effort)
  try {
    const db = await getDb();
    await db.collection("chat_messages").insertOne({
      id: crypto.randomUUID(), session_id: sessionId, role: "user",
      content: userMessage, created_at: new Date().toISOString(),
    });
  } catch (e) { console.error("chat_messages user insert failed", e); }

  // SSE stream
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.write(`data: ${JSON.stringify({ type: "session", session_id: sessionId })}\n\n`);

  const reply = matchReply(userMessage);
  const words = reply.split(/(\s+)/); // keep whitespace as tokens
  for (const w of words) {
    res.write(`data: ${JSON.stringify({ type: "delta", content: w })}\n\n`);
    // ~30ms per token for a "typing" feel; small enough that total < 10s Vercel Hobby limit even on long replies
    await new Promise((r) => setTimeout(r, 25));
  }
  res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);

  // Save assistant message (best effort)
  try {
    const db = await getDb();
    await db.collection("chat_messages").insertOne({
      id: crypto.randomUUID(), session_id: sessionId, role: "assistant",
      content: reply, created_at: new Date().toISOString(),
    });
  } catch (e) { console.error("chat_messages assistant insert failed", e); }

  res.end();
}
