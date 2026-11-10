import Link from "next/link";
import { ContactDockSlot } from "@/components/ContactRow";
import { siteConfig } from "@/data/projects";

const tiles = [
  {
    href: "/nike",
    title: "Nike",
    meta: "Digital Product Creation - 2018-2026",
    src: "/images/home/light/nike.png",
    darkSrc: "/images/home/dark/nike.png",
    locked: true,
  },
  {
    href: "/work/google-product-experts",
    title: "Google Product Experts",
    meta: "R/GA - 2017",
    src: "/images/home/light/google.jpg",
    darkSrc: "/images/home/dark/google.png",
  },
  {
    href: "/work/15-years-of-sb-dunk",
    title: "Nike SB",
    meta: "R/GA - 2016",
    src: "/images/home/light/nike-sb.jpg",
    darkSrc: "/images/home/dark/nike-sb.png",
  },
  {
    href: "/work/nikeplus",
    title: "Nike +",
    meta: "R/GA - 2015",
    src: "/images/home/light/nike-plus.jpg",
    darkSrc: "/images/home/dark/nike-plus.png",
  },
  {
    href: "/work/natures-recipe",
    title: "Natures Recipe",
    meta: "R/GA - 2016",
    src: "/images/home/light/natures-recipe.jpg",
    darkSrc: "/images/home/dark/natures-recipe.png",
  },
  {
    href: "/work/fun-stuff",
    title: "Fun Stuff",
    meta: "A collection of graphical designs",
    src: "/images/home/light/fun-stuff.png",
    darkSrc: "/images/home/dark/fun-stuff.png",
  },
];

export default function HomePage() {
  return (
    <div className="home-stage layout-frame mx-auto pb-16 pt-8 font-inter lg:fixed lg:bottom-4 lg:left-1/2 lg:top-12 lg:z-30 lg:flex lg:w-full lg:-translate-x-1/2 lg:flex-col lg:overflow-visible lg:pb-0 lg:pt-0">
      <div className="layout-split">
        <div className="mb-10 flex flex-col lg:mb-0 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:pb-6 lg:pt-9">
          <p className="site-name type-display w-fit font-display text-text-strong-950">{siteConfig.name}</p>
          <div className="home-copy flex min-h-0 flex-1 flex-col">
            <p className="mt-3 text-[22px] font-light italic leading-[30px] tracking-[0.44px] text-gray-500">
              {siteConfig.title}
            </p>
            <div className="mt-12 lg:mb-[72px] lg:mt-auto">
            <h1 className="type-title max-w-[var(--copy-title)] font-black text-text-strong-950">
              I design thoughtful, intuitive digital experiences that make complexity feel simple.
            </h1>
            <p className="mt-8 max-w-[var(--copy-body)] text-[16px] font-normal leading-[29px] tracking-[0.48px] text-gray-500 dark:text-gray-400">
              With over 10 years of experience, including eight at Nike, I bring a strong foundation in
              visual design, a sharp eye for detail, and a passion for creating polished, purposeful
              products. I work across the entire design process, from shaping early concepts and
              establishing design direction to refining the details that make an experience feel just
              right.
            </p>
            </div>
          </div>
          <ContactDockSlot marginClass="lg:mb-9" />
        </div>

        <div className="lg:h-full lg:min-h-0 lg:pb-6">
          <div className="relative h-full">
            <div className="image-well pointer-events-none absolute inset-0 rounded-[40px] bg-gray-200 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] dark:bg-gray-800" />
            <div className="relative h-full overflow-hidden rounded-[40px] p-4 sm:p-9 lg:p-0">
              <div className="split-scroll lg:absolute lg:inset-9 lg:overflow-y-auto lg:overscroll-contain lg:rounded-[10px]">
                <div className="grid grid-cols-1 gap-6">
                  {tiles.map((tile) => (
                    <WorkCard key={tile.title} {...tile} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({
  href,
  title,
  meta,
  src,
  darkSrc,
  locked = false,
}: {
  href?: string;
  title: string;
  meta: string;
  src: string;
  darkSrc: string;
  locked?: boolean;
}) {
  const card = (
    <>
      <img src={src} alt="" className="aspect-[402/227] w-full object-cover dark:hidden" />
      <img src={darkSrc} alt="" className="hidden aspect-[402/227] w-full object-cover dark:block" />
      <div className="relative px-6 pb-6 pt-6">
        {locked && <LockIcon />}
        <h2 className="type-card font-black text-gray-950 dark:text-gray-50">
          {title}
        </h2>
        <p className="mt-[15px] text-[16px] font-normal leading-[19px] text-gray-400">
          <CardMeta meta={meta} />
        </p>
      </div>
    </>
  );
  const frame = "tile-glow block rounded-[10px]";
  const inner = "overflow-hidden rounded-[10px] bg-gray-50 dark:bg-gray-900";

  if (!href) {
    return (
      <article className={frame}>
        <div className={inner}>{card}</div>
      </article>
    );
  }

  return (
    <Link href={href} className={frame}>
      <div className={inner}>{card}</div>
    </Link>
  );
}

function CardMeta({ meta }: { meta: string }) {
  const range = meta.match(/^(.*?)(\d{4}-\d{4})$/);
  if (!range) return meta;
  return (
    <>
      {range[1]}
      <span className="whitespace-nowrap">{range[2]}</span>
    </>
  );
}

function LockIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="absolute right-6 top-6 text-gray-500 dark:text-gray-300"
    >
      <rect x="3.5" y="10" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
