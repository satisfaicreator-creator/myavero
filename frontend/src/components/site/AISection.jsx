import { Bot, MessageCircle, ArrowRight, Sparkles, ShieldCheck, Clock, Calendar } from "lucide-react";

const features = [
  { icon: Clock,       t: "24/7 customer support"      },
  { icon: Sparkles,    t: "FAQs automation"            },
  { icon: MessageCircle,t:"Lead capture"                },
  { icon: ShieldCheck, t: "Service guidance"           },
  { icon: MessageCircle,t:"WhatsApp redirection"       },
  { icon: Bot,         t: "Business-specific answers"  },
  { icon: Calendar,    t: "Appointment assistance"     },
];

export default function AISection() {
  return (
    <section className="relative py-20 sm:py-28" data-testid="ai-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1 relative">
          <div className="glass-strong rounded-3xl p-6 border border-white/10 relative overflow-hidden max-w-md mx-auto">
            <div className="spot-glow w-64 h-64 bg-cyan-500 -top-8 -right-8" />
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 grid place-items-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-sm">Avero AI Assistant</div>
                <div className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="rounded-2xl rounded-tl-none bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/85 max-w-[85%]">
                Hi! 👋 I can help you build a website in <b>48 hours</b>. What business is this for?
              </div>
              <div className="rounded-2xl rounded-tr-none bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 px-3 py-2 text-sm text-white ml-auto max-w-[85%]">
                Salon in Jaipur — need bookings + gallery.
              </div>
              <div className="rounded-2xl rounded-tl-none bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/85 max-w-[85%]">
                Perfect! Starter plan at ₹2,999 fits. Want me to send a demo + WhatsApp our team?
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn-glow text-xs px-3 py-1.5 rounded-full">Yes, WhatsApp me</button>
                <button className="btn-ghost text-xs px-3 py-1.5 rounded-full">See Demo</button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">AI Chatbot</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Add an AI Chatbot to your <span className="gradient-text">website</span>
          </h2>
          <p className="text-white/70 mt-4">
            Let your website answer customer questions even when you're busy. Convert visitors into leads round-the-clock.
          </p>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/85">
                <f.icon className="w-4 h-4 text-cyan-300" /> {f.t}
              </li>
            ))}
          </ul>

          <a href="#contact" data-testid="ai-section-cta" className="mt-8 inline-flex btn-glow rounded-full px-6 py-3.5 text-sm font-semibold items-center gap-2">
            Add AI Chatbot <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
