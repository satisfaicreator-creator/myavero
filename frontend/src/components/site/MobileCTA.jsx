import { Phone, MessageCircle, IndianRupee, Send } from "lucide-react";
import { AVERO } from "@/lib/config";

export default function MobileCTA() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden glass-strong border-t border-white/10 px-2 py-2"
      data-testid="mobile-cta-bar"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-4 gap-1">
        <a href={`tel:+${AVERO.phoneRaw}`} data-testid="mcta-call" className="flex flex-col items-center gap-1 py-1.5 rounded-lg hover:bg-white/5">
          <Phone className="w-4 h-4 text-cyan-300" />
          <span className="text-[10px] text-white/80">Call</span>
        </a>
        <a href={AVERO.whatsapp} target="_blank" rel="noreferrer" data-testid="mcta-whatsapp" className="flex flex-col items-center gap-1 py-1.5 rounded-lg hover:bg-white/5">
          <MessageCircle className="w-4 h-4 text-emerald-300" />
          <span className="text-[10px] text-white/80">WhatsApp</span>
        </a>
        <a href="#pricing" data-testid="mcta-pricing" className="flex flex-col items-center gap-1 py-1.5 rounded-lg hover:bg-white/5">
          <IndianRupee className="w-4 h-4 text-fuchsia-300" />
          <span className="text-[10px] text-white/80">Pricing</span>
        </a>
        <a href="#contact" data-testid="mcta-contact" className="flex flex-col items-center gap-1 py-1.5 rounded-lg hover:bg-white/5">
          <Send className="w-4 h-4 text-purple-300" />
          <span className="text-[10px] text-white/80">Contact</span>
        </a>
      </div>
    </div>
  );
}
