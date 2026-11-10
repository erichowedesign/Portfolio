import Image from "next/image";
import Link from "next/link";
import {
  adjacentPortfolioStops,
  backLink,
  projectHref,
  siteConfig,
  type GalleryChapter,
  type GalleryProject,
  type ImageSlot,
} from "@/data/projects";
import { ContactDockSlot } from "@/components/ContactRow";
import { Eyebrow } from "@/components/Eyebrow";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const WELL_SIZES =
  "(min-width: 1600px) 1308px, (min-width: 1024px) calc(100vw - 612px), calc(100vw - 48px)";

const wellShadow =
  "shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]";

type WellItem =
  | { kind: "chapter"; chapter: GalleryChapter }
  | { kind: "images"; start: number; slots: ImageSlot[] };

/** Opening copy stays in the sidebar. Later chapters sit in the well, between their images. */
function wellItems(rows: ImageSlot[][], chapters?: GalleryChapter[]): WellItem[] {
  const items: WellItem[] = [];
  let imageIndex = 0;

  rows.forEach((slots) => {
    const chapter = chapters?.find((item) => item.start === imageIndex);
    if (chapter && chapter.start > 0) items.push({ kind: "chapter", chapter });
    items.push({ kind: "images", start: imageIndex, slots });
    imageIndex += slots.length;
  });

  return items;
}

export function SplitGalleryLayout({ project }: { project: GalleryProject }) {
  const back = backLink(project);
  const rows = project.gallery;
  const { previous, next } = adjacentPortfolioStops(projectHref(project));
  const credit = project.studio ? `${project.studio} - ${project.year}` : project.year;
  const chapters = project.chapters;
  const items = wellItems(rows, chapters);

  return (
    <article className="split-stage layout-frame mx-auto pb-16 pt-8 font-inter lg:fixed lg:bottom-14 lg:left-1/2 lg:top-0 lg:z-30 lg:flex lg:w-full lg:-translate-x-1/2 lg:flex-col lg:overflow-visible lg:pb-0 lg:pt-7">
      <div className="layout-split">
        <aside className="split-scroll mb-10 flex flex-col lg:mb-0 lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <Link href="/" className="site-name self-start font-display text-[20px] leading-[24px] text-text-strong-950">
            {siteConfig.name}
          </Link>
          <div className="project-nav mt-6">
            <div className="mb-12 flex h-auto flex-wrap items-start justify-between gap-y-3 lg:h-[38px] lg:flex-nowrap">
              <CircleButton href={back.href} label="Work" ariaLabel={back.label} direction="previous" />
              <nav aria-label="More projects" className="flex items-start gap-3">
                <CircleButton
                  href={previous.href}
                  label="Previous"
                  ariaLabel={`Previous project, ${previous.label}`}
                  direction="previous"
                />
                <CircleButton
                  href={next.href}
                  label="Next"
                  ariaLabel={`Next project, ${next.label}`}
                  direction="next"
                />
              </nav>
            </div>
          </div>
          <div className="project-copy flex min-h-0 flex-1 flex-col">
            {credit ? <Eyebrow>{credit}</Eyebrow> : <div className="h-3" aria-hidden />}
            <h1 className="type-title mt-6 font-black text-text-strong-950">
              {project.heading ?? project.title}
            </h1>
            <ChapterCopy
              subheading={chapters?.[0]?.subheading ?? project.subheading}
              description={chapters?.[0]?.description ?? project.description}
            />
            <div className="lg:mt-auto" />
          </div>
          <ContactDockSlot marginClass="lg:mb-5" />
        </aside>

        <div className="lg:h-full lg:min-h-0 lg:pt-3">
          <div className="relative h-full">
            <div className={`image-well pointer-events-none absolute inset-0 rounded-[40px] bg-gray-100 dark:bg-gray-800 ${wellShadow}`} />
            <div className="relative h-full overflow-hidden rounded-[40px]">
              <div className="project-images split-scroll p-4 sm:p-9 lg:absolute lg:inset-9 lg:overflow-y-auto lg:overscroll-contain lg:rounded-[10px] lg:p-0">
                <div className="flex flex-col gap-6">
                  {items.map((item) =>
                    item.kind === "chapter" ? (
                      <WellChapter key={item.chapter.subheading} chapter={item.chapter} />
                    ) : (
                      <div key={item.slots.map((slot) => slot.src ?? slot.video).join("-")}>
                        {item.slots.length > 1 ? (
                          <div className={`grid grid-cols-2 overflow-hidden rounded-[10px] ${item.start === 0 ? "project-hero" : ""}`}>
                            {item.slots.map((slot) => (
                              <PairCell key={slot.src ?? slot.video} slot={slot} />
                            ))}
                          </div>
                        ) : (
                          <ImagePlaceholder
                            slot={item.slots[0]}
                            framed={false}
                            sizes={WELL_SIZES}
                            className={item.start === 0 ? "project-hero" : undefined}
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function PairCell({ slot }: { slot: ImageSlot }) {
  if (slot.video) {
    return (
      <video
        src={slot.video}
        aria-label={slot.label}
        autoPlay
        muted
        loop
        playsInline
        className="aspect-[4/5] h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={slot.src!}
      alt={slot.label}
      width={slot.width}
      height={slot.height}
      sizes="(min-width: 1024px) 414px, 50vw"
      className="aspect-[4/5] h-full w-full object-cover"
    />
  );
}

function ChapterCopy({ subheading, description }: { subheading?: string; description: string[] }) {
  return (
    <div>
      {subheading && (
        <p className="type-sub mt-3 font-normal italic text-text-strong-950">{subheading}</p>
      )}
      {description.length > 0 && (
        <div className="mt-8 space-y-6">
          {description.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[14px] font-normal leading-[24px] tracking-[0.42px] text-text-soft-400"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function WellChapter({ chapter }: { chapter: GalleryChapter }) {
  return (
    <div className="pb-6 pt-12 lg:max-w-[50%]">
      {chapter.subheading && (
        <p className="type-sub font-normal italic text-text-strong-950">{chapter.subheading}</p>
      )}
      {chapter.description.length > 0 && (
        <div className="mt-3 space-y-3">
          {chapter.description.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[14px] font-normal leading-[24px] tracking-[0.42px] text-text-soft-400"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function Arrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      width="9.187"
      height="18"
      viewBox="0 0 9.18665 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path
        d={
          direction === "next"
            ? "M0.5 0.5 8.5 8.873 0.5 17.5"
            : "M8.687 0.5 0.687 8.873 8.687 17.5"
        }
      />
    </svg>
  );
}

export function CircleButton({
  href,
  label,
  ariaLabel,
  direction,
}: {
  href: string;
  label: string;
  ariaLabel: string;
  direction: "previous" | "next";
}) {
  const next = direction === "next";

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="btn-glow group inline-flex h-[38px] shrink-0 items-center justify-center rounded-[25px] border border-current px-[17px] text-gray-600 hover:px-[17px] focus-visible:px-[17px] dark:text-gray-300 lg:px-[13.4px]"
    >
      {!next && <Arrow direction="previous" />}
      <span
        className={`overflow-hidden whitespace-nowrap text-[12px] font-normal leading-[24px] transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-lg:max-w-[5.5rem] max-lg:opacity-100 lg:max-w-0 lg:opacity-0 lg:group-hover:max-w-[5.5rem] lg:group-hover:opacity-100 lg:group-focus-visible:max-w-[5.5rem] lg:group-focus-visible:opacity-100 ${
          next
            ? "max-lg:mr-2.5 lg:group-hover:mr-2.5 lg:group-focus-visible:mr-2.5"
            : "max-lg:ml-2.5 lg:group-hover:ml-2.5 lg:group-focus-visible:ml-2.5"
        }`}
      >
        {label}
      </span>
      {next && <Arrow direction="next" />}
    </Link>
  );
}
