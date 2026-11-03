import type { Metadata } from "next";
import { siteConfig } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-text-strong-950">
        About
      </h1>

      <div className="space-y-4 text-base leading-relaxed text-text-sub-600">
        {siteConfig.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-6 text-sm text-text-soft-400">{siteConfig.location}</p>

      <section className="mt-16">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-text-soft-400">
          Skills
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-strong-950">Leadership</h3>
            <ul className="space-y-1.5 text-sm text-text-sub-600">
              {siteConfig.skills.leadership.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-strong-950">UX & Research</h3>
            <ul className="space-y-1.5 text-sm text-text-sub-600">
              {siteConfig.skills.ux.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-strong-950">Tools</h3>
            <ul className="space-y-1.5 text-sm text-text-sub-600">
              {siteConfig.skills.tools.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-strong-950">Domain</h3>
            <ul className="space-y-1.5 text-sm text-text-sub-600">
              {siteConfig.skills.domain.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-border-soft-200 bg-bg-white-0 p-6">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-text-soft-400">
          Experience highlight
        </h2>
        <h3 className="text-lg font-semibold text-text-strong-950">Nike</h3>
        <p className="text-sm text-text-sub-600">
          Senior UX / Digital Product Designer · Design lead, internal ops tools
          · 8 years
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-sub-600">
          Led design for warehouse, inventory, and supply chain products.
          Mentored designers, facilitated critique, and governed patterns in the
          internal ops design system.
        </p>
      </section>
    </div>
  );
}
