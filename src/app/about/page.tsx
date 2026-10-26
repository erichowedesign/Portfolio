import type { Metadata } from "next";
import { siteConfig } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-ink">
        About
      </h1>

      <div className="space-y-4 text-base leading-relaxed text-ink-muted">
        {siteConfig.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-faint">{siteConfig.location}</p>

      <section className="mt-16">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-ink-faint">
          Skills
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Leadership</h3>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              {siteConfig.skills.leadership.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">UX & Research</h3>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              {siteConfig.skills.ux.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Tools</h3>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              {siteConfig.skills.tools.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Domain</h3>
            <ul className="space-y-1.5 text-sm text-ink-muted">
              {siteConfig.skills.domain.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-surface-border bg-surface-card p-6">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-ink-faint">
          Experience highlight
        </h2>
        <h3 className="text-lg font-semibold text-ink">Nike</h3>
        <p className="text-sm text-ink-muted">
          Senior UX / Digital Product Designer · Design lead, internal ops tools
          · 8 years
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Led design for warehouse, inventory, and supply chain products.
          Mentored designers, facilitated critique, and governed patterns in the
          internal ops design system.
        </p>
      </section>
    </div>
  );
}
