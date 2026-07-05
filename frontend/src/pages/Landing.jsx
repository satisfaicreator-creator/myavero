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
import ContactForm from "@/components/site/ContactForm";
import FAQ from "@/components/site/FAQ";
import Footer from "@/components/site/Footer";
import MobileCTA from "@/components/site/MobileCTA";
import Chatbot from "@/components/site/Chatbot";

export default function Landing() {
  useEffect(() => {
    document.title = "Avero | Premium Website Development, SEO, Hosting & AI Chatbots";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Avero is a modern IT studio delivering premium AI-powered websites in 48 hours (starting ₹2,999) — with AI marketing, advertising, model fine-tuning and trainings on the roadmap.");
    setMeta("keywords", "website development India, business website, 48 hour website delivery, AI chatbot website, AI marketing agency, AI advertisement, model fine-tuning, IT solutions India, premium website design, Avero, theavero.dev");

    // Structured data
    const sd = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Avero",
      "slogan": "We Design. You Grow.",
      "url": "https://theavero.dev",
      "email": "satisfaicreator@gmail.com",
      "telephone": "+91-9680816234",
      "priceRange": "₹₹",
      "areaServed": "IN",
      "offers": {
        "@type": "Offer",
        "name": "Starter Website Package",
        "price": "2999",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+91-9680816234",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"]
      }]
    };
    let script = document.getElementById("avero-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "avero-jsonld";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(sd);
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
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
      <Chatbot />
    </div>
  );
}
