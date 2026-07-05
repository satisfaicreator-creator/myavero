const items = [
  "Launch Offer — Premium Website Starting at ₹2,999",
  "Website Delivery in 48 Hours",
  "Free Domain + Hosting Setup Available",
  "AI Chatbot + SEO-Ready Websites",
  "Trusted by Local Businesses, Salons, CA Firms & Ecommerce Brands",
];

export default function AnnouncementBar() {
  const loop = [...items, ...items];
  return (
    <div
      data-testid="announcement-bar"
      className="relative overflow-hidden border-b border-white/10 bg-black/70 backdrop-blur"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10 pointer-events-none" />
      <div className="marquee-track whitespace-nowrap flex text-xs sm:text-[13px] py-2">
        {loop.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2 text-white/80">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
