import { motion } from "framer-motion";
import {
  Palette, Zap, Search, Shield, Smartphone, Bot, Server, MessageCircle, LayoutDashboard, Wrench, Cpu, IndianRupee
} from "lucide-react";

const items = [
  { icon: Palette,         title: "Premium Design Language" },
  { icon: Zap,             title: "48-Hour Website Delivery" },
  { icon: Search,          title: "SEO-Ready Structure" },
  { icon: Shield,          title: "Secure & Reliable" },
  { icon: Smartphone,      title: "Mobile-First Websites" },
  { icon: Bot,             title: "AI Chatbot Integration" },
  { icon: Server,          title: "Domain + Hosting Support" },
  { icon: MessageCircle,   title: "Lead Generation Forms" },
  { icon: LayoutDashboard, title: "Admin Panel Options" },
  { icon: Wrench,          title: "Maintenance Support" },
  { icon: Cpu,             title: "Modern Tech Stack" },
  { icon: IndianRupee,     title: "Affordable Pricing" },
];

export default function WhyAvero() {
  return (
    <section id="why" className="relative py-20 sm:py-28" data-testid="why-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Why Avero</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Why businesses <span className="gradient-text">choose Avero</span>
          </h2>
          <p className="text-white/70 mt-4 text-base sm:text-lg italic">
            We don't just build websites. We build <span className="text-white font-semibold not-italic">digital trust</span>.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="glass rounded-xl p-5 card-lift text-center"
              data-testid={`why-card-${i}`}
            >
              <div className="mx-auto w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-cyan-500/15 to-fuchsia-500/15 border border-white/10">
                <it.icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="font-heading font-semibold mt-4 text-sm sm:text-base">{it.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
