import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowRight, Newspaper } from "lucide-react";
import { API_BASE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

export default function BlogSection() {
  const { t } = useI18n();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/blog`)
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : [];
        setPosts(data.slice(0, 3));
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !Array.isArray(posts) || posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-20 sm:py-28" data-testid="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-4xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{t("sec.blog.eyebrow")}</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
              {t("sec.blog.title.a")} <span className="gradient-text">{t("sec.blog.title.b")}</span>
            </h2>
          </div>
          <a
            href="/blog"
            className="btn-ghost rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shrink-0"
            data-testid="blog-view-all"
          >
            <Newspaper className="w-4 h-4 text-cyan-300" /> {t("sec.blog.readAll")}
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.a
              key={p.slug}
              href={`/blog/${p.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group card-lift glass rounded-2xl overflow-hidden"
              data-testid={`blog-card-${p.slug}`}
            >
              <div className="h-44 relative overflow-hidden bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-500/20">
                <img
                  src={p.cover_url}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-[10px] uppercase tracking-widest border border-white/20 bg-black/60 text-cyan-200">
                  {p.tag}
                </div>
              </div>
              <div className="p-5">
                <div className="text-[10px] text-white/50 uppercase tracking-widest">{p.date} · {p.read_time}</div>
                <h3 className="font-heading font-bold text-base sm:text-lg mt-2 leading-snug line-clamp-2">{p.title}</h3>
                <p className="text-sm text-white/65 mt-2 line-clamp-3">{p.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300">
                  {t("sec.blog.readPost")} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
