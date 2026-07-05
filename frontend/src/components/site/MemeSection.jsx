import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Rocket, MessageCircle, Frown } from "lucide-react";
import { AVERO } from "@/lib/config";

/**
 * Viral meme-style before/after with stylized 3D characters.
 * Includes an interactive comparison slider and a 3-beat story.
 */
export default function MemeSection() {
  const [pos, setPos] = useState(50);     // slider 0-100 (0 = all before, 100 = all after)
  const [dragging, setDragging] = useState(false);
  const [beat, setBeat] = useState(0);    // story beat 0..2
  const wrapRef = useRef(null);

  useEffect(() => {
    const onUp = () => setDragging(false);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const move = (clientX) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  const story = [
    { title: "Day 0", tag: "The Before", desc: "Ram runs a decent café. Great food, loyal walk-ins. Zero online presence. Customers Google 'best café near me' — Ram is invisible." },
    { title: "Hour 24", tag: "Avero Ships", desc: "Ram messages Avero on WhatsApp. Design locked. Copy dialled in. Site goes live in 48 hours flat with SEO, AI chatbot & WhatsApp funnels." },
    { title: "Week 2", tag: "The After", desc: "Ram is Google's top pick in his area. Bookings roll in overnight. His café hits its busiest month ever — and he never touched a line of code." },
  ];

  return (
    <section className="relative py-16 sm:py-24" data-testid="meme-section">
      {/* Ambient glows */}
      <div className="spot-glow w-[500px] h-[500px] bg-fuchsia-500 -top-24 -left-32" />
      <div className="spot-glow w-[500px] h-[500px] bg-cyan-500 -bottom-24 -right-32" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest border border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-300">
            <Sparkles className="w-3 h-3" /> Certified Meme · Based on a True Story
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mt-5 leading-[1.05]">
            POV: your business,{" "}
            <span className="gradient-text">before &amp; after Avero</span>
          </h2>
          <p className="text-white/70 mt-4 text-sm sm:text-base">
            Drag the slider. Watch the glow-up happen in real time. 👇
          </p>
        </div>

        {/* Comparison stage */}
        <div className="mt-10">
          <div
            ref={wrapRef}
            data-testid="meme-compare"
            className="relative aspect-[16/10] sm:aspect-[16/8] max-w-5xl mx-auto rounded-3xl overflow-hidden select-none neon-border cursor-ew-resize"
            onMouseDown={(e) => { setDragging(true); move(e.clientX); }}
            onMouseMove={(e) => { if (dragging) move(e.clientX); }}
            onTouchStart={(e) => { setDragging(true); move(e.touches[0].clientX); }}
            onTouchMove={(e) => { if (dragging) move(e.touches[0].clientX); }}
          >
            {/* Layer 1 — BEFORE (full width) */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
              <div className="absolute inset-0 opacity-40 grayscale grid-bg" />
              <BeforeScene />
              <MemeLabel side="left" tone="red" text="Business without Avero" sub="No website. No leads. Just vibes." />
            </div>

            {/* Layer 2 — AFTER (clipped to slider position) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0620] via-[#0a0f22] to-[#050816]">
                <div className="absolute inset-0 grid-bg opacity-70" />
                <div className="spot-glow w-72 h-72 bg-purple-600 top-6 left-1/2" />
                <div className="spot-glow w-72 h-72 bg-cyan-500 bottom-6 right-6" />
                <AfterScene />
                <MemeLabel side="right" tone="cyan" text="Business WITH Avero 🚀" sub="₹2,999 · Live in 48H · Sending leads at 3AM" />
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              data-testid="meme-slider-handle"
            >
              <div className="h-full w-[3px] bg-gradient-to-b from-cyan-400 via-purple-500 to-fuchsia-500 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-11 h-11 rounded-full grid place-items-center bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-2xl ring-4 ring-white/10">
                <div className="flex gap-0.5">
                  <span className="w-1 h-4 rounded bg-white" />
                  <span className="w-1 h-4 rounded bg-white" />
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/70 whitespace-nowrap">
                ← drag →
              </div>
            </div>

            {/* Corner meme captions */}
            <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/70">
              BEFORE
            </div>
            <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-cyan-300">
              AFTER
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="mt-5 flex justify-center gap-2">
            {[
              { l: "All Before 😭", v: 100 },
              { l: "Mid Glow-up ✨", v: 50 },
              { l: "All After 🚀",  v: 0 },
            ].map((b) => (
              <button
                key={b.l}
                onClick={() => setPos(b.v)}
                className="btn-ghost rounded-full px-3 py-1.5 text-xs"
                data-testid={`meme-preset-${b.v}`}
              >
                {b.l}
              </button>
            ))}
          </div>
        </div>

        {/* Story timeline */}
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {story.map((s, i) => (
            <motion.button
              key={s.title}
              onClick={() => setBeat(i)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`text-left glass rounded-xl p-5 transition-all ${beat === i ? "ring-1 ring-fuchsia-400/40" : "opacity-80 hover:opacity-100"}`}
              data-testid={`meme-story-beat-${i}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-heading font-black gradient-text text-lg">{s.title}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{s.tag}</div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={beat === i ? "on" : "off"}
                  initial={{ opacity: 0.85 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-white/75 mt-2 leading-relaxed"
                >
                  {s.desc}
                </motion.p>
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <a href="#contact" data-testid="meme-cta-primary" className="btn-glow rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4" /> Be the next Ram
          </a>
          <a href={AVERO.whatsapp} target="_blank" rel="noreferrer" data-testid="meme-cta-whatsapp" className="btn-ghost rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp us — 2 min chat
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sub components ---------------- */

function MemeLabel({ side, tone, text, sub }) {
  const isLeft = side === "left";
  const toneCls =
    tone === "red"
      ? "border-red-500/40 text-red-200 bg-red-500/10"
      : "border-cyan-400/40 text-cyan-200 bg-cyan-500/10";
  return (
    <div
      className={`absolute bottom-4 ${isLeft ? "left-4" : "right-4"} max-w-[46%] px-3 py-2.5 rounded-xl border ${toneCls} backdrop-blur-sm text-left`}
    >
      <div className="font-heading font-bold text-sm sm:text-base leading-tight">{text}</div>
      <div className="text-[10px] sm:text-xs text-white/70 mt-0.5">{sub}</div>
    </div>
  );
}

/** Stylized 3D-style "sad shopkeeper + closed shop" character built with SVG + CSS depth. */
function BeforeScene() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative w-[70%] max-w-md"
      >
        {/* Shop */}
        <div className="relative rounded-t-xl border-2 border-zinc-700 bg-zinc-900/80 overflow-hidden">
          <div className="h-6 bg-zinc-800 border-b-2 border-zinc-700 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">— Closed —</span>
          </div>
          <div className="h-24 sm:h-28 relative">
            <div className="absolute inset-4 rounded border border-zinc-700 bg-zinc-950/80" />
            <span className="absolute inset-0 grid place-items-center text-zinc-600 text-xs">No customers today</span>
            {/* Cobweb */}
            <div className="absolute top-2 right-3 text-zinc-600 text-xs">🕸️</div>
            <div className="absolute bottom-3 left-3 text-zinc-600 text-xs">💨</div>
          </div>
          <div className="h-3 bg-zinc-800 border-t-2 border-zinc-700" />
        </div>
        {/* Character */}
        <div className="mt-3 flex items-end gap-3">
          <SadCharacter />
          <div className="rounded-lg rounded-bl-none bg-white/5 border border-white/10 px-3 py-2 text-[10px] sm:text-xs text-white/70 flex items-center gap-1.5">
            <Frown className="w-3 h-3" /> &ldquo;Where are my customers?&rdquo;
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** After scene — glowing shop with holograms and confident hero character. */
function AfterScene() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative w-[70%] max-w-md"
      >
        {/* Shop with hologram */}
        <div className="relative rounded-xl overflow-hidden border-2 border-cyan-400/40 bg-black/60 shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)]">
          <div className="h-6 bg-gradient-to-r from-cyan-500/40 to-fuchsia-500/40 border-b border-white/20 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-white font-bold">— OPEN 24/7 —</span>
          </div>
          <div className="h-24 sm:h-28 relative bg-gradient-to-b from-[#0a0f22] to-black">
            <div className="absolute inset-3 rounded border border-cyan-400/40 grid grid-cols-3 gap-1 p-1.5">
              <div className="rounded bg-cyan-500/30 h-3" />
              <div className="rounded bg-fuchsia-500/30 h-3" />
              <div className="rounded bg-purple-500/30 h-3" />
              <div className="rounded bg-white/10 h-3" />
              <div className="rounded bg-white/15 h-3" />
              <div className="rounded bg-white/10 h-3" />
            </div>
            <div className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-500/80 text-[8px] font-bold">+24</div>
            <div className="absolute -bottom-1 -right-2 text-xl">🚀</div>
          </div>
          <div className="h-3 bg-black/50 border-t border-cyan-400/20" />
        </div>
        {/* Character */}
        <div className="mt-3 flex items-end gap-3">
          <HeroCharacter />
          <div className="rounded-lg rounded-bl-none bg-cyan-500/15 border border-cyan-400/40 px-3 py-2 text-[10px] sm:text-xs text-cyan-100 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-fuchsia-300" /> &ldquo;Bookings are pinging non-stop!&rdquo;
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Sad character (dull grayscale, hunched). Built with layered SVG+CSS. */
function SadCharacter() {
  return (
    <svg width="76" height="90" viewBox="0 0 76 90" fill="none" aria-hidden className="drop-shadow-lg">
      <defs>
        <linearGradient id="sadBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
      </defs>
      {/* Head */}
      <circle cx="38" cy="22" r="14" fill="url(#sadBody)" />
      <circle cx="33" cy="21" r="1.5" fill="#111" />
      <circle cx="43" cy="21" r="1.5" fill="#111" />
      {/* Sad mouth */}
      <path d="M32 28 Q38 25 44 28" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Sweat */}
      <path d="M48 15 Q50 20 48 22 Q46 20 48 15" fill="#93c5fd" />
      {/* Body / apron */}
      <path d="M18 40 Q38 32 58 40 L54 82 Q38 88 22 82 Z" fill="url(#sadBody)" />
      <rect x="30" y="46" width="16" height="20" rx="1" fill="#374151" />
      {/* Arms */}
      <path d="M18 42 Q10 60 20 78" stroke="url(#sadBody)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M58 42 Q66 60 56 78" stroke="url(#sadBody)" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Hero character — glowing, confident, powered up. */
function HeroCharacter() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -m-2 rounded-full bg-fuchsia-500/25 blur-xl" />
      <svg width="80" height="94" viewBox="0 0 80 94" fill="none" aria-hidden className="relative drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
        <defs>
          <linearGradient id="heroBody" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="capeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Cape */}
        <path d="M18 44 Q10 70 22 88 L40 84 L58 88 Q70 70 62 44 Z" fill="url(#capeGrad)" opacity="0.85" />
        {/* Head */}
        <circle cx="40" cy="20" r="14" fill="url(#heroBody)" />
        {/* Mask */}
        <path d="M27 18 Q40 12 53 18 L53 24 Q40 22 27 24 Z" fill="#0b0d1a" />
        {/* Confident eyes */}
        <circle cx="35" cy="21" r="1.6" fill="#22D3EE" />
        <circle cx="45" cy="21" r="1.6" fill="#22D3EE" />
        {/* Smile */}
        <path d="M33 30 Q40 34 47 30" stroke="#0b0d1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Powered chest badge */}
        <path d="M20 40 Q40 32 60 40 L55 78 Q40 84 25 78 Z" fill="url(#heroBody)" />
        <path d="M40 44 L46 54 L40 54 L44 66 L34 54 L40 54 Z" fill="#fff" opacity="0.9" />
        {/* Buff arms */}
        <path d="M20 42 Q8 54 18 74" stroke="url(#heroBody)" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M60 42 Q72 54 62 74" stroke="url(#heroBody)" strokeWidth="9" fill="none" strokeLinecap="round" />
        {/* Phone with leads */}
        <rect x="60" y="52" width="10" height="16" rx="2" fill="#0b0d1a" stroke="#22D3EE" strokeWidth="1" />
        <rect x="62" y="55" width="6" height="1.5" fill="#22D3EE" />
        <rect x="62" y="58" width="4" height="1.5" fill="#EC4899" />
      </svg>
    </div>
  );
}
