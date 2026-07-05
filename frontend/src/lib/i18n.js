import { createContext, useContext, useEffect, useMemo, useState } from "react";

/** Very lightweight i18n. Two locales: en (default) + hi (हिंदी).
 *  Only high-conversion visible strings are translated — anything else falls back to English.
 */
const dict = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.threeD": "3D Sites",
    "nav.process": "Process",
    "nav.pricing": "Pricing",
    "nav.why": "Why Avero",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "cta.whatsapp": "WhatsApp",
    "cta.startProject": "Start Project",

    // Hero
    "hero.eyebrow": "Premium Web Design & Development",
    "hero.h1a": "Next-Gen Websites",
    "hero.h1b": "That",
    "hero.h1c": "Your Business",
    "hero.rotate.grow": "Grow",
    "hero.rotate.convert": "Convert",
    "hero.rotate.rank": "Rank",
    "hero.rotate.impress": "Impress",
    "hero.rotate.sell": "Sell",
    "hero.rotate.scale": "Scale",
    "hero.sub": "Avero is a modern IT studio — starting with the fastest premium websites in India: AI chatbots, SEO, hosting, maintenance & 48-hour delivery. Coming soon: AI marketing, ads & model fine-tuning for your business.",
    "hero.cta.primary": "Get Website in 48 Hours",
    "hero.cta.whatsapp": "WhatsApp Now",
    "hero.cta.demos": "View Live Demos",

    // Coming soon strip
    "cs.pill": "Coming Soon",
    "cs.tag": "2027 Roadmap",
    "cs.item1": "AI Marketing Suites",
    "cs.item2": "AI Advertisement Engine",
    "cs.item3": "Custom Model Fine-Tuning",
    "cs.item4": "Avero Academy · Trainings",
    "cs.caption.a": "Websites today · ",
    "cs.caption.b": "an entire AI growth stack tomorrow",
    "cs.caption.c": ". Avero is quietly building the future — you get to be an early insider.",

    // Sections
    "sec.problem.eyebrow": "The Real Problem",
    "sec.problem.title.a": "Your business is good…",
    "sec.problem.title.b": "but can customers find you online?",
    "sec.services.eyebrow": "Services",
    "sec.services.title.a": "Everything your business needs to",
    "sec.services.title.b": "go online",
    "sec.pricing.title.a": "One website.",
    "sec.pricing.title.b": "Everything included.",
    "sec.pricing.pillOffer": "Launch Offer · Limited Slots This Month",
    "sec.contact.eyebrow": "Contact",
    "sec.contact.title.a": "Let's build your",
    "sec.contact.title.b": "online presence",
    "sec.blog.eyebrow": "Insights · Case Studies",
    "sec.blog.title.a": "How real businesses",
    "sec.blog.title.b": "grow with Avero",
    "sec.blog.readAll": "Read all case studies",
    "sec.blog.readPost": "Read case study",

    // Common
    "common.loading": "Loading…",
    "common.back": "← Back",
    "common.language": "Language",
  },
  hi: {
    "nav.home": "होम",
    "nav.services": "सेवाएँ",
    "nav.work": "कार्य",
    "nav.threeD": "3D साइट्स",
    "nav.process": "प्रक्रिया",
    "nav.pricing": "मूल्य",
    "nav.why": "क्यों Avero",
    "nav.contact": "संपर्क",
    "nav.blog": "ब्लॉग",
    "cta.whatsapp": "व्हाट्सएप",
    "cta.startProject": "प्रोजेक्ट शुरू करें",

    "hero.eyebrow": "प्रीमियम वेब डिज़ाइन और डेवलपमेंट",
    "hero.h1a": "अगली-पीढ़ी की वेबसाइट्स",
    "hero.h1b": "जो",
    "hero.h1c": "आपके व्यवसाय को",
    "hero.rotate.grow": "बढ़ाएँ",
    "hero.rotate.convert": "बदलें",
    "hero.rotate.rank": "रैंक करें",
    "hero.rotate.impress": "प्रभावित करें",
    "hero.rotate.sell": "बेचें",
    "hero.rotate.scale": "विकसित करें",
    "hero.sub": "Avero एक आधुनिक IT स्टूडियो है — भारत की सबसे तेज़ प्रीमियम वेबसाइट्स से शुरुआत: AI चैटबॉट, SEO, होस्टिंग, मेंटेनेंस और 48-घंटे डिलीवरी। जल्द ही: AI मार्केटिंग, विज्ञापन और मॉडल फाइन-ट्यूनिंग।",
    "hero.cta.primary": "48 घंटे में वेबसाइट पाएं",
    "hero.cta.whatsapp": "अभी व्हाट्सएप करें",
    "hero.cta.demos": "लाइव डेमो देखें",

    "cs.pill": "जल्द आ रहा है",
    "cs.tag": "2027 रोडमैप",
    "cs.item1": "AI मार्केटिंग सुइट्स",
    "cs.item2": "AI विज्ञापन इंजन",
    "cs.item3": "कस्टम मॉडल फाइन-ट्यूनिंग",
    "cs.item4": "Avero अकादमी · ट्रेनिंग्स",
    "cs.caption.a": "आज वेबसाइट्स · ",
    "cs.caption.b": "कल पूरा AI ग्रोथ स्टैक",
    "cs.caption.c": "। Avero भविष्य चुपचाप बना रहा है — आप शुरुआती इनसाइडर हैं।",

    "sec.problem.eyebrow": "असली समस्या",
    "sec.problem.title.a": "आपका व्यवसाय अच्छा है…",
    "sec.problem.title.b": "लेकिन क्या ग्राहक आपको ऑनलाइन ढूँढ पा रहे हैं?",
    "sec.services.eyebrow": "सेवाएँ",
    "sec.services.title.a": "आपके व्यवसाय के लिए ऑनलाइन जाने का",
    "sec.services.title.b": "पूरा समाधान",
    "sec.pricing.title.a": "एक वेबसाइट.",
    "sec.pricing.title.b": "सब कुछ शामिल.",
    "sec.pricing.pillOffer": "लॉन्च ऑफर · इस महीने सीमित स्लॉट्स",
    "sec.contact.eyebrow": "संपर्क",
    "sec.contact.title.a": "आइए बनाते हैं आपकी",
    "sec.contact.title.b": "ऑनलाइन पहचान",
    "sec.blog.eyebrow": "इनसाइट्स · केस स्टडीज़",
    "sec.blog.title.a": "असली व्यवसाय",
    "sec.blog.title.b": "Avero के साथ कैसे बढ़ते हैं",
    "sec.blog.readAll": "सभी केस स्टडीज़ पढ़ें",
    "sec.blog.readPost": "केस स्टडी पढ़ें",

    "common.loading": "लोड हो रहा है…",
    "common.back": "← वापस",
    "common.language": "भाषा",
  },
};

const I18nContext = createContext({ lang: "en", t: (k) => k, setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "en";
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "hi" || q === "en") return q;
    return localStorage.getItem("avero_lang") || "en";
  });

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("avero_lang", l); } catch (_) {}
  };

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  const value = useMemo(() => {
    const table = dict[lang] || dict.en;
    return {
      lang,
      setLang,
      t: (key) => table[key] ?? dict.en[key] ?? key,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
