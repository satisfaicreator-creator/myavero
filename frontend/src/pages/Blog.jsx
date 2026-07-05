import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import MobileCTA from "@/components/site/MobileCTA";
import Chatbot from "@/components/site/Chatbot";
import { API_BASE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

export default function Blog() {
  const { t } = useI18n();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Avero Blog | Case Studies · Insights · AI + Web";
    axios.get(`${API_BASE}/blog`)
      .then((r) => setPosts(r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen" data-testid="blog-page">
      <AnnouncementBar />
      <Header />
      <main className="pt-6 pb-24">
        <section className="relative py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{t("sec.blog.eyebrow")}</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 leading-[1.05]">
              {t("sec.blog.title.a")} <span className="gradient-text">{t("sec.blog.title.b")}</span>
            </h1>
            <p className="text-white/70 mt-4 max-w-2xl">
              Real stories of Indian businesses that shipped a modern website with Avero and grew online in weeks — not months.
            </p>

            {loading ? (
              <div className="mt-16 text-center text-white/50">{t("common.loading")}</div>
            ) : posts.length === 0 ? (
              <div className="mt-16 text-center">
                <Newspaper className="w-8 h-8 text-white/40 mx-auto" />
                <div className="text-white/60 mt-3 text-sm">No posts yet — check back soon.</div>
              </div>
            ) : (
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group card-lift glass rounded-2xl overflow-hidden"
                    data-testid={`blog-list-${p.slug}`}
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
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
      <Chatbot />
    </div>
  );
}
