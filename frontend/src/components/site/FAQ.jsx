import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Can you really deliver a website in 48 hours?", a: "Yes, for starter and standard business websites when content and requirements are clear. Advanced sites, ecommerce, admin panels or 3D websites may take a little longer." },
  { q: "What is included in ₹2,999?", a: "A starter website package with basic responsive design, contact / WhatsApp CTA and essential sections. Final price depends on features you add." },
  { q: "Do you provide domain and hosting?", a: "Yes — we can help with domain, hosting, SSL, DNS and deployment setup." },
  { q: "Can you add WhatsApp button and enquiry forms?", a: "Every website can include WhatsApp, call, email and enquiry forms out of the box." },
  { q: "Do you make SEO-ready websites?", a: "We build websites with an SEO-friendly structure, metadata, fast loading and local business optimization basics." },
  { q: "Can you build ecommerce websites?", a: "Yes — product catalogues, ecommerce UI, cart flow, checkout-ready structures and enquiry-based product websites." },
  { q: "Can you build a 3D website?", a: "Absolutely — we create interactive Three.js sites, 3D product sections, scroll animations and cinematic landing pages." },
  { q: "Do you provide maintenance?", a: "Yes — maintenance support is available for updates, backups, performance, security and content changes." },
];

export default function FAQ() {
  return (
    <section className="relative py-20 sm:py-28" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </div>

        <div className="mt-12 glass rounded-2xl p-2 sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger data-testid={`faq-q-${i}`} className="text-left text-base sm:text-lg font-heading font-semibold hover:no-underline px-3">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent data-testid={`faq-a-${i}`} className="text-sm sm:text-base text-white/70 px-3">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
