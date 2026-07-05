import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Target, Brain, GraduationCap, Zap } from "lucide-react";

const futures = [
  { icon: Megaphone,     label: "AI Marketing Suites",      tint: "text-cyan-300"    },
  { icon: Target,        label: "AI Advertisement Engine",  tint: "text-fuchsia-300" },
  { icon: Brain,         label: "Custom Model Fine-Tuning", tint: "text-purple-300"  },
  { icon: GraduationCap, label: "Avero Academy · Trainings",tint: "text-emerald-300" },
];

/**
 * A compact "Coming Soon" ticker to be placed parallel to the hero headline.
 * Positions Avero as a broader AI IT studio — not just a web-dev shop.
 */
export default function ComingSoonStrip() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % futures.length), 2200);
    return () => clearInterval(t);
  }, []);

  const F = futures[i];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mt-6 max-w-xl"
      data-testid="hero-coming-soon-strip"
    >
      <div className="relative glass rounded-2xl px-4 py-3 flex items-center gap-3 border-white/10 overflow-hidden">
        {/* Scanning glow */}
        <motion.div
          animate={{ x: ["-40%", "140%"] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none"
        />

        {/* Left "Coming Soon" pill */}
        <div className="relative shrink-0">
          <span className="absolute inset-0 rounded-full pulse-ring" />
          <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Coming Soon
          </div>
        </div>

        {/* Rotating capability */}
        <div className="relative flex-1 min-w-0 flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={F.label}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 min-w-0"
            >
              <F.icon className={`w-4 h-4 shrink-0 ${F.tint}`} />
              <span className="font-heading font-semibold text-sm sm:text-[15px] truncate">
                {F.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right accent */}
        <div className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/50 shrink-0">
          <Zap className="w-3 h-3 text-cyan-300" />
          <span>2027 Roadmap</span>
        </div>
      </div>

      {/* Micro caption */}
      <div className="mt-2 text-[11px] sm:text-xs text-white/50 leading-relaxed">
        Websites today · <span className="text-white/80 font-semibold">an entire AI growth stack tomorrow</span>. Avero is quietly building the future — you get to be an early insider.
      </div>
    </motion.div>
  );
}
