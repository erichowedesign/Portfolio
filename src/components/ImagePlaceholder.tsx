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
  framed = true,
}: {
  slot: ImageSlot;
  className?: string;
  sizes?: string;
  /** When false, images sit unframed (used in the split project well). */
  framed?: boolean;
}) {
  return (
    <figure className={className}>
      {slot.src ? (
        <RealImage slot={slot} sizes={sizes} framed={framed} />
      ) : (
        <Wireframe slot={slot} />
      )}
      {slot.caption && (
        <figcaption className="mt-2 text-sm text-text-soft-400">{slot.caption}</figcaption>
      )}
    </figure>
  );
}

function RealImage({
  slot,
  sizes,
  framed,
}: {
  slot: ImageSlot;
  sizes: string;
  framed: boolean;
}) {
  const src = slot.src!;
  const frame = framed
    ? "rounded-lg border border-border-soft-200"
    : "rounded-[10px]";

  if (slot.aspect) {
    return (
      <div
        className={`relative overflow-hidden bg-bg-white-0 ${frame} ${aspectClass[slot.aspect]}`}
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
      className={`h-auto w-full ${frame}`}
    />
  );
}

function Wireframe({ slot }: { slot: ImageSlot }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border-soft-200 bg-bg-white-0 ${aspectClass[slot.aspect ?? "landscape"]}`}
    >
      <svg
        className="absolute inset-0 h-full w-full text-border-soft-200"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-bg-white-0 px-2 py-1 text-xs font-medium uppercase tracking-wider text-text-soft-400">
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
