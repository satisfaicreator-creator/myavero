import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight, Search, MessageCircle, Bot, ShieldCheck, TrendingUp } from "lucide-react";

const beforeItems = ["No website", "No Google reach", "No online leads", "No digital trust", "Poor design", "No enquiry system"];
const afterItems = [
  { t: "Professional website",  icon: CheckCircle2 },
  { t: "SEO-ready pages",        icon: Search },
  { t: "WhatsApp enquiries",     icon: MessageCircle },
  { t: "AI chatbot support",     icon: Bot },
  { t: "Fast & secure hosting",  icon: ShieldCheck },
  { t: "Growing daily leads",    icon: TrendingUp },
];

export default function ProblemSection() {
  return (
    <section className="relative py-20 sm:py-28" data-testid="problem-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">The Real Problem</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Your business is good…<br />
            <span className="gradient-text">but can customers find you online?</span>
          </h2>
          <p className="text-white/70 mt-4 text-base sm:text-lg">
            A modern website can turn trust into enquiries — and clicks into customers.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative glass rounded-2xl p-6 sm:p-8 border-red-500/20"
            data-testid="problem-before"
          >
            <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-red-500/20 text-red-300 border border-red-500/40">
              Before
            </div>
            <h3 className="font-heading text-2xl font-bold mt-2">Your business today</h3>
            <p className="text-white/60 mt-1 text-sm">Invisible to the customers searching for you.</p>

            <div className="mt-6 relative rounded-xl overflow-hidden border border-white/10 bg-black/50 p-5 grayscale">
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>www.your-store.local</span>
                <span>404</span>
              </div>
              <div className="mt-4 h-3 w-3/4 rounded bg-white/10" />
              <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
              <svg viewBox="0 0 200 60" className="w-full mt-4 opacity-70">
                <path d="M0 10 L40 20 L80 15 L120 30 L160 42 L200 55" fill="none" stroke="#ef4444" strokeWidth="2" />
              </svg>
              <div className="absolute bottom-3 right-3 text-red-400 text-xs">Traffic ↓</div>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {beforeItems.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-white/70">
                  <XCircle className="w-4 h-4 text-red-400" /> {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative neon-border p-[1px]"
            data-testid="problem-after"
          >
            <div className="rounded-2xl p-6 sm:p-8 bg-[#090B18]">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                After Avero
              </div>
              <h3 className="font-heading text-2xl font-bold mt-2">Your business tomorrow</h3>
              <p className="text-white/60 mt-1 text-sm">Premium website, more leads, more trust.</p>

              <div className="mt-6 relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 p-5">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>theavero.dev</span>
                  <span className="text-emerald-400">Live</span>
                </div>
                <div className="mt-4 h-3 w-3/4 rounded bg-white/15" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
                <svg viewBox="0 0 200 60" className="w-full mt-4">
                  <defs>
                    <linearGradient id="grad-after" x1="0" x2="1">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <path d="M0 55 L40 42 L80 35 L120 20 L160 12 L200 4" fill="none" stroke="url(#grad-after)" strokeWidth="2.5" />
                </svg>
                <div className="absolute bottom-3 right-3 text-emerald-400 text-xs">Growth ↑ +230%</div>
              </div>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {afterItems.map(({ t, icon: Icon }) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-white/85">
                    <Icon className="w-4 h-4 text-cyan-300" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#contact" data-testid="problem-cta" className="btn-glow rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
            Fix My Online Presence <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
