import { motion } from "framer-motion";
import { MessageSquare, Palette, Code, Rocket, TrendingUp, Timer } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Discuss",  desc: "We understand your business, services, customers and goals.", tag: "Hour 0" },
  { icon: Palette,       title: "Design",   desc: "Premium design direction and full website structure locked.", tag: "Hour 6" },
  { icon: Code,          title: "Develop",  desc: "Fast, secure, responsive site built on modern tech stack.",   tag: "Hour 20" },
  { icon: Rocket,        title: "Launch",   desc: "Domain, hosting, SSL, forms, WhatsApp & tracking setup.",     tag: "Hour 42" },
  { icon: TrendingUp,    title: "Grow",     desc: "SEO, maintenance, chatbot & lead generation support.",        tag: "Hour 48+" },
];

export default function Delivery() {
  return (
    <section id="process" className="relative py-20 sm:py-28" data-testid="delivery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">The 48-hour Sprint</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
              Website live in <span className="gradient-text">48 hours</span>
            </h2>
            <p className="text-white/70 mt-4">
              A tight, focused sprint. Zero fluff. Zero delays. You bring the brand, we ship the website.
            </p>

            {/* Stopwatch visual */}
            <div className="mt-8 relative w-52 h-52 mx-auto lg:mx-0" aria-hidden>
              <div className="absolute inset-0 rounded-full border border-white/10 slow-spin" />
              <div className="absolute inset-4 rounded-full border border-cyan-500/30 slow-spin" style={{ animationDuration: "12s" }} />
              <div className="absolute inset-8 rounded-full glass-strong grid place-items-center">
                <div className="text-center">
                  <div className="font-heading font-black text-5xl gradient-text leading-none">48</div>
                  <div className="text-xs uppercase tracking-widest text-white/70 mt-2">Hours</div>
                </div>
              </div>
              <Timer className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-cyan-300" />
              <div className="absolute inset-0 rounded-full pulse-ring pointer-events-none" />
            </div>

            <a href="#contact" className="mt-8 inline-flex btn-glow rounded-full px-6 py-3.5 text-sm font-semibold items-center gap-2" data-testid="delivery-cta">
              <Rocket className="w-4 h-4" /> Start My 48-Hour Website
            </a>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-purple-500/40 to-fuchsia-500/60 hidden sm:block" />
            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative flex gap-4 items-start"
                  data-testid={`delivery-step-${i}`}
                >
                  <div className="relative shrink-0 w-12 h-12 rounded-full grid place-items-center glass-strong border border-cyan-400/30 z-10">
                    <s.icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div className="glass rounded-xl p-5 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-bold text-lg">
                        <span className="text-white/40 font-mono text-xs mr-2">0{i + 1}</span>
                        {s.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest text-fuchsia-300 border border-fuchsia-400/30 rounded-full px-2 py-0.5">{s.tag}</span>
                    </div>
                    <p className="text-sm text-white/65 mt-1">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
