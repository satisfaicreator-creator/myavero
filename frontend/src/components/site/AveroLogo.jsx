export default function AveroLogo({ size = 40, showText = true, compact = false }) {
  // `showText` and `compact` are kept for backward-compat but the new logo is an image with the
  // "avero" wordmark baked in. `compact` renders a slightly smaller version for the sticky header.
  const heightPx = compact ? 32 : 44;
  return (
    <div className="flex items-center select-none" data-testid="avero-logo">
      <img
        src="/avero-logo.png"
        alt="Avero — We Design. You Grow."
        height={heightPx}
        style={{ height: `${heightPx}px`, width: "auto", display: "block" }}
        draggable={false}
      />
    </div>
  );
}
