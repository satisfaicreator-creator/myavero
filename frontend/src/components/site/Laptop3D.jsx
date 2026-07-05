import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, ShoppingBag, Cuboid, ArrowLeft, ArrowRight, MousePointerClick } from "lucide-react";

const contents = [
  {
    key: "business",
    label: "Business Site",
    icon: LayoutDashboard,
    tint: "from-cyan-400 to-blue-500",
    render: () => <BusinessScreen />,
  },
  {
    key: "ecommerce",
    label: "Ecommerce",
    icon: ShoppingBag,
    tint: "from-fuchsia-500 to-pink-500",
    render: () => <EcommerceScreen />,
  },
  {
    key: "3d",
    label: "3D Immersive",
    icon: Cuboid,
    tint: "from-purple-500 to-fuchsia-500",
    render: () => <ThreeDScreen />,
  },
];

export default function Laptop3D() {
  const [idx, setIdx] = useState(0);
  const active = contents[idx];

  return (
    <section className="relative py-20 sm:py-28" data-testid="laptop3d-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">One Team · Three Signature Builds</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Peek inside the <span className="gradient-text">Avero laptop</span>
          </h2>
          <p className="text-white/70 mt-4 text-base sm:text-lg">
            Whether you need a lead-generating business site, a fast ecommerce store, or a cinematic 3D experience — we ship them all at the same premium bar.
          </p>

          {/* Tabs */}
          <div className="mt-6 flex flex-col gap-2" data-testid="laptop3d-tabs">
            {contents.map((c, i) => (
              <button
                key={c.key}
                onClick={() => setIdx(i)}
                data-testid={`laptop3d-tab-${c.key}`}
                className={`text-left glass rounded-xl p-4 flex items-center gap-3 transition-all ${
                  idx === i ? "ring-1 ring-cyan-400/40 shadow-[0_10px_40px_-15px_rgba(34,211,238,0.4)]" : "opacity-70 hover:opacity-100"
                }`}
              >
                <span className={`w-9 h-9 rounded-lg grid place-items-center bg-gradient-to-br ${c.tint}`}>
                  <c.icon className="w-4 h-4 text-white" />
                </span>
                <div className="flex-1">
                  <div className="font-heading font-semibold text-sm">{c.label}</div>
                  <div className="text-[11px] text-white/50">
                    {c.key === "business" ? "Enquiry-driven business websites" :
                     c.key === "ecommerce" ? "Cart & catalogue websites" :
                     "Three.js immersive brand sites"}
                  </div>
                </div>
                {idx === i && <span className="text-[10px] uppercase tracking-widest text-cyan-300">Live</span>}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIdx((idx - 1 + contents.length) % contents.length)}
              className="btn-ghost rounded-full w-10 h-10 grid place-items-center"
              aria-label="Previous"
              data-testid="laptop3d-prev"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIdx((idx + 1) % contents.length)}
              className="btn-ghost rounded-full w-10 h-10 grid place-items-center"
              aria-label="Next"
              data-testid="laptop3d-next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/50 flex items-center gap-1.5 ml-2">
              <MousePointerClick className="w-3.5 h-3.5" /> Try tapping the screen
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <Laptop active={active} onClick={() => setIdx((idx + 1) % contents.length)} />
        </div>
      </div>
    </section>
  );
}

function Laptop({ active, onClick }) {
  return (
    <div className="relative mx-auto max-w-[640px]" data-testid="laptop3d-scene">
      <div className="spot-glow w-[420px] h-[420px] bg-purple-600 top-4 left-1/2 -translate-x-1/2" />
      <div className="spot-glow w-[320px] h-[320px] bg-cyan-500 top-24 right-4" />

      <div style={{ perspective: 1200 }} className="relative">
        <motion.div
          animate={{ rotateX: -6, rotateY: [-4, 4, -4] }}
          transition={{ rotateY: { repeat: Infinity, duration: 10, ease: "easeInOut" } }}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Laptop lid + screen */}
          <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
            className="block w-full text-left glass-strong rounded-[18px] overflow-hidden border border-white/10 shadow-[0_30px_80px_-30px_rgba(124,58,237,0.6)] cursor-pointer"
            data-testid="laptop3d-screen"
          >
            {/* Bezel top */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/70 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              <span className="mx-auto text-[10px] text-white/40 truncate">
                theavero.dev/{active.key}
              </span>
              <span className="w-9" />
            </div>

            {/* Screen content — swaps with animation */}
            <div className="relative min-h-[280px] sm:min-h-[340px] bg-gradient-to-br from-[#0a0f22] to-[#0a0620] p-4 sm:p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                >
                  {active.render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Laptop base */}
          <div className="mx-auto -mt-1 w-[104%] -ml-[2%] h-4 rounded-b-2xl bg-gradient-to-b from-[#111327] to-[#05061a] border border-white/10 shadow-2xl" />
          <div className="mx-auto w-[30%] h-1 rounded-b-full bg-white/10 mt-[-1px]" />

          {/* Floating side cards */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute -left-4 sm:-left-10 top-8 glass rounded-xl px-3 py-2 border-cyan-400/30"
          >
            <div className="text-[9px] uppercase tracking-widest text-cyan-300">Speed</div>
            <div className="text-sm font-bold">98/100</div>
          </motion.div>
          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ repeat: Infinity, duration: 7 }}
            className="absolute -right-4 sm:-right-8 top-24 glass rounded-xl px-3 py-2 border-fuchsia-400/30"
          >
            <div className="text-[9px] uppercase tracking-widest text-fuchsia-300">Leads Today</div>
            <div className="text-sm font-bold">+24</div>
          </motion.div>
          <motion.div
            animate={{ y: [-4, 8, -4] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute -right-2 sm:-right-6 bottom-8 glass rounded-xl px-3 py-2 border-purple-400/30"
          >
            <div className="text-[9px] uppercase tracking-widest text-purple-300">SEO Rank</div>
            <div className="text-sm font-bold">Top 3</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function BusinessScreen() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-cyan-300">Sharma Café · Home</div>
      <div className="font-heading font-bold text-lg sm:text-xl mt-1 leading-tight">Best brew in town — book a table</div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-md bg-white/5 border border-white/10 p-2.5">
          <div className="text-[9px] text-white/50">Visitors</div>
          <div className="text-sm font-semibold text-cyan-300">4.2K</div>
        </div>
        <div className="rounded-md bg-white/5 border border-white/10 p-2.5">
          <div className="text-[9px] text-white/50">Bookings</div>
          <div className="text-sm font-semibold text-fuchsia-300">312</div>
        </div>
        <div className="rounded-md bg-white/5 border border-white/10 p-2.5">
          <div className="text-[9px] text-white/50">Reviews</div>
          <div className="text-sm font-semibold text-purple-300">4.9★</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="h-16 rounded-md bg-gradient-to-br from-cyan-500/25 to-blue-500/25 border border-white/10 relative overflow-hidden">
          <span className="absolute bottom-1 left-2 text-[10px] font-semibold">Book a Table</span>
        </div>
        <div className="h-16 rounded-md bg-gradient-to-br from-fuchsia-500/25 to-purple-500/25 border border-white/10 relative overflow-hidden">
          <span className="absolute bottom-1 left-2 text-[10px] font-semibold">WhatsApp Us</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-white/50">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live from Avero
      </div>
    </div>
  );
}

function EcommerceScreen() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-fuchsia-300">Bagsy · Products</div>
      <div className="font-heading font-bold text-lg mt-1 leading-tight">Weekend Sale · Up to 40% off</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[["#22D3EE","₹1,499"],["#7C3AED","₹2,299"],["#EC4899","₹3,499"]].map(([c,p], i) => (
          <div key={i} className="rounded-md border border-white/10 p-2">
            <div className="aspect-square rounded bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(135deg, ${c}55, transparent)` }} />
            <div className="text-[10px] mt-1.5 font-semibold">{p}</div>
            <div className="text-[9px] text-white/50">In stock</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-[10px] text-white/60">Cart · 3 items</div>
        <div className="text-xs font-heading font-bold text-fuchsia-300">₹7,297</div>
      </div>
      <button className="mt-2 w-full text-[10px] py-1.5 rounded bg-gradient-to-r from-fuchsia-500 to-pink-500 font-semibold">
        Checkout
      </button>
    </div>
  );
}

function ThreeDScreen() {
  return (
    <div className="relative">
      <div className="text-[10px] uppercase tracking-widest text-purple-300">Orbit · 3D Studio</div>
      <div className="font-heading font-bold text-lg mt-1 leading-tight">A world inside every product</div>
      <div className="mt-4 relative aspect-[16/9] rounded-md bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-cyan-500/20 border border-white/10 overflow-hidden">
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="relative w-24 h-24"
            style={{ transformStyle: "preserve-3d" }}
          >
            {[0,60,120,180,240,300].map((deg, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-lg border border-white/30"
                style={{
                  transform: `rotateY(${deg}deg) translateZ(30px)`,
                  background: `linear-gradient(135deg, rgba(34,211,238,0.25), rgba(236,72,153,0.25))`,
                }}
              />
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] text-white/60">
          <span>Drag to rotate</span>
          <span>60 FPS</span>
        </div>
      </div>
      <div className="mt-2 flex gap-1.5">
        <div className="flex-1 h-1 rounded bg-white/15" />
        <div className="flex-1 h-1 rounded bg-cyan-400/60" />
        <div className="flex-1 h-1 rounded bg-white/10" />
      </div>
    </div>
  );
}
