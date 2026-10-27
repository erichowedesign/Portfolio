import type { ImageAspect, ImageSlot } from "@/data/projects";

const aspectClass: Record<ImageAspect, string> = {
  wide: "aspect-[21/9]",
  video: "aspect-video",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[9/16]",
};

export function ImagePlaceholder({
  slot,
  className = "",
}: {
  slot: ImageSlot;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-lg border border-surface-border bg-surface-card ${aspectClass[slot.aspect ?? "landscape"]}`}
      >
        <svg
          className="absolute inset-0 h-full w-full text-surface-border"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-surface-card px-2 py-1 text-xs font-medium uppercase tracking-wider text-ink-faint">
          {slot.label}
        </span>
      </div>
      {slot.caption && (
        <figcaption className="mt-2 text-sm text-ink-faint">{slot.caption}</figcaption>
      )}
    </figure>
  );
}

const columns = ["", "grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3"];

export function ImageRow({ images }: { images: ImageSlot[] }) {
  return (
    <div className={`grid gap-4 ${columns[Math.min(images.length, 3)]}`}>
      {images.map((slot, i) => (
        <ImagePlaceholder key={i} slot={slot} />
      ))}
    </div>
  );
}
