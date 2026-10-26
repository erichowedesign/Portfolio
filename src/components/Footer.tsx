import Link from "next/link";
import { siteConfig } from "@/data/projects";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-surface-border">
      <div className="mx-auto flex max-w-wide flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-faint">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-ink-muted transition hover:text-ink"
          >
            Email
          </Link>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-muted transition hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
