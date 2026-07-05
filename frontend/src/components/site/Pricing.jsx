import { motion } from "framer-motion";
import { Check, Sparkles, Rocket, MessageCircle, Zap, Shield, Search, Bot, Server, Wrench, Smartphone, Globe2, LayoutDashboard, LineChart, PhoneCall } from "lucide-react";
import { AVERO } from "@/lib/config";

const included = [
  { icon: Zap,             t: "Website Delivery in 48 Hours" },
  { icon: Sparkles,        t: "Premium Custom Design" },
  { icon: Smartphone,      t: "Mobile Responsive" },
  { icon: Search,          t: "SEO Setup + Meta Tags" },
  { icon: Bot,             t: "AI Chatbot Integration" },
  { icon: MessageCircle,   t: "WhatsApp & Call CTAs" },
  { icon: LayoutDashboard, t: "Lead Enquiry Forms" },
  { icon: Server,          t: "Hosting Setup + SSL" },
  { icon: Globe2,          t: "Domain Setup Assistance" },
  { icon: Shield,          t: "Secure & Fast" },
  { icon: LineChart,       t: "Google Analytics Ready" },
  { icon: Wrench,          t: "1-Month Maintenance" },
  { icon: PhoneCall,       t: "Priority Support" },
  { icon: Rocket,          t: "Launch-Day Assistance" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28" data-testid="pricing-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest border border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-300">
            <Sparkles className="w-3 h-3" /> Launch Offer · Limited Slots This Month
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-5">
            One website. <span className="gradient-text">Everything included.</span>
          </h2>
          <p className="text-white/70 mt-4 text-base sm:text-lg">
            No confusing plans. No hidden add-ons. One premium package that ships in 48 hours.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 neon-border"
          data-testid="mega-offer-card"
        >
          {/* Ribbon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="px-5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)]">
              🔥 Mega Launch Offer
            </div>
          </div>

          <div className="rounded-2xl bg-[#090B18] p-6 sm:p-10 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="spot-glow w-[420px] h-[420px] bg-purple-600 -top-32 -left-24" />
            <div className="spot-glow w-[420px] h-[420px] bg-cyan-500 -bottom-32 -right-24" />
            <div className="spot-glow w-[300px] h-[300px] bg-fuchsia-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />

            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-widest text-cyan-300">The Avero Signature</div>
                <h3 className="font-heading text-2xl sm:text-3xl font-black mt-2">Complete Business Website Package</h3>
                <p className="text-white/65 mt-3 text-sm sm:text-base">
                  Everything a modern business needs to look premium online — design, dev, hosting, SEO, AI chatbot & 48-hour delivery.
                </p>

                {/* Price block */}
                <div className="mt-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-white/40 text-2xl line-through">₹15,000</span>
                    <span className="text-xs uppercase tracking-widest text-fuchsia-300 border border-fuchsia-400/30 rounded-full px-2 py-0.5">Save 80%</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-heading font-black text-6xl sm:text-7xl gradient-text leading-none">{AVERO.startingPrice}</span>
                    <span className="text-white/60 text-sm">/- starting</span>
                  </div>
                  <div className="text-xs text-white/50 mt-2">
                    Final cost depends on pages, ecommerce, 3D, admin panel &amp; chatbot needs. We&apos;ll quote transparently on WhatsApp.
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a href="#contact" data-testid="mega-cta-primary" className="btn-glow rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" /> Claim This Offer
                  </a>
                  <a href={AVERO.whatsapp} target="_blank" rel="noreferrer" data-testid="mega-cta-whatsapp" className="btn-ghost rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Us
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Only 6 slots left this week
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">100% money-back if we miss 48H*</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="text-[11px] uppercase tracking-widest text-cyan-300 mb-4">Everything included</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {included.map((f, i) => (
                    <motion.div
                      key={f.t}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="glass rounded-lg px-3 py-2.5 flex items-center gap-2.5 text-sm"
                      data-testid={`offer-feature-${i}`}
                    >
                      <span className="w-7 h-7 shrink-0 rounded-md grid place-items-center bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10">
                        <f.icon className="w-3.5 h-3.5 text-cyan-300" />
                      </span>
                      <span className="text-white/85 flex-1">{f.t}</span>
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-[11px] text-white/40 mt-4 max-w-2xl mx-auto">
          *Ecommerce, 3D websites and admin-panel add-ons are custom-quoted. 48-hour guarantee applies to standard business websites when content & requirements are shared upfront.
        </p>
      </div>
    </section>
  );
}
