export default function AveroLogo({ size = 40, showText = true }) {
  return (
    <div className="flex items-center gap-3 select-none" data-testid="avero-logo">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
        <defs>
          <linearGradient id="averoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="45%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <path
          d="M32 6 L58 56 H46 L41 45 H23 L18 56 H6 L32 6 Z M28 34 H36 L32 22 Z"
          fill="url(#averoGrad)"
        />
      </svg>
      {showText && (
        <div className="leading-none">
          <div className="font-heading font-extrabold text-2xl tracking-tight">avero</div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">
            We <span className="text-cyan-300">Design.</span> You <span className="text-fuchsia-400">Grow.</span>
          </div>
        </div>
      )}
    </div>
  );
}
