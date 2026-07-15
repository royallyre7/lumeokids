/**
 * Decorative floating blob shapes for Playful Bubbles design.
 * Place behind content — blobs are blurred and non-interactive.
 */
export default function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-left primary blob */}
      <div className="blob blob-primary w-72 h-72 -top-20 -left-20 animate-float" />

      {/* Top-right lavender blob */}
      <div className="blob blob-lavender w-56 h-56 top-10 -right-12 animate-float-slow" />

      {/* Middle-left accent blob */}
      <div className="blob blob-accent w-40 h-40 top-1/3 -left-8 animate-float-delayed" />

      {/* Bottom-right sunny blob */}
      <div className="blob blob-sunny w-64 h-64 bottom-10 -right-16 animate-float" />

      {/* Bottom-left mint blob */}
      <div className="blob blob-mint w-48 h-48 -bottom-12 left-1/4 animate-float-slow" />
    </div>
  );
}
