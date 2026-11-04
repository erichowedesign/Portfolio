import Link from "next/link";
import { siteConfig } from "@/data/projects";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-nav sticky top-0 z-50 h-[72px] bg-bg-weak-50">
      <div className="site-header mx-auto flex h-full max-w-wide items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="font-display text-[24px] leading-none text-text-strong-950 transition hover:text-brand-base"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-6">
          <ThemeToggle />
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-inter text-[15px] font-normal text-text-soft-400 transition hover:text-text-strong-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
