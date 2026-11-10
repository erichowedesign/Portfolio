import Link from "next/link";
import { ThemeCircle } from "@/components/ThemeToggle";
import { siteConfig } from "@/data/projects";

const iconClass = "text-gray-600 dark:text-gray-300";

const revealLabel =
  "max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-normal leading-[24px] opacity-0 transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-2.5 group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:opacity-100";

const revealShort = "group-hover:max-w-[8rem] group-focus-visible:max-w-[8rem]";

export function ContactRow({ className = "" }: { className?: string }) {
  return (
    <div className={`contact-dock flex flex-wrap items-center gap-3 font-inter ${className}`}>
      <a
        href={`mailto:${siteConfig.email}`}
        aria-label="Email Me"
        className={`btn-glow group inline-flex h-[38px] items-center justify-center rounded-[25px] border border-current px-[6px] font-inter text-[12px] font-normal leading-[24px] hover:px-[17px] focus-visible:px-[17px] ${iconClass}`}
      >
        <MailIcon />
        <span className={`${revealLabel} ${revealShort}`}>Email Me</span>
      </a>
      <a
        href={siteConfig.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`btn-glow group inline-flex h-[38px] items-center justify-center rounded-[25px] border border-current px-[10px] hover:px-[17px] focus-visible:px-[17px] ${iconClass}`}
      >
        <LinkedInIcon />
        <span className={`${revealLabel} ${revealShort}`}>LinkedIn</span>
      </a>
      <Link
        href="/about"
        aria-label="About"
        className={`btn-glow group inline-flex h-[38px] items-center justify-center rounded-[25px] border border-current px-[14px] hover:px-[17px] focus-visible:px-[17px] ${iconClass}`}
      >
        <InfoIcon />
        <span className={`${revealLabel} ${revealShort}`}>About</span>
      </Link>
      <ThemeCircle />
    </div>
  );
}

/** Shared footer. One position on every portfolio page, outside the scrolling columns. */
export function ContactDock() {
  return (
    <footer className="site-contact-dock pointer-events-none fixed inset-x-0 bottom-[76px] z-40">
      <div className="layout-frame mx-auto">
        <ContactRow className="pointer-events-auto w-fit" />
      </div>
    </footer>
  );
}

/** In-flow buttons on small screens. On large screens, a spacer keeps the copy above the footer. */
export function ContactDockSlot({ marginClass }: { marginClass: string }) {
  return (
    <>
      <ContactRow className="mt-10 lg:hidden" />
      <div className={`mt-10 hidden h-[38px] lg:mt-0 lg:block ${marginClass}`} aria-hidden />
    </>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="8" height="18" viewBox="15.5 9 8 20" fill="none" aria-hidden className="shrink-0">
      <path
        d="M19.5 27.1003V19.5003"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 11.9H19.519"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M0 1.14614C0 0.513313 0.526012 0 1.17491 0H14.8251C15.474 0 16 0.513315 16 1.14614V14.8539C16 15.4869 15.474 16 14.8251 16L1.17491 16C0.526012 16 0 15.4869 0 14.8539V1.14614ZM4.94338 13.3937V6.16876H2.54196V13.3937H4.94338ZM3.74266 5.18232C4.58008 5.18232 5.10131 4.62753 5.10131 3.9342C5.0857 3.22527 4.58008 2.68587 3.75854 2.68587C2.93709 2.68587 2.4 3.22527 2.4 3.9342C2.4 4.62753 2.92112 5.18232 3.72701 5.18232H3.74266ZM8.6514 13.3937V9.35897C8.6514 9.14304 8.667 8.92732 8.73042 8.77296C8.90401 8.34153 9.29915 7.89471 9.96255 7.89471C10.8315 7.89471 11.1791 8.55725 11.1791 9.52851V13.3937H13.5803V9.251C13.5803 7.03184 12.3956 5.99922 10.8156 5.99922C9.54177 5.99922 8.9706 6.69937 8.65146 7.19167V7.21656H8.63543C8.6407 7.20832 8.64605 7.20003 8.65146 7.19167V6.16876H6.25007C6.28158 6.8467 6.25007 13.3937 6.25007 13.3937H8.6514Z"
        fill="currentColor"
      />
    </svg>
  );
}
