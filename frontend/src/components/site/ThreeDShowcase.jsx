import { motion } from "framer-motion";
import { Cuboid, Sparkles, Box, Layers, ArrowRight } from "lucide-react";

const capabilities = [
  "Product opening on scroll",
  "Objects emerging from a product",
  "3D ecommerce product viewer",
  "Floating dashboards",
  "Interactive scroll journey",
  "Animated website hero",
  "Brand storytelling websites",
  "Premium product launches",
];

export default function ThreeDShowcase() {
  return (
    <section id="three-d" className="relative py-20 sm:py-28" data-testid="threed-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">3D Websites</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
              Want something that feels like <span className="gradient-text">the future?</span>
            </h2>
            <p className="text-white/70 mt-4 text-base sm:text-lg">
              Avero builds immersive 3D websites using Three.js, scroll animations and cinematic product storytelling.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#EC4899]" />
                  {c}
                </li>
              ))}
            </ul>

            <a href="#contact" data-testid="threed-cta" className="mt-8 inline-flex btn-glow rounded-full px-6 py-3.5 text-sm font-semibold items-center gap-2">
              Build My 3D Website <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square max-w-[520px] mx-auto">
              {/* Portal ring */}
              <div className="absolute inset-6 rounded-full border border-cyan-400/30 slow-spin" />
              <div className="absolute inset-12 rounded-full border border-fuchsia-400/30 slow-spin" style={{ animationDirection: "reverse", animationDuration: "26s" }} />
              <div className="absolute inset-20 rounded-full border border-purple-400/30 slow-spin" style={{ animationDuration: "40s" }} />
              <div className="spot-glow w-64 h-64 bg-fuchsia-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

              {/* Portal core */}
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 grid place-items-center"
              >
                <div className="relative w-40 h-40 rounded-3xl glass-strong border border-cyan-400/40 grid place-items-center">
                  <Cuboid className="w-16 h-16 text-cyan-300" />
                  <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-fuchsia-300" />
                </div>
              </motion.div>

              {/* Emerging cubes */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute top-6 left-6 glass rounded-xl p-3 border-cyan-400/30"
              >
                <Box className="w-5 h-5 text-cyan-300" />
              </motion.div>
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ repeat: Infinity, duration: 7 }}
                className="absolute top-16 right-4 glass rounded-xl p-3 border-fuchsia-400/30"
              >
                <Layers className="w-5 h-5 text-fuchsia-300" />
              </motion.div>
              <motion.div
                animate={{ y: [-4, 10, -4] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute bottom-16 left-10 glass rounded-xl p-3 border-purple-400/30"
              >
                <Cuboid className="w-5 h-5 text-purple-300" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -6, 10] }}
                transition={{ repeat: Infinity, duration: 6.5 }}
                className="absolute bottom-10 right-8 glass rounded-xl p-3 border-blue-400/30"
              >
                <Box className="w-5 h-5 text-blue-300" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
