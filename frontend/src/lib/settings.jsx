import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export const DEFAULT_SETTINGS = {
  starting_price: "₹2,999",
  original_price: "₹15,000",
  save_percent: 80,
  slots_left: 6,
  delivery: "48 Hours",
  offer_title: "Complete Business Website Package",
  offer_tagline: "Everything a modern business needs to look premium online — design, dev, hosting, SEO, AI chatbot & 48-hour delivery.",
  guarantee_note: "100% money-back if we miss 48H*",
  announcement_items: [
    "Launch Offer — Premium Website Starting at ₹2,999",
    "Website Delivery in 48 Hours",
    "Free Domain + Hosting Setup Available",
    "AI Chatbot + SEO-Ready Websites",
    "Trusted by Local Businesses, Salons, CA Firms & Ecommerce Brands",
  ],
  features: [
    "Website Delivery in 48 Hours",
    "Premium Custom Design",
    "Mobile Responsive",
    "SEO Setup + Meta Tags",
    "AI Chatbot Integration",
    "WhatsApp & Call CTAs",
    "Lead Enquiry Forms",
    "Hosting Setup + SSL",
    "Domain Setup Assistance",
    "Secure & Fast",
    "Google Analytics Ready",
    "1-Month Maintenance",
    "Priority Support",
    "Launch-Day Assistance",
  ],
  sections: {
    announcement: true,
    meme: true,
    problem: true,
    services: true,
    laptop3d: true,
    delivery: true,
    portfolio: true,
    threed_showcase: true,
    industries: true,
    pricing: true,
    why: true,
    before_after: true,
    lead_gen: true,
    ai: true,
    roadmap: true,
    blog: true,
    faq: true,
    chatbot: true,
    mobile_cta: true,
  },
};

const SettingsContext = createContext({ settings: DEFAULT_SETTINGS, loading: true, refresh: () => {} });

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/settings`);
      if (data && typeof data === "object") setSettings({ ...DEFAULT_SETTINGS, ...data });
    } catch (_) {
      // Silently fall back to defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh: load }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
