import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ContactDockSlot } from "@/components/ContactRow";
import { Eyebrow } from "@/components/Eyebrow";
import { CircleButton } from "@/components/SplitGalleryLayout";
import {
  adjacentPortfolioStops,
  getCollectionProjects,
  nikeCollection,
  projectHref,
  siteConfig,
  type Project,
} from "@/data/projects";
import { ACCESS_COOKIE, accessToken } from "@/lib/access";
import { unlock } from "@/app/unlock/actions";
import { darkVariant } from "@/data/darkImages";

export const metadata: Metadata = {
  title: nikeCollection.title,
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NikePage({ searchParams }: Props) {
  const { error } = await searchParams;
  const unlocked = await hasAccess();
  const { previous, next } = adjacentPortfolioStops(`/${nikeCollection.slug}`);
  const projects = getCollectionProjects(nikeCollection.slug).filter((project) => project.cover.src);

  return (
    <article className="split-stage layout-frame mx-auto pb-16 pt-8 font-inter lg:fixed lg:bottom-14 lg:left-1/2 lg:top-0 lg:z-30 lg:flex lg:w-full lg:-translate-x-1/2 lg:flex-col lg:overflow-visible lg:pb-0 lg:pt-7">
      <div className="layout-split">
        <aside className="split-scroll mb-10 flex flex-col lg:mb-0 lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <Link href="/" className="site-name self-start font-display text-[20px] leading-[24px] text-text-strong-950">
            {siteConfig.name}
          </Link>
          <div className="project-nav mt-6">
            <div className="mb-12 flex h-auto flex-wrap items-start justify-between gap-y-3 lg:h-[38px] lg:flex-nowrap">
              <CircleButton href="/#work" label="Work" ariaLabel="Back to work" direction="previous" />
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
            <Eyebrow>{nikeCollection.period}</Eyebrow>
            <h1 className="type-title mt-6 font-black text-text-strong-950">
              {nikeCollection.title}
            </h1>
            <p className="type-sub mt-3 font-normal italic text-text-strong-950">
              {nikeCollection.subtitle}
            </p>
            <div className="mt-8 space-y-6">
              {nikeCollection.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[14px] font-normal leading-[24px] tracking-[0.42px] text-text-soft-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {!unlocked && (
              <form action={unlock} className="mt-24">
                <input type="hidden" name="next" value={`/${nikeCollection.slug}`} />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  aria-label="Password"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "password-error" : undefined}
                  className="h-[62px] w-full rounded-[15px] border border-current bg-transparent px-4 text-[16px] font-normal leading-[24px] text-gray-600 outline-none placeholder:text-gray-500 focus-visible:border-[#e6b325] focus-visible:shadow-[0_0_12px_rgba(230,179,37,0.28)] dark:text-gray-300 lg:text-[12px]"
                />
                {error && (
                  <p id="password-error" className="mt-3 text-[12px] leading-[24px] text-state-error-base-500">
                    That password didn&apos;t work. Try again.
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-glow mt-6 inline-flex h-[38px] items-center rounded-[25px] border border-current px-4 text-[12px] font-normal leading-[24px] text-gray-600 dark:text-gray-300"
                >
                  View Work
                </button>
              </form>
            )}
          </div>
          <ContactDockSlot marginClass="lg:mb-5" />
        </aside>

        <div className="lg:h-full lg:min-h-0 lg:pt-3">
          <div className="relative h-full">
            <div className="image-well pointer-events-none absolute inset-0 rounded-[40px] bg-gray-100 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] dark:bg-gray-800" />
            <div className="relative h-full overflow-hidden rounded-[40px] p-4 sm:p-9 lg:p-0">
              <div className="project-images split-scroll lg:absolute lg:inset-9 lg:overflow-y-auto lg:overscroll-contain lg:rounded-[10px]">
                <img
                  src="/images/home/light/nike.png"
                  alt=""
                  className="project-hero aspect-video w-full rounded-[10px] object-cover dark:hidden"
                />
                <img
                  src="/images/home/dark/nike.png"
                  alt=""
                  className="project-hero hidden aspect-video w-full rounded-[10px] object-cover dark:block"
                />
                {unlocked && <NikeTiles projects={projects} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ThemePhoto({ src }: { src: string }) {
  const darkSrc = darkVariant(src);
  const frame = "aspect-[402/227] w-full object-cover";
  if (!darkSrc) return <img src={src} alt="" className={frame} />;
  return (
    <>
      <img src={src} alt="" className={`${frame} dark:hidden`} />
      <img src={darkSrc} alt="" className={`${frame} hidden dark:block`} />
    </>
  );
}

function NikeTiles({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6">
      {projects.map((project) => (
        <Link key={project.slug} href={projectHref(project)} className="tile-glow block rounded-[10px]">
          <div className="overflow-hidden rounded-[10px] bg-gray-50 dark:bg-gray-900">
            {project.cover.src ? (
              <ThemePhoto src={project.cover.src} />
            ) : (
              <div className="aspect-[402/227] w-full bg-gray-200 dark:bg-gray-800" />
            )}
            <div className="px-6 pb-6 pt-6">
              <h2 className="type-card font-black text-gray-950 dark:text-gray-50">
                {project.title}
              </h2>
              <p className="mt-[15px] text-[16px] font-normal leading-[19px] text-gray-400">
                {project.category} - {project.year}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

async function hasAccess() {
  const expected = await accessToken(process.env.PROTECTED_PASSWORD);
  if (!expected) return false;
  return (await cookies()).get(ACCESS_COOKIE)?.value === expected;
}
