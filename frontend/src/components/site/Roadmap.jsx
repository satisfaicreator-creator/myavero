import { motion } from "framer-motion";
import { Megaphone, Target, Brain, GraduationCap, ArrowRight } from "lucide-react";

const roadmap = [
  {
    icon: Megaphone,
    title: "AI Marketing Suites",
    desc: "Content, email & social funnels tuned by AI — always on, always testing.",
    tag: "Q1 2027",
  },
  {
    icon: Target,
    title: "AI Advertisement Engine",
    desc: "Smart creative + audience targeting across Meta, Google & YouTube from one dashboard.",
    tag: "Q2 2027",
  },
  {
    icon: Brain,
    title: "Custom Model Fine-Tuning",
    desc: "Private language models fine-tuned on your business data — for chat, sales & ops.",
    tag: "Q3 2027",
  },
  {
    icon: GraduationCap,
    title: "Avero Academy",
    desc: "Practical trainings for teams — AI adoption, no-code stacks & product growth.",
    tag: "Q4 2027",
  },
];

export default function Roadmap() {
  return (
    <section className="relative py-20 sm:py-24" data-testid="roadmap-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
            Beyond Websites · Roadmap
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-5">
            Today: websites. <span className="gradient-text">Tomorrow: your entire growth stack.</span>
          </h2>
          <p className="text-white/70 mt-4 text-sm sm:text-base">
            Avero is building toward a complete AI-powered IT & growth partner — starting with the fastest, most premium websites in the market.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmap.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-xl p-5 relative overflow-hidden group card-lift"
              data-testid={`roadmap-item-${i}`}
            >
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg grid place-items-center bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10">
                    <r.icon className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-fuchsia-300 border border-fuchsia-400/30 rounded-full px-2 py-0.5">
                    {r.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base mt-4">{r.title}</h3>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            data-testid="roadmap-cta"
            className="btn-ghost rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
          >
            Reserve early access <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
