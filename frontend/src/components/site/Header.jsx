import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Rocket } from "lucide-react";
import AveroLogo from "./AveroLogo";
import LanguageToggle from "./LanguageToggle";
import { AVERO } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

const NAV_KEYS = [
  { label: "nav.home",     href: "/#home" },
  { label: "nav.services", href: "/#services" },
  { label: "nav.work",     href: "/#work" },
  { label: "nav.pricing",  href: "/#pricing" },
  { label: "nav.why",      href: "/#why" },
  { label: "nav.blog",     href: "/blog" },
  { label: "nav.contact",  href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-16 sm:h-20">
        <a href="#home" className="flex items-center shrink-0" aria-label="Avero home">
          <AveroLogo compact />
        </a>

        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_KEYS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-${n.label.split(".")[1]}`}
              className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors relative group whitespace-nowrap"
            >
              {t(n.label)}
              <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <LanguageToggle />
          <a
            href={AVERO.whatsapp}
            target="_blank"
            rel="noreferrer"
            data-testid="header-whatsapp-btn"
            className="btn-ghost rounded-full px-3 py-2 text-sm inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden xl:inline">{t("cta.whatsapp")}</span>
          </a>
          <a
            href="/#contact"
            data-testid="header-start-project-btn"
            className="btn-glow rounded-full px-4 py-2 text-sm font-semibold inline-flex items-center gap-1.5 text-white whitespace-nowrap"
          >
            <Rocket className="w-4 h-4" /> {t("cta.startProject")}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/10 shrink-0"
          aria-label="Open menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-strong border-t border-white/10 px-4 py-4" data-testid="mobile-menu">
          <div className="flex flex-col gap-1">
            {NAV_KEYS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-white/80 hover:bg-white/5"
                data-testid={`mobile-nav-${n.label.split(".")[1]}`}
              >
                {t(n.label)}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between">
              <LanguageToggle />
            </div>
            <div className="flex gap-2 mt-3">
              <a href={AVERO.whatsapp} target="_blank" rel="noreferrer" className="flex-1 btn-ghost text-center rounded-full py-2 text-sm">{t("cta.whatsapp")}</a>
              <a href="/#contact" onClick={() => setOpen(false)} className="flex-1 btn-glow rounded-full py-2 text-sm text-center font-semibold">{t("cta.startProject")}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
