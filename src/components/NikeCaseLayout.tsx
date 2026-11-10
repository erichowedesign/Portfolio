import Link from "next/link";
import {
  getCollectionProjects,
  projectHref,
  siteConfig,
  type GalleryProject,
  type ImageSlot,
} from "@/data/projects";
import { ContactDockSlot } from "@/components/ContactRow";
import { Arrow, CircleButton } from "@/components/SplitGalleryLayout";
import { darkVariant } from "@/data/darkImages";

export function NikeCaseLayout({ project }: { project: GalleryProject }) {
  const siblings = getCollectionProjects(project.collection).filter(
    (item): item is GalleryProject => item.kind === "gallery" && item.presentation === "nike-case",
  );
  const index = Math.max(
    0,
    siblings.findIndex((item) => item.slug === project.slug),
  );
  const previous = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];
  const images = project.gallery.flat();

  return (
    <article className="nike-case layout-frame mx-auto pb-16 pt-8 font-inter lg:fixed lg:bottom-14 lg:left-1/2 lg:top-0 lg:z-30 lg:flex lg:w-full lg:-translate-x-1/2 lg:flex-col lg:overflow-visible lg:pb-0 lg:pt-7">
      <div className="layout-split">
        <aside className="split-scroll mb-10 flex flex-col lg:mb-0 lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <Link href="/" className="site-name self-start font-display text-[20px] leading-[24px] text-text-strong-950">
            {siteConfig.name}
          </Link>
          <div className="project-nav mt-6">
            <div className="mb-12 flex h-auto flex-wrap items-start justify-between gap-y-3 lg:h-[38px] lg:flex-nowrap">
              <BreadcrumbBack />
              <nav aria-label="More projects" className="flex items-start gap-3">
                <CircleButton
                  href={projectHref(previous)}
                  label="Previous"
                  ariaLabel={`Previous project, ${previous.heading ?? previous.title}`}
                  direction="previous"
                />
                <CircleButton
                  href={projectHref(next)}
                  label="Next"
                  ariaLabel={`Next project, ${next.heading ?? next.title}`}
                  direction="next"
                />
              </nav>
            </div>
          </div>
          <div className="project-copy flex min-h-0 flex-1 flex-col">
            <p className="h-[26px] text-[16px] font-light leading-[24px] tracking-[0.32px] text-text-soft-400">
              {project.eyebrow}
            </p>
            <h1 className="type-title mt-6 font-black text-text-strong-950">
              {project.heading ?? project.title}
            </h1>
            {project.subheading && (
              <p className="type-sub mt-3 font-normal italic text-text-strong-950">
                {project.subheading}
              </p>
            )}
            <div className="mt-9 space-y-6">
              {project.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[14px] font-normal leading-[24px] tracking-[0.42px] text-text-soft-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <ContactDockSlot marginClass="lg:mb-5" />
        </aside>

        <div className="lg:h-full lg:min-h-0 lg:pt-3">
          <div className="relative h-full">
            <div className="image-well pointer-events-none absolute inset-0 rounded-[40px] bg-gray-100 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] dark:bg-gray-800" />
            <div className="relative h-full overflow-hidden rounded-[40px] p-4 sm:p-9 lg:p-0">
              <div className="split-scroll lg:absolute lg:inset-9 lg:overflow-y-auto lg:overscroll-contain lg:rounded-[10px]">
                <div className="flex flex-col gap-6">
                  {images.map((slot, i) => (
                    <ThemePhoto key={`${slot.src}-${i}`} slot={slot} hero={i === 0} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ThemePhoto({ slot, hero }: { slot: ImageSlot; hero: boolean }) {
  const darkSrc = darkVariant(slot.src);
  const frame = "aspect-[2880/2048] w-full rounded-[10px] object-cover";
  if (!darkSrc) {
    return (
      <img
        src={slot.src}
        alt=""
        width={slot.width}
        height={slot.height}
        className={`${frame}${hero ? " project-hero" : ""}`}
      />
    );
  }
  return (
    <div className={hero ? "project-hero" : undefined}>
      <img src={slot.src} alt="" width={slot.width} height={slot.height} className={`${frame} dark:hidden`} />
      <img src={darkSrc} alt="" width={slot.width} height={slot.height} className={`${frame} hidden dark:block`} />
    </div>
  );
}

function BreadcrumbBack() {
  const label =
    "text-[12px] font-normal leading-[24px] text-current no-underline outline-none";
  const reveal =
    "inline-flex items-center gap-2 overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-lg:ml-2.5 max-lg:max-w-[9rem] max-lg:opacity-100 lg:max-w-0 lg:opacity-0 lg:group-hover:ml-2.5 lg:group-hover:max-w-[9rem] lg:group-hover:opacity-100 lg:group-focus-within:ml-2.5 lg:group-focus-within:max-w-[9rem] lg:group-focus-within:opacity-100";

  return (
    <div className="btn-glow group inline-flex h-[38px] shrink-0 items-center justify-center rounded-[25px] border border-current px-[17px] text-gray-600 hover:px-[17px] focus-within:px-[17px] dark:text-gray-300 lg:px-[13.4px]">
      <Arrow direction="previous" />
      <span className={reveal}>
        <Link href="/#work" aria-label="Back to work" className={label}>
          Work
        </Link>
        <span aria-hidden className={label}>
          /
        </span>
        <Link href="/nike" aria-label="Nike" className={label}>
          Nike
        </Link>
      </span>
    </div>
  );
}
