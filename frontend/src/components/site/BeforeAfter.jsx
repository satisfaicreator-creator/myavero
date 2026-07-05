import { motion } from "framer-motion";
import { X, Check, Rocket } from "lucide-react";

const before = [
  "Outdated / no website",
  "Low trust",
  "No Google presence",
  "Customers call & ask basic details",
  "No enquiry tracking",
  "No professional impression",
];

const after = [
  "Premium website",
  "Clear services",
  "More customer trust",
  "WhatsApp leads",
  "SEO-ready pages",
  "Enquiry form",
  "Admin dashboard",
  "AI chatbot",
  "24/7 online presence",
];

export default function BeforeAfter() {
  return (
    <section className="relative py-20 sm:py-28" data-testid="before-after-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">The Transformation</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Before Avero <span className="text-white/40">vs</span> <span className="gradient-text">After Avero</span>
          </h2>
        </div>

        <div className="relative mt-14 grid md:grid-cols-2 gap-6">
          {/* Divider Rocket badge */}
          <div className="hidden md:grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 place-items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 grid place-items-center shadow-2xl border border-white/20 pulse-ring">
              <Rocket className="w-6 h-6 text-white" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 sm:p-8 border-red-500/20 grayscale-[30%]"
          >
            <div className="text-[10px] uppercase tracking-widest text-red-300 border border-red-500/30 rounded-full px-2 py-0.5 inline-block">Before</div>
            <h3 className="font-heading text-2xl font-bold mt-3">Struggling silently online</h3>
            <ul className="mt-5 space-y-2.5">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-white/70">
                  <X className="w-4 h-4 text-red-400" /> {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neon-border relative"
          >
            <div className="rounded-2xl p-6 sm:p-8 bg-[#090B18]">
              <div className="text-[10px] uppercase tracking-widest text-cyan-300 border border-cyan-500/30 rounded-full px-2 py-0.5 inline-block">After Avero</div>
              <h3 className="font-heading text-2xl font-bold mt-3">Winning online — every day</h3>
              <ul className="mt-5 space-y-2.5">
                {after.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-white/90">
                    <Check className="w-4 h-4 text-cyan-300" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
