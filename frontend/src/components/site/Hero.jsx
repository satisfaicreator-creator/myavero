import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Rocket, ShieldCheck, Sparkles, Bot, Globe2, Zap, MessageCircle, PlayCircle, ArrowUpRight
} from "lucide-react";
import { AVERO } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import HeroScene from "./HeroScene";
import ComingSoonStrip from "./ComingSoonStrip";

const rotatingKeys = ["hero.rotate.grow", "hero.rotate.convert", "hero.rotate.rank", "hero.rotate.impress", "hero.rotate.sell", "hero.rotate.scale"];

const badges = [
  { label: "Website in 48 Hrs", icon: Zap },
  { label: `Starting ${AVERO.startingPrice}`, icon: Sparkles },
  { label: "SEO Ready", icon: Globe2 },
  { label: "AI Chatbot", icon: Bot },
  { label: "Domain + Hosting", icon: ShieldCheck },
  { label: "Secure & Fast", icon: ShieldCheck },
  { label: "Mobile Friendly", icon: PlayCircle },
  { label: "Maintenance Support", icon: Rocket },
];

export default function Hero() {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((x) => (x + 1) % rotatingKeys.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-10 lg:pt-16 pb-24 lg:pb-32">
      <div className="grid-bg absolute inset-0 z-0" />
      <div className="spot-glow w-[500px] h-[500px] bg-purple-600 top-[-100px] left-[-100px]" />
      <div className="spot-glow w-[500px] h-[500px] bg-blue-600 top-40 right-[-120px]" />
      <div className="spot-glow w-[400px] h-[400px] bg-fuchsia-500 bottom-[-100px] left-[30%]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center z-10">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest text-cyan-300 mb-6"
            data-testid="hero-eyebrow"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]" />
            {t("hero.eyebrow")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.02] tracking-tight"
            data-testid="hero-headline"
          >
            {t("hero.h1a")}
            <br />
            {t("hero.h1b")}{" "}
            <span className="inline-block relative align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingKeys[i]}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="gradient-text"
                >
                  {t(rotatingKeys[i])}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            {t("hero.h1c")}
          </motion.h1>

          <ComingSoonStrip />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
            data-testid="hero-subheadline"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="btn-glow rounded-full px-6 py-3.5 text-sm sm:text-base font-semibold inline-flex items-center gap-2 text-white"
            >
              <Rocket className="w-4 h-4" /> {t("hero.cta.primary")}
            </a>
            <a
              href={AVERO.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta-whatsapp"
              className="btn-ghost rounded-full px-6 py-3.5 text-sm sm:text-base font-semibold inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> {t("hero.cta.whatsapp")}
            </a>
            <a
              href="#work"
              data-testid="hero-cta-demos"
              className="btn-ghost rounded-full px-6 py-3.5 text-sm sm:text-base font-semibold inline-flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4 text-cyan-300" /> {t("hero.cta.demos")}
            </a>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl" data-testid="hero-badges">
            {badges.map((b) => (
              <div
                key={b.label}
                className="glass rounded-lg px-3 py-2.5 text-xs flex items-center gap-2"
              >
                <b.icon className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span className="text-white/85 truncate">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
