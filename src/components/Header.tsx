import Link from "next/link";
import { siteConfig } from "@/data/projects";

export function Header() {
  return (
    <header className="site-nav sticky top-0 z-50 h-[72px] bg-bg-weak-50">
      <div className="site-header layout-frame mx-auto flex h-full items-center">
        <Link href="/" className="font-display text-[28px] leading-none text-text-strong-950">
          {siteConfig.name}
        </Link>
      </div>
    </header>
  );
}
