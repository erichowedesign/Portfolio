import Link from "next/link";
import { siteConfig } from "@/data/projects";

export function Header() {
  return (
    <header className="site-nav sticky top-0 z-50 h-[72px] bg-bg-weak-50">
      <div className="site-header mx-auto flex h-full max-w-[1440px] items-center px-6 lg:px-10 min-[1600px]:max-w-[1920px]">
        <Link href="/" className="font-display text-[28px] leading-none text-text-strong-950">
          {siteConfig.name}
        </Link>
      </div>
    </header>
  );
}
