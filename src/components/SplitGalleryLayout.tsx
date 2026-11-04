"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type TransitionEvent } from "react";
import {
  backLink,
  getNextProject,
  getPreviousProject,
  projectHref,
  type GalleryProject,
  type Project,
} from "@/data/projects";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const WELL_SIZES =
  "(min-width: 1600px) 1308px, (min-width: 1024px) calc(100vw - 612px), calc(100vw - 48px)";

export function SplitGalleryLayout({ project }: { project: GalleryProject }) {
  const back = backLink(project);
  const images = project.gallery.flat();
  const previous = getPreviousProject(project);
  const next = getNextProject(project);
  const eyebrow = project.studio ? `${project.year} - ${project.studio}` : project.year;
  const chapters = project.chapters;
  const chapterStarts = new Set(chapters?.map((chapter) => chapter.start) ?? []);
  const separatedStarts = new Set(
    chapters?.filter((chapter) => chapter.separated).map((chapter) => chapter.start) ?? [],
  );
  const wellRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const shownRef = useRef(0);
  const phaseRef = useRef<"in" | "out">("in");
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  phaseRef.current = phase;

  useEffect(() => {
    const well = wellRef.current;
    if (!well || !chapters?.length) return;

    const update = () => {
      const starts = [...well.querySelectorAll<HTMLElement>("[data-chapter-start]")];
      const top = well.getBoundingClientRect().top;
      let index = 0;
      starts.forEach((el, i) => {
        if (el.getBoundingClientRect().top - top <= 120) index = i;
      });
      if (index === activeRef.current) return;
      activeRef.current = index;
      setActive(index);
    };

    update();
    well.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(well);
    return () => {
      well.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [chapters]);

  useEffect(() => {
    if (!chapters?.length || active === shownRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shownRef.current = active;
      setShown(active);
      setPhase("in");
      return;
    }
    setPhase("out");
  }, [active, chapters]);

  function revealChapter() {
    const next = activeRef.current;
    if (next !== shownRef.current) {
      shownRef.current = next;
      setShown(next);
      requestAnimationFrame(() => requestAnimationFrame(revealChapter));
      return;
    }
    setPhase("in");
  }

  function onChapterFadeEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "opacity" || event.target !== event.currentTarget) return;
    if (phaseRef.current !== "out") return;
    requestAnimationFrame(() => requestAnimationFrame(revealChapter));
  }

  return (
    <article className="split-stage mx-auto w-full max-w-[1440px] px-6 pb-16 pt-8 font-inter lg:fixed lg:bottom-4 lg:left-1/2 lg:top-[72px] lg:z-30 lg:flex lg:w-full lg:-translate-x-1/2 lg:flex-col lg:overflow-visible lg:px-10 lg:pb-0 lg:pt-6 min-[1600px]:max-w-[1920px]">
      <div className="lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[440px_minmax(0,1fr)] lg:items-stretch lg:gap-x-5">
        <aside className="split-scroll mb-10 lg:mb-0 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:pt-9">
          <div>
            <div className="mb-[34px] flex h-[38px] items-start justify-between">
              <CircleButton
                href={back.href}
                label="Back"
                ariaLabel={back.label}
                direction="previous"
              />
              {previous.slug !== project.slug && (
                <nav aria-label="More projects" className="flex items-start gap-2.5">
                  <CircleButton
                    href={projectHref(previous)}
                    label="Previous"
                    ariaLabel={`Previous project, ${projectLabel(previous)}`}
                    direction="previous"
                  />
                  <CircleButton
                    href={projectHref(next)}
                    label="Next"
                    ariaLabel={`Next project, ${projectLabel(next)}`}
                    direction="next"
                  />
                </nav>
              )}
            </div>

            <p className="text-[16px] font-light leading-[24px] tracking-[0.32px] text-text-soft-400">
              {eyebrow}
            </p>
            <h1 className="mt-6 text-[40px] font-black leading-[48px] text-text-strong-950">
              {project.heading ?? project.title}
            </h1>
            {chapters ? (
              <>
                <div className="lg:hidden">
                  {chapters.map((chapter, i) => (
                    <ChapterCopy
                      key={chapter.subheading}
                      subheading={chapter.subheading}
                      description={chapter.description}
                      className={i > 0 ? "mt-14" : undefined}
                    />
                  ))}
                </div>
                <ChapterCopy
                  subheading={chapters[shown].subheading}
                  description={chapters[shown].description}
                  live
                  onTransitionEnd={onChapterFadeEnd}
                  className={`hidden transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none lg:block ${
                    phase === "in" ? "opacity-100" : "opacity-0"
                  }`}
                />
              </>
            ) : (
              <ChapterCopy subheading={project.subheading} description={project.description} />
            )}
          </div>
        </aside>

        <div className="lg:h-full lg:min-h-0 lg:pb-6">
          <div className="h-full rounded-[40px] shadow-[0_9px_13px_-2px_rgba(0,0,0,0.05),0_3px_5px_-2px_rgba(0,0,0,0.08)]">
            <div className="overflow-hidden rounded-[40px] bg-gray-100 p-4 dark:bg-gray-800 sm:p-9 lg:relative lg:h-full lg:p-0">
              <div
                ref={wellRef}
                className="split-scroll lg:absolute lg:inset-9 lg:overflow-y-auto lg:overscroll-contain lg:rounded-[10px]"
              >
                <div className="flex flex-col gap-6">
                  {images.map((slot, i) => (
                    <div
                      key={`${slot.src ?? "image"}-${i}`}
                      data-chapter-start={chapterStarts.has(i) ? "" : undefined}
                      style={separatedStarts.has(i) ? { marginTop: project.chapterGap ?? 48 } : undefined}
                    >
                      <ImagePlaceholder slot={slot} framed={false} sizes={WELL_SIZES} />
                    </div>
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

function ChapterCopy({
  subheading,
  description,
  className,
  live = false,
  onTransitionEnd,
}: {
  subheading?: string;
  description: string[];
  className?: string;
  live?: boolean;
  onTransitionEnd?: (event: TransitionEvent<HTMLDivElement>) => void;
}) {
  return (
    <div aria-live={live ? "polite" : undefined} className={className} onTransitionEnd={onTransitionEnd}>
      {subheading && (
        <p className="mt-3 text-[24px] font-normal italic leading-[29px] text-text-strong-950">
          {subheading}
        </p>
      )}
      <div className="mt-[38px] space-y-6">
        {description.map((paragraph) => (
          <p
            key={paragraph}
            className="text-[14px] font-normal leading-[24px] tracking-[0.42px] text-text-soft-400"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function projectLabel(project: Project) {
  return project.kind === "gallery" && project.heading ? project.heading : project.title;
}

function Arrow({ direction }: { direction: "previous" | "next" }) {
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

function CircleButton({
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
      className="group inline-flex h-[38px] items-center justify-center overflow-hidden rounded-[25px] border border-current px-[13.4px] text-gray-600 transition-[padding] duration-200 ease-out hover:px-[17px] focus-visible:px-[17px] focus-visible:outline-none dark:text-gray-300"
    >
      {!next && <Arrow direction="previous" />}
      <span
        className={`max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-normal leading-[24px] opacity-0 transition-[max-width,opacity,margin] duration-200 ease-out group-hover:max-w-[5rem] group-hover:opacity-100 group-focus-visible:max-w-[5rem] group-focus-visible:opacity-100 ${
          next
            ? "group-hover:mr-2.5 group-focus-visible:mr-2.5"
            : "group-hover:ml-2.5 group-focus-visible:ml-2.5"
        }`}
      >
        {label}
      </span>
      {next && <Arrow direction="next" />}
    </Link>
  );
}
