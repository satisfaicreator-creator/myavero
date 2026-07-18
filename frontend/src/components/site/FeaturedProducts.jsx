import { ArrowUpRight, Bot, Brain, Sparkles, Zap } from "lucide-react";

const products = [
  {
    title: "35L Pipeline",
    description: "An AI-powered job search command center for tracking target companies, matching resumes to real job descriptions, and uncovering the skills that matter most across your ideal roles.",
    href: "https://35l-pipeline.vercel.app/",
    badge: "Featured",
    logo: "data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(59,130,246);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(139,92,246);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='url(%23grad1)' stroke-width='12'/%3E%3Ctext x='100' y='115' font-size='60' font-weight='bold' text-anchor='middle' fill='%23d1d5db'%3E35L%3C/text%3E%3Crect x='140' y='85' width='20' height='40' fill='%23fbbf24'/%3E%3Ccircle cx='280' cy='100' r='8' fill='%233b82f6'/%3E%3Ccircle cx='310' cy='100' r='10' fill='%233b82f6'/%3E%3Ccircle cx='340' cy='100' r='12' fill='%238b5cf6'/%3E%3Cpath d='M 160 100 L 360 100' stroke='%23fbbf24' stroke-width='8' stroke-linecap='round' fill='none'/%3E%3C/svg%3E",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="featured-products" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
              <Sparkles size={14} /> Featured Products
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              AI utility for everyday work, smarter decisions, and modern automation.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 max-w-xl">
              We build practical AI products that help people save time, streamline repetitive tasks, and turn everyday workflows into sharper, more intelligent experiences.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-1">
          {products.map((product) => (
            <a
              key={product.title}
              href={product.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(135deg,rgba(10,14,31,0.95),rgba(15,23,42,0.92))] p-6 sm:p-8 shadow-[0_30px_90px_-35px_rgba(34,211,238,0.35)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),rgba(255,255,255,0))] opacity-70" />
              <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br from-cyan-500/25 via-purple-500/20 to-fuchsia-500/25 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyan-500/10 to-transparent" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.16)]">
                    <Brain className="h-6 w-6" />
                    <span className="absolute -bottom-1 -right-1 rounded-full border border-white/10 bg-slate-950/90 p-1 text-[10px] text-cyan-300">
                      <Zap className="h-3 w-3" />
                    </span>
                  </div>

                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-fuchsia-300">
                      {product.badge}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{product.title}</h3>
                    <p className="mt-2 text-sm sm:text-base text-white/70">{product.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-200">
                        AI workflow
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-200">
                        Utility-first
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-200">
                        Automation
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition-all duration-200 group-hover:translate-x-1 group-hover:bg-cyan-500/20">
                  Visit product
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
