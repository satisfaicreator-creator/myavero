import { motion } from "framer-motion";
import {
  Code2, PenTool, Rocket, Store, ShoppingBag, Search, Server, Bot, LayoutDashboard, Wrench, Boxes, RefreshCw
} from "lucide-react";

const services = [
  { icon: Code2,          title: "Custom Website Development", desc: "Modern responsive websites built for your business goals." },
  { icon: PenTool,        title: "UI/UX Design",               desc: "Premium layouts, clean typography, conversion-focused UX." },
  { icon: Rocket,         title: "Landing Pages",              desc: "High-converting pages for ads, campaigns, offers." },
  { icon: Store,          title: "Business Websites",          desc: "For local firms, salons, academies, shops & service providers." },
  { icon: ShoppingBag,    title: "Ecommerce Websites",         desc: "Product catalogue, cart, checkout & enquiry systems." },
  { icon: Search,         title: "SEO Setup",                  desc: "Search-friendly structure, meta tags, speed & local SEO basics." },
  { icon: Server,         title: "Domain + Hosting",           desc: "Domain setup, hosting, SSL, DNS, deployment & launch." },
  { icon: Bot,            title: "AI Chatbots",                desc: "Smart chatbot for queries, lead capture & 24/7 support." },
  { icon: LayoutDashboard,title: "Admin Panel",                desc: "Lead dashboard, enquiry management & content updates." },
  { icon: Wrench,         title: "Maintenance Support",        desc: "Updates, security checks, backups & performance boosts." },
  { icon: Boxes,          title: "3D Interactive Websites",    desc: "Three.js, scroll animations & next-gen storytelling." },
  { icon: RefreshCw,      title: "Website Redesign",           desc: "Transform old websites into modern, fast, premium builds." },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Services</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Everything your business needs to <span className="gradient-text">go online</span>
          </h2>
          <p className="text-white/70 mt-4 text-base sm:text-lg">
            One team. Twelve services. All engineered to move your business forward.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, idx) => (
            <motion.a
              key={s.title}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              className="group card-lift glass rounded-2xl p-6 relative overflow-hidden"
              data-testid={`service-card-${idx}`}
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-fuchsia-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10">
                  <s.icon className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="font-heading text-lg font-bold mt-5">{s.title}</h3>
                <p className="text-sm text-white/65 mt-2 leading-relaxed">{s.desc}</p>
                <div className="mt-5 text-xs text-cyan-300 font-semibold uppercase tracking-widest flex items-center gap-1 opacity-70 group-hover:opacity-100">
                  Enquire Now →
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
