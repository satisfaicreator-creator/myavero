import { motion } from "framer-motion";
import { Bot, LineChart, ShieldCheck, Search, Server, Globe2, Rocket } from "lucide-react";

/** Hybrid 3D-style hero scene using CSS transforms + floating UI cards.
 *  No heavy Three.js — fully responsive & performant.
 */
export default function HeroScene() {
  return (
    <div className="relative w-full aspect-[5/6] sm:aspect-[6/5] lg:aspect-[5/6] max-w-[560px] mx-auto" data-testid="hero-scene">
      {/* Ambient glows */}
      <div className="spot-glow w-[280px] h-[280px] bg-purple-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="spot-glow w-[320px] h-[320px] bg-cyan-500 top-10 right-0" />
      <div className="spot-glow w-[220px] h-[220px] bg-fuchsia-500 bottom-6 left-0" />

      {/* Orbit ring */}
      <div className="absolute inset-8 rounded-full border border-cyan-500/20 slow-spin" />
      <div className="absolute inset-16 rounded-full border border-purple-500/20 slow-spin" style={{ animationDuration: "60s", animationDirection: "reverse" }} />

      {/* Laptop mockup (centre) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-x-6 top-[28%] floaty"
        style={{ perspective: 900 }}
      >
        <div
          className="glass-strong rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ transform: "rotateX(6deg) rotateY(-8deg)" }}
        >
          <div className="flex items-center gap-1.5 px-3 py-2 bg-black/60 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <span className="ml-auto text-[10px] text-white/40 truncate">theavero.dev</span>
          </div>
          <div className="p-3 sm:p-4 bg-gradient-to-br from-[#0a0f22] to-[#0a0620]">
            <div className="text-[10px] uppercase tracking-widest text-cyan-300 mb-1">Dashboard</div>
            <div className="font-heading font-bold text-sm sm:text-base leading-tight">Business Growth Today</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-md bg-white/5 border border-white/10 p-2">
                <div className="text-[9px] text-white/50">Leads</div>
                <div className="text-sm font-semibold text-cyan-300">+312</div>
              </div>
              <div className="rounded-md bg-white/5 border border-white/10 p-2">
                <div className="text-[9px] text-white/50">Visitors</div>
                <div className="text-sm font-semibold text-fuchsia-300">18.6K</div>
              </div>
              <div className="rounded-md bg-white/5 border border-white/10 p-2">
                <div className="text-[9px] text-white/50">Rank</div>
                <div className="text-sm font-semibold text-purple-300">#3</div>
              </div>
            </div>
            {/* Graph */}
            <svg viewBox="0 0 200 60" className="w-full mt-2">
              <defs>
                <linearGradient id="hg" x1="0" x2="1">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path d="M0 50 L20 45 L40 40 L60 42 L80 30 L100 32 L120 20 L140 22 L160 12 L180 8 L200 4"
                fill="none" stroke="url(#hg)" strokeWidth="2" />
              <path d="M0 50 L20 45 L40 40 L60 42 L80 30 L100 32 L120 20 L140 22 L160 12 L180 8 L200 4 L200 60 L0 60 Z"
                fill="url(#hg)" opacity="0.15" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="absolute right-2 sm:right-4 bottom-4 w-28 sm:w-36 floaty"
        style={{ animationDelay: "1s" }}
      >
        <div className="glass-strong rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="h-1.5 w-8 mx-auto mt-1 rounded-full bg-white/20" />
          <div className="p-2">
            <div className="rounded-md bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 p-2">
              <div className="text-[8px] uppercase tracking-widest text-cyan-300">Avero</div>
              <div className="text-[10px] font-semibold leading-tight">Book your website</div>
              <div className="mt-1 h-1 bg-white/15 rounded" />
              <div className="mt-1 h-1 bg-white/10 rounded w-3/4" />
              <button className="mt-2 w-full text-[8px] py-1 rounded bg-gradient-to-r from-cyan-500 to-fuchsia-500 font-semibold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating side cards */}
      <FloatCard delay={0.2} className="top-6 left-2 sm:left-0" icon={Search} title="SEO" value="+180%" tone="cyan" />
      <FloatCard delay={0.35} className="top-24 right-2 sm:right-6" icon={ShieldCheck} title="Secure" value="SSL" tone="blue" />
      <FloatCard delay={0.5} className="top-[52%] left-2 sm:-left-4" icon={Bot} title="AI Chat" value="24/7" tone="fuchsia" />
      <FloatCard delay={0.65} className="bottom-24 right-2 sm:-right-6" icon={Server} title="Hosting" value="Live" tone="purple" />
      <FloatCard delay={0.8} className="bottom-6 left-[38%] sm:left-[30%]" icon={LineChart} title="Growth" value="+230%" tone="cyan" />

      {/* Rocket badge */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 neon-border px-3 py-1.5 text-[11px] font-semibold text-white flex items-center gap-1.5"
      >
        <Rocket className="w-3.5 h-3.5 text-cyan-300" /> 48H Delivery
      </motion.div>
    </div>
  );
}

const toneMap = {
  cyan:    "text-cyan-300 border-cyan-400/30 from-cyan-500/10",
  blue:    "text-blue-300 border-blue-400/30 from-blue-500/10",
  fuchsia: "text-fuchsia-300 border-fuchsia-400/30 from-fuchsia-500/10",
  purple:  "text-purple-300 border-purple-400/30 from-purple-500/10",
};

function FloatCard({ icon: Icon, title, value, className = "", delay = 0, tone = "cyan" }) {
  const t = toneMap[tone];
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={`absolute glass rounded-xl px-3 py-2 min-w-[100px] shadow-lg floaty bg-gradient-to-br ${t.split(" ").slice(-1)} to-transparent border ${t} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${t.split(" ")[0]}`} />
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/60">{title}</div>
          <div className="text-xs font-bold">{value}</div>
        </div>
      </div>
    </motion.div>
  );
}
