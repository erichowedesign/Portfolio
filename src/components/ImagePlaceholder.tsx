import Image from "next/image";
import type { ImageAspect, ImageSlot } from "@/data/projects";

const aspectClass: Record<ImageAspect, string> = {
  wide: "aspect-[21/9]",
  video: "aspect-video",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[9/16]",
};

const FULL_WIDTH_SIZES = "(min-width: 1008px) 912px, 100vw";

export function ImagePlaceholder({
  slot,
  className = "",
  sizes = FULL_WIDTH_SIZES,
}: {
  slot: ImageSlot;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      {slot.src ? <RealImage slot={slot} sizes={sizes} /> : <Wireframe slot={slot} />}
      {slot.caption && (
        <figcaption className="mt-2 text-sm text-ink-faint">{slot.caption}</figcaption>
      )}
    </figure>
  );
}

function RealImage({ slot, sizes }: { slot: ImageSlot; sizes: string }) {
  const src = slot.src!;

  if (slot.aspect) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg border border-surface-border bg-surface-card ${aspectClass[slot.aspect]}`}
      >
        <Image src={src} alt={slot.label} fill sizes={sizes} className="object-cover object-top" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={slot.label}
      width={slot.width}
      height={slot.height}
      sizes={sizes}
      className="h-auto w-full rounded-lg border border-surface-border"
    />
  );
}

function Wireframe({ slot }: { slot: ImageSlot }) {
  return (
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
  );
}

const columns = ["", "grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3"];
const columnSizes = [
  FULL_WIDTH_SIZES,
  FULL_WIDTH_SIZES,
  "(min-width: 640px) 50vw, 100vw",
  "(min-width: 640px) 33vw, 100vw",
];

export function ImageRow({ images }: { images: ImageSlot[] }) {
  const count = Math.min(images.length, 3);
  return (
    <div className={`grid items-start gap-4 ${columns[count]}`}>
      {images.map((slot, i) => (
        <ImagePlaceholder key={slot.src ?? i} slot={slot} sizes={columnSizes[count]} />
      ))}
    </div>
  );
}
