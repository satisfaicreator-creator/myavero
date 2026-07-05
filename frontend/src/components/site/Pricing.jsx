import { motion } from "framer-motion";
import { Check, Rocket, Sparkles, Boxes } from "lucide-react";

const tiers = [
  {
    icon: Rocket,
    name: "Starter Website",
    price: "₹2,999",
    priceNote: "starting",
    tag: "Best for small businesses & personal brands",
    features: ["1 to 3 pages", "Mobile responsive design", "Contact form", "WhatsApp button", "Basic SEO", "Fast delivery"],
    cta: "Start Starter Website",
    highlight: false,
    accent: "from-cyan-500 to-blue-600",
  },
  {
    icon: Sparkles,
    name: "Business Website",
    price: "Custom",
    priceNote: "quote",
    tag: "Best for growing businesses",
    features: ["5+ pages", "Premium UI/UX", "Lead generation forms", "Service & gallery pages", "SEO setup", "Domain + hosting support", "Maintenance options"],
    cta: "Get Business Quote",
    highlight: true,
    accent: "from-purple-500 to-fuchsia-600",
  },
  {
    icon: Boxes,
    name: "Premium / 3D Website",
    price: "Custom",
    priceNote: "quote",
    tag: "Brands that want a wow factor",
    features: ["3D hero / Three.js", "Scroll animations", "Product storytelling", "Advanced UI", "Ecommerce/catalogue", "Performance optimization", "Premium brand feel"],
    cta: "Discuss Premium Website",
    highlight: false,
    accent: "from-fuchsia-500 to-pink-500",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Pricing</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Affordable websites. <span className="gradient-text">Premium quality.</span>
          </h2>
          <p className="text-white/70 mt-4">
            Final cost depends on pages, features, content, domain, hosting, admin panel, chatbot, ecommerce and 3D requirements.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`relative rounded-2xl p-6 sm:p-8 ${t.highlight ? "neon-border" : "glass"}`}
              data-testid={`pricing-tier-${i}`}
            >
              <div className={t.highlight ? "rounded-2xl p-4 sm:p-6 bg-[#0A0B18]" : ""}>
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold">
                    Most Popular
                  </span>
                )}
                <div className={`w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br ${t.accent} shadow-lg`}>
                  <t.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold mt-4">{t.name}</h3>
                <p className="text-xs text-white/60 mt-1">{t.tag}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-black gradient-text">{t.price}</span>
                  <span className="text-xs text-white/60 uppercase tracking-widest">{t.priceNote}</span>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/85">
                      <Check className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  data-testid={`pricing-cta-${i}`}
                  className={`mt-7 inline-flex w-full justify-center items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${t.highlight ? "btn-glow" : "btn-ghost"}`}
                >
                  {t.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
