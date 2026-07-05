import { motion } from "framer-motion";
import { MessageCircle, Phone, MailCheck, Bot, Calendar, ClipboardList, MapPin, Sparkles } from "lucide-react";

const capture = [
  { icon: MessageCircle, label: "WhatsApp buttons"       },
  { icon: Phone,         label: "Call buttons"           },
  { icon: MailCheck,     label: "Enquiry forms"          },
  { icon: Calendar,      label: "Appointment forms"      },
  { icon: ClipboardList, label: "Quote request forms"    },
  { icon: Sparkles,      label: "Sample request forms"   },
  { icon: Bot,           label: "AI chatbot"             },
  { icon: MapPin,        label: "Google Maps CTA"        },
];

export default function LeadGen() {
  return (
    <section className="relative py-20 sm:py-28" data-testid="leadgen-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Lead Generation</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Turn visitors into <span className="gradient-text">customers</span>
          </h2>
          <p className="text-white/70 mt-4">
            Avero websites are engineered to capture leads through every channel — so no enquiry ever slips through.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {capture.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm text-white/85">
                <c.icon className="w-4 h-4 text-cyan-300" /> {c.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboard visual */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden"
            data-testid="leadgen-dashboard"
          >
            <div className="spot-glow w-72 h-72 bg-purple-600 -top-10 -right-10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 grid place-items-center font-heading font-black text-xs">A</div>
                <div>
                  <div className="text-sm font-heading font-bold">Avero — Enquiry Dashboard</div>
                  <div className="text-[11px] text-white/50">Live updates</div>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-300 border border-emerald-400/30 rounded-full px-2 py-1">● Online</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { l: "New Enquiries", v: "24", tint: "text-cyan-300" },
                { l: "WhatsApp Leads",v: "312", tint: "text-emerald-300" },
                { l: "Bookings",      v: "58", tint: "text-fuchsia-300" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">{s.l}</div>
                  <div className={`font-heading font-black text-2xl mt-1 ${s.tint}`}>{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-white/10 divide-y divide-white/5">
              {[
                { n: "Rohan Sharma",   b: "Café Owner",       ch: "WhatsApp",   t: "2m",  tint: "text-emerald-300" },
                { n: "Priya Nair",     b: "CA Firm",          ch: "Form",       t: "12m", tint: "text-cyan-300"    },
                { n: "Ayesha Khan",    b: "Makeup Academy",   ch: "Call",       t: "34m", tint: "text-fuchsia-300" },
                { n: "Karan Verma",    b: "Ecommerce Brand",  ch: "AI Chatbot", t: "1h",  tint: "text-purple-300"  },
              ].map((r, i) => (
                <motion.div
                  key={r.n}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 text-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/40 to-fuchsia-500/40 grid place-items-center text-xs font-bold">
                    {r.n[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{r.n}</div>
                    <div className="text-xs text-white/50 truncate">{r.b}</div>
                  </div>
                  <div className={`text-xs font-semibold ${r.tint}`}>{r.ch}</div>
                  <div className="text-xs text-white/40 w-8 text-right">{r.t}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
