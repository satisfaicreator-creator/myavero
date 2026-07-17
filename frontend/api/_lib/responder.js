/**
 * Rule-based responder for Avero. Zero external API cost.
 * Matches keywords in the user's message to canned answers.
 * Streams the response word-by-word so the UX feels alive.
 */
const RULES = [
  {
    keys: ["price", "cost", "pricing", "3999", "₹3,999", "how much", "kitna", "kharcha"],
    reply: "Our Mega Launch Offer starts at ₹3,999 — everything included: design, development, hosting setup, SSL, SEO, AI-style chatbot, WhatsApp CTAs, enquiry forms, 1-month maintenance and 48-hour delivery. Final cost depends on pages, ecommerce, 3D or admin panel needs. Want a quick quote? WhatsApp us on +91-9680816234 with your business type."
  },
  {
    keys: ["48", "hour", "delivery", "fast", "quick", "jaldi", "turnaround"],
    reply: "Yes — 48 hours is our flagship promise for standard business websites when your content and requirements are clear from day one. Ecommerce, admin panels or 3D websites may need a little longer. Want to start the clock today? WhatsApp us on +91-9680816234."
  },
  {
    keys: ["seo", "google", "rank", "ranking", "search"],
    reply: "Every Avero site ships SEO-ready: clean structure, meta tags, fast loading, mobile-first design, image alt tags and local SEO basics. We don't promise a guaranteed #1 rank (nobody honest does), but we lay the foundation right so you can grow through content + backlinks."
  },
  {
    keys: ["ecom", "shop", "cart", "product", "store"],
    reply: "Yes — we build ecommerce sites with product catalogues, cart, checkout-ready UI and enquiry-based product pages. Ecommerce is custom-quoted based on product count, payment gateway and admin panel needs. Share your product count on WhatsApp — we'll quote in one message."
  },
  {
    keys: ["3d", "three", "immersive", "animation", "cinematic"],
    reply: "3D websites are our specialty — Three.js scenes, scroll-linked storytelling, 3D product viewers and cinematic hero sections. See our 3D ecommerce demo linked in the Work section. Interested? WhatsApp us with your product/brand so we can propose the right style."
  },
  {
    keys: ["domain", "hosting", "ssl", "dns"],
    reply: "Yes — we handle domain purchase, hosting setup, SSL, DNS and full deployment. If you already have a domain, we'll configure it. If not, we can register it for you and configure everything for launch day."
  },
  {
    keys: ["chatbot", "chat bot", "ai bot", "whatsapp bot"],
    reply: "Yes — every Avero site can include a chatbot for FAQs, lead capture, 24/7 answers, appointment help and WhatsApp redirection. Fully customisable to your business."
  },
  {
    keys: ["ai marketing", "ai ads", "advertisement", "fine-tuning", "fine tuning", "training", "academy"],
    reply: "Great question! AI Marketing Suites, AI Advertisement, Custom Model Fine-Tuning and Avero Academy trainings are on our 2027 roadmap. Reserve early access by dropping your email in the contact form or WhatsApp us — you'll be first in line."
  },
  {
    keys: ["contact", "whatsapp", "phone", "call", "email", "reach"],
    reply: "Fastest way: WhatsApp +91-9680816234. Email: contact@theavero.dev. Or scroll to the Contact section on this page and fill the enquiry form — we usually reply within an hour."
  },
  {
    keys: ["business", "startup", "shop", "cafe", "salon", "ca ", "restaurant", "clinic", "doctor", "wholesale", "portfolio"],
    reply: "We build for exactly this. Local businesses, salons, cafes, CAs, doctors, wholesalers, ecommerce brands and startups all get their own tailored template. WhatsApp us with your business type on +91-9680816234 and we'll share a matching demo."
  },
  {
    keys: ["timeline", "how long", "duration", "when"],
    reply: "Standard business websites: 48 hours from content lock-in. Ecommerce or 3D sites: 5-10 days. Admin panels + custom features: 7-14 days. WhatsApp us with your needs and we'll commit to a delivery date upfront."
  },
  {
    keys: ["language", "hindi", "regional"],
    reply: "Yes — this site itself has an English + हिंदी toggle in the header. We can build multi-language sites in Hindi, English or any regional language your customers speak."
  },
];

const DEFAULT_REPLY = "That's a great question! I'm a lightweight assistant, so for detailed answers our team is faster. WhatsApp us on +91-9680816234 or fill the contact form — we usually reply within an hour. Meanwhile, ask me about pricing, 48-hour delivery, SEO, ecommerce, 3D websites or our AI roadmap.";

function matchReply(message) {
  const m = (message || "").toLowerCase();
  for (const rule of RULES) {
    if (rule.keys.some((k) => m.includes(k))) return rule.reply;
  }
  return DEFAULT_REPLY;
}

export { matchReply };
