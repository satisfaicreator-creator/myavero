import { getDb } from "./db.js";

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
};

export async function getSettings() {
  const db = await getDb();
  const doc = await db.collection("settings").findOne({ key: "site" }, { projection: { _id: 0, key: 0 } });
  if (doc) return { ...DEFAULT_SETTINGS, ...doc };
  await db.collection("settings").insertOne({
    key: "site",
    ...DEFAULT_SETTINGS,
    updated_at: new Date().toISOString(),
  });
  return DEFAULT_SETTINGS;
}

export async function updateSettings(payload) {
  const db = await getDb();
  const clean = {};
  const keys = Object.keys(DEFAULT_SETTINGS);
  for (const k of keys) {
    if (payload[k] !== undefined) clean[k] = payload[k];
  }
  if (typeof clean.save_percent === "string") clean.save_percent = Number(clean.save_percent) || 0;
  if (typeof clean.slots_left === "string") clean.slots_left = Number(clean.slots_left) || 0;
  clean.updated_at = new Date().toISOString();
  await db.collection("settings").updateOne({ key: "site" }, { $set: clean }, { upsert: true });
  return getSettings();
}
