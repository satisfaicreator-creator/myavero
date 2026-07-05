import { motion } from "framer-motion";
import {
  Calculator, Scissors, Sparkles, Coffee, Building2, Utensils, GraduationCap, Stethoscope,
  ShoppingCart, Truck, Store, Rocket, User, Wrench
} from "lucide-react";

const industries = [
  { icon: Calculator,   name: "CA Firms & Finance",     benefit: "Trust-building sites that convert leads into consultations." },
  { icon: Scissors,     name: "Salons & Beauty",        benefit: "Booking flows + WhatsApp to fill your calendar." },
  { icon: Sparkles,     name: "Makeup Academies",       benefit: "Course pages, batches & student enquiry forms." },
  { icon: Coffee,       name: "Tea, FMCG & Wholesale",  benefit: "Product catalogue, samples & bulk enquiry forms." },
  { icon: Building2,    name: "Real Estate",            benefit: "Property listings, virtual tours & lead capture." },
  { icon: Utensils,     name: "Restaurants & Cafés",    benefit: "Menu, reservations & Google Maps CTA." },
  { icon: GraduationCap,name: "Coaching Institutes",    benefit: "Course pages, admissions & demo class forms." },
  { icon: Stethoscope,  name: "Doctors & Clinics",      benefit: "Appointment forms, services & trust badges." },
  { icon: ShoppingCart, name: "Ecommerce Brands",       benefit: "Fast product catalogues with checkout-ready UI." },
  { icon: Truck,        name: "Logistics & Shipping",   benefit: "Rate quotes, tracking CTAs & B2B lead forms." },
  { icon: Store,        name: "Local Shops",            benefit: "Simple sites that show your shop is trustworthy." },
  { icon: Rocket,       name: "Startups",               benefit: "Investor-ready landing pages & product sites." },
  { icon: User,         name: "Portfolio Websites",     benefit: "Freelancer & creator sites that impress instantly." },
  { icon: Wrench,       name: "Service Businesses",     benefit: "Enquiry-driven sites tailored to your services." },
];

export default function Industries() {
  return (
    <section className="relative py-20 sm:py-28" data-testid="industries-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Who we build for</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Websites for every type of <span className="gradient-text">business</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="glass rounded-xl p-4 sm:p-5 card-lift"
              data-testid={`industry-card-${i}`}
            >
              <div className="w-9 h-9 rounded-lg grid place-items-center bg-gradient-to-br from-cyan-500/15 to-purple-500/15 border border-white/10">
                <it.icon className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="font-heading font-semibold mt-3 text-sm sm:text-base">{it.name}</div>
              <div className="text-xs text-white/60 mt-1 leading-relaxed">{it.benefit}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
