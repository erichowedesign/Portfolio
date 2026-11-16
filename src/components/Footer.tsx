import Link from "next/link";
import { siteConfig } from "@/data/projects";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border-soft-200">
      <div className="mx-auto flex max-w-wide flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-soft-400">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-text-sub-600 transition hover:text-text-strong-950"
          >
            Email
          </Link>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-sub-600 transition hover:text-text-strong-950"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
