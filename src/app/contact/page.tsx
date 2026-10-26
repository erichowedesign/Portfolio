import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/projects";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-ink">
        Contact
      </h1>
      <p className="mb-10 text-lg leading-relaxed text-ink-muted">
        Open to Lead Product Designer and Design Lead roles in enterprise UX,
        B2B SaaS, and operational products. Remote and Portland-based
        opportunities welcome.
      </p>

      <div className="space-y-6">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-faint">
            Email
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-base font-medium text-accent hover:text-accent-hover"
          >
            {siteConfig.email}
          </a>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-faint">
            LinkedIn
          </p>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-accent hover:text-accent-hover"
          >
            linkedin.com/in/eric-howe-76a771b4
          </a>
        </div>
      </div>

      <p className="mt-12 text-sm text-ink-faint">
        Prefer a quick intro?{" "}
        <Link href="/#work" className="text-ink-muted underline hover:text-ink">
          Browse my case studies
        </Link>{" "}
        and reach out with a role you have in mind.
      </p>
    </div>
  );
}
