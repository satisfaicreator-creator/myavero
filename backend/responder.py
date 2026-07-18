"""Rule-based responder for Avero chatbot. Zero external API cost."""

RULES = [
    (["price", "cost", "pricing", "3999", "₹3,999", "how much", "kitna", "kharcha"],
     "Our Mega Launch Offer starts at ₹3,999 — everything included: design, development, hosting setup, SSL, SEO, chatbot, WhatsApp CTAs, enquiry forms, 1-month maintenance and 48-hour delivery. Final cost depends on pages, ecommerce, 3D or admin panel needs. Want a quick quote? WhatsApp us on +91-9680816234 with your business type."),
    (["48", "hour", "delivery", "fast", "quick", "jaldi", "turnaround"],
     "Yes — 48 hours is our flagship promise for standard business websites when your content and requirements are clear from day one. Ecommerce, admin panels or 3D websites may need a little longer. Want to start the clock today? WhatsApp us on +91-9680816234."),
    (["seo", "google", "rank", "ranking", "search"],
     "Every Avero site ships SEO-ready: clean structure, meta tags, fast loading, mobile-first design, image alt tags and local SEO basics. We don't promise a guaranteed #1 rank (nobody honest does), but we lay the foundation right so you can grow through content + backlinks."),
    (["ecom", "shop", "cart", "product", "store"],
     "Yes — we build ecommerce sites with product catalogues, cart, checkout-ready UI and enquiry-based product pages. Ecommerce is custom-quoted based on product count, payment gateway and admin panel needs. Share your product count on WhatsApp — we'll quote in one message."),
    (["3d", "three", "immersive", "animation", "cinematic"],
     "3D websites are our specialty — Three.js scenes, scroll-linked storytelling, 3D product viewers and cinematic hero sections. See our 3D ecommerce demo in the Work section. Interested? WhatsApp us with your product/brand so we can propose the right style."),
    (["domain", "hosting", "ssl", "dns"],
     "Yes — we handle domain purchase, hosting setup, SSL, DNS and full deployment. If you already have a domain, we'll configure it. If not, we can register it for you and configure everything for launch day."),
    (["chatbot", "chat bot", "bot"],
     "Yes — every Avero site can include a chatbot for FAQs, lead capture, 24/7 answers, appointment help and WhatsApp redirection. Fully customisable to your business."),
    (["ai marketing", "ai ads", "advertisement", "fine-tuning", "fine tuning", "training", "academy"],
     "Great question! AI Marketing Suites, AI Advertisement, Custom Model Fine-Tuning and Avero Academy trainings are on our 2027 roadmap. Reserve early access by dropping your email in the contact form or WhatsApp us — you'll be first in line."),
    (["contact", "whatsapp", "phone", "call", "email", "reach"],
     "Fastest way: WhatsApp +91-9680816234. Email: contact@theavero.dev. Or scroll to the Contact section on this page and fill the enquiry form — we usually reply within an hour."),
    (["business", "startup", "cafe", "salon", "ca ", "restaurant", "clinic", "doctor", "wholesale", "portfolio"],
     "We build for exactly this. Local businesses, salons, cafes, CAs, doctors, wholesalers, ecommerce brands and startups all get their own tailored template. WhatsApp us with your business type on +91-9680816234 and we'll share a matching demo."),
    (["timeline", "how long", "duration", "when"],
     "Standard business websites: 48 hours from content lock-in. Ecommerce or 3D sites: 5-10 days. Admin panels + custom features: 7-14 days. WhatsApp us with your needs and we'll commit to a delivery date upfront."),
    (["language", "hindi", "regional"],
     "Yes — this site itself has an English + हिंदी toggle in the header. We can build multi-language sites in Hindi, English or any regional language your customers speak."),
]

DEFAULT_REPLY = (
    "That's a great question! I'm a lightweight assistant, so for detailed answers our team is faster. "
    "WhatsApp us on +91-9680816234 or fill the contact form — we usually reply within an hour. "
    "Meanwhile, ask me about pricing, 48-hour delivery, SEO, ecommerce, 3D websites or our AI roadmap."
)


def match_reply(message: str) -> str:
    m = (message or "").lower()
    for keys, reply in RULES:
        if any(k in m for k in keys):
            return reply
    return DEFAULT_REPLY
