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
    <header className="sticky top-0 z-50 border-b border-border-soft-200 bg-bg-weak-50/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-wide items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-text-strong-950 transition hover:text-brand-base"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-sub-600 transition hover:text-text-strong-950"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
