import { Phone, Mail, Globe, MessageCircle, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import AveroLogo from "./AveroLogo";
import { AVERO } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 mt-10" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <AveroLogo />
            <p className="text-white/60 mt-5 max-w-md">
              Avero builds modern websites, AI-powered experiences and digital presence for growing businesses.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Linkedin, Facebook].map((I, i) => (
                <a key={i} href="#" className="btn-ghost rounded-full w-9 h-9 grid place-items-center" aria-label="Social">
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {["Custom Websites","Ecommerce","Landing Pages","3D Websites","SEO Setup","AI Chatbots","Domain + Hosting","Maintenance"].map((l) => (
                <li key={l}><a href="#services" className="hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Demos</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a target="_blank" rel="noreferrer" href="https://kuber-enterprise-tea.vercel.app/" className="hover:text-white">Wholesale</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://makeup-by-harshita-jaipur.vercel.app/" className="hover:text-white">Beauty</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://vk-associates.vercel.app/" className="hover:text-white">Finance</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://orbit-carry-bag-3d-phi.vercel.app/" className="hover:text-white">3D Ecommerce</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href={`tel:+${AVERO.phoneRaw}`} className="hover:text-white inline-flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{AVERO.phone}</a></li>
              <li><a href={AVERO.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5" />WhatsApp</a></li>
              <li><a href={`mailto:${AVERO.email}`} className="hover:text-white inline-flex items-center gap-2"><Mail className="w-3.5 h-3.5" />Email</a></li>
              <li><a href={AVERO.website} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-2"><Globe className="w-3.5 h-3.5" />theavero.dev</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-white/10 text-xs text-white/40">
          <div>© {year} Avero. All rights reserved.</div>
          <div>We Design. You Grow.</div>
          <div>
            <a href="/admin/login" className="hover:text-white/70">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
