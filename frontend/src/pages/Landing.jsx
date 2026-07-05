import { useEffect } from "react";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import MemeSection from "@/components/site/MemeSection";
import ProblemSection from "@/components/site/ProblemSection";
import Services from "@/components/site/Services";
import Laptop3D from "@/components/site/Laptop3D";
import Delivery from "@/components/site/Delivery";
import Portfolio from "@/components/site/Portfolio";
import ThreeDShowcase from "@/components/site/ThreeDShowcase";
import Industries from "@/components/site/Industries";
import Pricing from "@/components/site/Pricing";
import WhyAvero from "@/components/site/WhyAvero";
import BeforeAfter from "@/components/site/BeforeAfter";
import LeadGen from "@/components/site/LeadGen";
import AISection from "@/components/site/AISection";
import Roadmap from "@/components/site/Roadmap";
import BlogSection from "@/components/site/BlogSection";
import ContactForm from "@/components/site/ContactForm";
import FAQ from "@/components/site/FAQ";
import Footer from "@/components/site/Footer";
import MobileCTA from "@/components/site/MobileCTA";
import Chatbot from "@/components/site/Chatbot";

export default function Landing() {
  useEffect(() => {
    document.title = "Avero | Premium Websites in 48 Hours · Starting ₹2,999";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const setProp = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const upsertLink = (rel, href, extra = {}) => {
      let el = document.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ""}`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        if (extra.hreflang) el.setAttribute("hreflang", extra.hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };
    const injectJsonLd = (id, data) => {
      let s = document.getElementById(id);
      if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = id; document.head.appendChild(s); }
      s.text = JSON.stringify(data);
    };

    setMeta("description", "Avero is a modern IT studio delivering premium AI-powered websites in 48 hours (starting ₹2,999) — with AI marketing, advertising, model fine-tuning and trainings on the roadmap.");
    setMeta("keywords", "website development India, business website, 48 hour website delivery, AI chatbot website, AI marketing agency, AI advertisement, model fine-tuning, IT solutions India, premium website design, Avero, theavero.dev");
    setProp("og:title", "Avero | Premium Websites in 48 Hours · Starting ₹2,999");
    setProp("og:description", "Modern IT studio delivering premium AI-powered websites in 48 hours. AI marketing, ads & model fine-tuning coming soon.");
    setProp("og:url", "https://theavero.dev/");
    upsertLink("canonical", "https://theavero.dev/");
    upsertLink("alternate", "https://theavero.dev/", { hreflang: "en" });
    upsertLink("alternate", "https://theavero.dev/?lang=hi", { hreflang: "hi" });
    upsertLink("alternate", "https://theavero.dev/", { hreflang: "x-default" });

    // Multiple JSON-LD blocks for rich results
    injectJsonLd("avero-jsonld-org", {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Avero",
      "alternateName": "The Avero Studio",
      "url": "https://theavero.dev",
      "logo": "https://theavero.dev/og-cover.jpg",
      "slogan": "We Design. You Grow.",
      "email": "satisfaicreator@gmail.com",
      "telephone": "+91-9680816234",
      "sameAs": []
    });
    injectJsonLd("avero-jsonld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Avero",
      "url": "https://theavero.dev",
      "inLanguage": ["en-IN", "hi-IN"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://theavero.dev/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    injectJsonLd("avero-jsonld-service", {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Avero",
      "slogan": "We Design. You Grow.",
      "url": "https://theavero.dev",
      "email": "satisfaicreator@gmail.com",
      "telephone": "+91-9680816234",
      "priceRange": "₹₹",
      "areaServed": "IN",
      "serviceType": ["Web Design", "Web Development", "AI Chatbot Integration", "SEO", "Hosting", "Maintenance"],
      "offers": {
        "@type": "Offer",
        "name": "Complete Business Website Package",
        "price": "2999",
        "priceCurrency": "INR",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://theavero.dev/#pricing"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+91-9680816234",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"]
      }]
    });
    injectJsonLd("avero-jsonld-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Can you really deliver a website in 48 hours?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — for starter and standard business websites when content and requirements are clear. Advanced sites, ecommerce, admin panels or 3D websites may take a little longer." } },
        { "@type": "Question", "name": "What is included in ₹2,999?", "acceptedAnswer": { "@type": "Answer", "text": "A starter website package with responsive design, contact/WhatsApp CTAs and essential sections. Final price depends on features you add." } },
        { "@type": "Question", "name": "Do you provide domain and hosting?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we can help with domain, hosting, SSL, DNS and deployment setup." } },
        { "@type": "Question", "name": "Do you make SEO-ready websites?", "acceptedAnswer": { "@type": "Answer", "text": "We build websites with SEO-friendly structure, metadata, fast loading and local SEO basics." } },
        { "@type": "Question", "name": "Can you build a 3D website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we create interactive Three.js sites, 3D product sections, scroll animations and cinematic landing pages." } }
      ]
    });
    injectJsonLd("avero-jsonld-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://theavero.dev/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://theavero.dev/#services" },
        { "@type": "ListItem", "position": 3, "name": "Work", "item": "https://theavero.dev/#work" },
        { "@type": "ListItem", "position": 4, "name": "Pricing", "item": "https://theavero.dev/#pricing" },
        { "@type": "ListItem", "position": 5, "name": "Blog", "item": "https://theavero.dev/blog" }
      ]
    });
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" data-testid="landing-page">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <MemeSection />
        <ProblemSection />
        <Services />
        <Laptop3D />
        <Delivery />
        <Portfolio />
        <ThreeDShowcase />
        <Industries />
        <Pricing />
        <WhyAvero />
        <BeforeAfter />
        <LeadGen />
        <AISection />
        <Roadmap />
        <BlogSection />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
      <Chatbot />
    </div>
  );
}
