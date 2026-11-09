"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type TransitionEvent } from "react";
import {
  adjacentPortfolioStops,
  backLink,
  projectHref,
  siteConfig,
  type GalleryProject,
  type ImageSlot,
} from "@/data/projects";
import { ContactDockSlot } from "@/components/ContactRow";
import { Eyebrow } from "@/components/Eyebrow";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const WELL_SIZES =
  "(min-width: 1600px) 1308px, (min-width: 1024px) calc(100vw - 612px), calc(100vw - 48px)";

export function SplitGalleryLayout({ project }: { project: GalleryProject }) {
  const back = backLink(project);
  const rows = project.gallery;
  const { previous, next } = adjacentPortfolioStops(projectHref(project));
  const credit = project.studio ? `${project.studio} - ${project.year}` : project.year;
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
    <article className="split-stage mx-auto w-full max-w-[1440px] px-6 pb-16 pt-8 font-inter lg:fixed lg:bottom-14 lg:left-1/2 lg:top-0 lg:z-30 lg:flex lg:w-full lg:-translate-x-1/2 lg:flex-col lg:overflow-visible lg:px-10 lg:pb-0 lg:pt-7 min-[1600px]:max-w-[1920px]">
      <div className="lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[440px_minmax(0,1fr)] lg:items-stretch lg:gap-x-5">
        <aside className="split-scroll mb-10 flex flex-col lg:mb-0 lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <Link href="/" className="site-name self-start font-display text-[20px] leading-[24px] text-text-strong-950">
            {siteConfig.name}
          </Link>
          <div className="project-nav mt-6">
            <div className="mb-12 flex h-[38px] items-start justify-between">
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
            <div className="lg:mt-auto" />
          </div>
          <ContactDockSlot marginClass="lg:mb-5" />
        </aside>

        <div className="lg:h-full lg:min-h-0 lg:pt-3">
          <div className="relative h-full">
            <div className="image-well pointer-events-none absolute inset-0 rounded-[40px] bg-gray-100 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] dark:bg-gray-800" />
            <div className="relative h-full overflow-hidden rounded-[40px] p-4 sm:p-9 lg:p-0">
              <div
                ref={wellRef}
                className="project-images split-scroll lg:absolute lg:inset-9 lg:overflow-y-auto lg:overscroll-contain lg:rounded-[10px]"
              >
                <div className="flex flex-col gap-6">
                  {rows.map((row, rowIndex) => {
                    const start = rows.slice(0, rowIndex).reduce((count, item) => count + item.length, 0);
                    return (
                      <div
                        key={row.map((slot) => slot.src ?? slot.video).join("-")}
                        data-chapter-start={chapterStarts.has(start) ? "" : undefined}
                        style={separatedStarts.has(start) ? { marginTop: project.chapterGap ?? 48 } : undefined}
                      >
                        {row.length > 1 ? (
                          <div className={`grid grid-cols-2 overflow-hidden rounded-[10px] ${start === 0 ? "project-hero" : ""}`}>
                            {row.map((slot) => (
                              <PairCell key={slot.src ?? slot.video} slot={slot} />
                            ))}
                          </div>
                        ) : (
                          <ImagePlaceholder
                            slot={row[0]}
                            framed={false}
                            sizes={WELL_SIZES}
                            className={start === 0 ? "project-hero" : undefined}
                          />
                        )}
                      </div>
                    );
                  })}
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
      className="btn-glow group inline-flex h-[38px] items-center justify-center rounded-[25px] border border-current px-[13.4px] text-gray-600 hover:px-[17px] focus-visible:px-[17px] dark:text-gray-300"
    >
      {!next && <Arrow direction="previous" />}
      <span
        className={`max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-normal leading-[24px] opacity-0 transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[5.5rem] group-hover:opacity-100 group-focus-visible:max-w-[5.5rem] group-focus-visible:opacity-100 ${
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
