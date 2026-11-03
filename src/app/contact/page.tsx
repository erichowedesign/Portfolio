import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/projects";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-text-strong-950">
        Contact
      </h1>
      <p className="mb-10 text-lg leading-relaxed text-text-sub-600">
        Open to Lead Product Designer and Design Lead roles in enterprise UX,
        B2B SaaS, and operational products. Remote and Portland-based
        opportunities welcome.
      </p>

      <div className="space-y-6">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-soft-400">
            Email
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-base font-medium text-brand-base hover:text-brand-dark"
          >
            {siteConfig.email}
          </a>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-soft-400">
            LinkedIn
          </p>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-brand-base hover:text-brand-dark"
          >
            linkedin.com/in/eric-howe-76a771b4
          </a>
        </div>
      </div>

      <p className="mt-12 text-sm text-text-soft-400">
        Prefer a quick intro?{" "}
        <Link href="/#work" className="text-text-sub-600 underline hover:text-text-strong-950">
          Browse my case studies
        </Link>{" "}
        and reach out with a role you have in mind.
      </p>
    </div>
  );
}
