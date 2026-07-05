import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function LanguageToggle({ compact = false }) {
  const { lang, setLang } = useI18n();
  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-black/40 p-0.5"
      data-testid="lang-toggle"
      role="group"
      aria-label="Language toggle"
    >
      {!compact && (
        <span className="pl-2 pr-1 text-white/40" aria-hidden>
          <Languages className="w-3.5 h-3.5" />
        </span>
      )}
      <button
        onClick={() => setLang("en")}
        data-testid="lang-en"
        className={`text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors ${
          lang === "en" ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white" : "text-white/60 hover:text-white"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        data-testid="lang-hi"
        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
          lang === "hi" ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white" : "text-white/60 hover:text-white"
        }`}
        aria-pressed={lang === "hi"}
      >
        हिं
      </button>
    </div>
  );
}
