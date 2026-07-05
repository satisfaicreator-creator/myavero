import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ExternalLink, Rocket, MessageCircle, CalendarDays, Clock } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import MobileCTA from "@/components/site/MobileCTA";
import Chatbot from "@/components/site/Chatbot";
import { API_BASE, AVERO } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useI18n();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE}/blog/${slug}`)
      .then((r) => {
        setPost(r.data);
        document.title = `${r.data.title} · Avero Blog`;
        setMeta("description", r.data.excerpt);
        // Article JSON-LD
        injectJsonLd("blog-post-jsonld", {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": r.data.title,
          "description": r.data.excerpt,
          "image": r.data.cover_url,
          "datePublished": r.data.date,
          "author": { "@type": "Organization", "name": "Avero" },
          "publisher": {
            "@type": "Organization",
            "name": "Avero",
            "logo": { "@type": "ImageObject", "url": "https://theavero.dev/og-cover.jpg" },
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://theavero.dev/blog/${r.data.slug}`,
          },
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
    return () => {
      const s = document.getElementById("blog-post-jsonld");
      if (s) s.remove();
    };
  }, [slug]);

  if (loading) return <ShellLoading />;
  if (notFound || !post) return <ShellNotFound />;

  return (
    <div className="min-h-screen" data-testid="blog-post-page">
      <AnnouncementBar />
      <Header />
      <main className="pb-24">
        <article className="relative">
          {/* Hero image */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <img src={post.cover_url} alt={post.title} className="absolute inset-0 w-full h-full object-cover object-top opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/80 to-[#050816]" />
            <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <Link to="/blog" className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1" data-testid="blog-post-back">
                <ArrowLeft className="w-3.5 h-3.5" /> {t("common.back")}
              </Link>
              <div className="mt-3 inline-block px-2 py-1 rounded-full text-[10px] uppercase tracking-widest border border-white/20 bg-black/60 text-cyan-200">
                {post.tag}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight" data-testid="blog-post-title">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/60">
                <span className="inline-flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.read_time}</span>
                {post.demo_url && (
                  <a href={post.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-300 hover:text-white" data-testid="blog-post-demo">
                    <ExternalLink className="w-3.5 h-3.5" /> View live demo
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div
              className="prose-avero"
              data-testid="blog-post-body"
              dangerouslySetInnerHTML={{ __html: post.body_html }}
            />

            {/* Post CTA */}
            <div className="mt-12 neon-border">
              <div className="rounded-2xl p-6 sm:p-8 bg-[#090B18]">
                <h3 className="font-heading text-2xl font-bold">Want a website like this?</h3>
                <p className="text-white/70 text-sm mt-2">
                  Avero ships premium websites in 48 hours — starting {AVERO.startingPrice}. Message us and we'll quote in one WhatsApp.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Link to="/#contact" className="btn-glow rounded-full px-5 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2" data-testid="blog-post-cta">
                    <Rocket className="w-4 h-4" /> Start My Project
                  </Link>
                  <a href={AVERO.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost rounded-full px-5 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <MobileCTA />
      <Chatbot />
    </div>
  );
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
function injectJsonLd(id, data) {
  let s = document.getElementById(id);
  if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = id; document.head.appendChild(s); }
  s.text = JSON.stringify(data);
}

function ShellLoading() {
  return (
    <div className="min-h-screen grid place-items-center text-white/60">Loading…</div>
  );
}
function ShellNotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold">Post not found</h1>
        <p className="text-white/60 mt-2 text-sm">The story you're looking for isn't here (yet).</p>
        <Link to="/blog" className="mt-6 inline-flex btn-ghost rounded-full px-5 py-2 text-sm">← Back to blog</Link>
      </div>
    </div>
  );
}
