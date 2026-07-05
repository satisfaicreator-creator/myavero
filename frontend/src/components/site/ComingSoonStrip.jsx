import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Target, Brain, GraduationCap, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const futuresBase = [
  { icon: Megaphone,     key: "cs.item1", tint: "text-cyan-300"    },
  { icon: Target,        key: "cs.item2", tint: "text-fuchsia-300" },
  { icon: Brain,         key: "cs.item3", tint: "text-purple-300"  },
  { icon: GraduationCap, key: "cs.item4", tint: "text-emerald-300" },
];

/**
 * A compact "Coming Soon" ticker to be placed parallel to the hero headline.
 * Positions Avero as a broader AI IT studio — not just a web-dev shop.
 */
export default function ComingSoonStrip() {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((x) => (x + 1) % futuresBase.length), 2200);
    return () => clearInterval(timer);
  }, []);

  const F = futuresBase[i];

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
            {t("cs.pill")}
          </div>
        </div>

        {/* Rotating capability */}
        <div className="relative flex-1 min-w-0 flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={F.key}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 min-w-0"
            >
              <F.icon className={`w-4 h-4 shrink-0 ${F.tint}`} />
              <span className="font-heading font-semibold text-sm sm:text-[15px] truncate">
                {t(F.key)}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right accent */}
        <div className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/50 shrink-0">
          <Zap className="w-3 h-3 text-cyan-300" />
          <span>{t("cs.tag")}</span>
        </div>
      </div>

      {/* Micro caption */}
      <div className="mt-2 text-[11px] sm:text-xs text-white/50 leading-relaxed">
        {t("cs.caption.a")}<span className="text-white/80 font-semibold">{t("cs.caption.b")}</span>{t("cs.caption.c")}
      </div>
    </motion.div>
  );
}
