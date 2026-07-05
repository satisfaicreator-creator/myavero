import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { API_BASE } from "@/lib/config";

const initialMessages = [
  { role: "assistant", content: "Hi! 👋 I'm Avero AI. Ask me anything about pricing, delivery, services or 3D websites." },
];

const quickPrompts = [
  "What's included in ₹2,999?",
  "How does 48-hour delivery work?",
  "Do you build 3D websites?",
  "Can you set up an AI chatbot for me?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || streaming) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: msg }, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      });
      if (!res.ok || !res.body) throw new Error("bad_response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() || "";
        for (const chunk of parts) {
          const line = chunk.replace(/^data:\s*/, "").trim();
          if (!line) continue;
          try {
            const ev = JSON.parse(line);
            if (ev.type === "session") setSessionId(ev.session_id);
            else if (ev.type === "delta") {
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = {
                  role: "assistant",
                  content: (copy[copy.length - 1].content || "") + ev.content,
                };
                return copy;
              });
            } else if (ev.type === "error") {
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: "⚠️ Sorry, I hit an error. Please WhatsApp us." };
                return copy;
              });
            }
          } catch (_) {}
        }
      }
    } catch (e) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: "⚠️ Chat is temporarily unavailable. WhatsApp: +91-9680816234" };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        data-testid="chatbot-toggle"
        className="fixed z-50 bottom-20 md:bottom-6 right-4 md:right-6 w-14 h-14 rounded-full grid place-items-center btn-glow shadow-2xl"
        aria-label="Open Avero AI chat"
      >
        {open ? <X className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
        {!open && <span className="absolute inset-0 rounded-full pulse-ring pointer-events-none" />}
      </button>

      {open && (
        <div
          data-testid="chatbot-panel"
          className="fixed z-50 bottom-36 md:bottom-24 right-4 md:right-6 w-[92vw] sm:w-[380px] h-[520px] glass-strong rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 grid place-items-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-heading font-bold text-sm">Avero AI</div>
              <div className="text-[10px] text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online · 24/7
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] text-sm px-3 py-2 rounded-2xl ${
                  m.role === "user"
                    ? "ml-auto rounded-tr-none bg-gradient-to-br from-blue-500/40 to-purple-500/40 text-white border border-white/10"
                    : "mr-auto rounded-tl-none bg-white/5 border border-white/10 text-white/90"
                }`}
                data-testid={`chat-msg-${i}`}
              >
                {m.content || (streaming && i === messages.length - 1 ? <TypingDots /> : "…")}
              </div>
            ))}
            {messages.length <= 1 && (
              <div className="pt-3">
                <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Try asking</div>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      data-testid={`chatbot-quick-${p.slice(0,12)}`}
                      className="btn-ghost text-xs rounded-full px-3 py-1"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="p-3 border-t border-white/10 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={streaming}
              placeholder="Ask about pricing, delivery, services…"
              className="input-avero flex-1 py-2"
              data-testid="chatbot-input"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="btn-glow rounded-full w-10 h-10 grid place-items-center disabled:opacity-50"
              data-testid="chatbot-send"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
      <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
    </span>
  );
}
