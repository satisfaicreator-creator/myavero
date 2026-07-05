import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const demos = [
  {
    tag: "Wholesale • FMCG",
    title: "Premium Tea & Wholesale Website Concept",
    desc: "A warm, elegant wholesale product website with catalogue, enquiry form, sample request, reviews and location CTAs.",
    href: "https://kuber-enterprise-tea.vercel.app/",
    shot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fkuber-enterprise-tea.vercel.app%2F?w=1024&h=640",
    accent: "text-amber-300",
  },
  {
    tag: "Beauty • Salon",
    title: "Beauty Salon & Academy Website Concept",
    desc: "Premium beauty website for bridal makeup, salon services, academy enquiries, gallery, appointments and WhatsApp booking.",
    href: "https://makeup-by-harshita-jaipur.vercel.app/",
    shot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmakeup-by-harshita-jaipur.vercel.app%2F?w=1024&h=640",
    accent: "text-fuchsia-300",
  },
  {
    tag: "Finance • Compliance",
    title: "Finance & Compliance Workflow Website Concept",
    desc: "Modern finance workflow website with service sections, tax calculator, enquiry forms, compliance visuals and business trust UI.",
    href: "https://vk-associates.vercel.app/",
    shot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvk-associates.vercel.app%2F?w=1024&h=640",
    accent: "text-blue-300",
  },
  {
    tag: "3D • Ecommerce",
    title: "3D Ecommerce Product Website Concept",
    desc: "Next-gen interactive ecommerce with 3D product storytelling, scroll animations, catalogue and a premium shopping experience.",
    href: "https://orbit-carry-bag-3d-phi.vercel.app/",
    shot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Forbit-carry-bag-3d-phi.vercel.app%2F?w=1024&h=640",
    accent: "text-cyan-300",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="relative py-20 sm:py-28" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-3xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Live Demo Concepts</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
              See what <span className="gradient-text">Avero can deliver</span>
            </h2>
            <p className="text-white/70 mt-4">
              Explore live website concepts across different industries — real examples of the kind of premium digital experiences we can build for your business.
            </p>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {demos.map((d, i) => (
            <motion.a
              key={d.title}
              href={d.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group card-lift glass rounded-2xl overflow-hidden relative"
              data-testid={`portfolio-card-${i}`}
            >
              {/* Browser frame preview with live screenshot */}
              <div className="h-56 sm:h-64 relative overflow-hidden bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-500/20">
                <img
                  src={d.shot}
                  alt={d.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-white/90 bg-black/60 border border-white/20 rounded-full px-2.5 py-1 z-10">
                  Live Demo
                </div>
                <div className={`absolute bottom-3 left-4 z-10 text-[10px] uppercase tracking-widest ${d.accent} font-semibold`}>
                  {d.tag}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-lg font-bold">{d.title}</h3>
                <p className="text-sm text-white/65 mt-2 leading-relaxed">{d.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/50">Built with modern UI/UX + lead generation focus</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold ${d.accent}`}>
                    View Demo <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-white/50">
          These are Live Demo Concepts by Avero — showcasing the type of digital experiences we can craft for your industry. Not existing client cases.
        </div>
      </div>
    </section>
  );
}
