import Link from "next/link";
import { caseStudies, galleryProjects, siteConfig } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-wide px-6 pb-16 pt-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-faint">
          {siteConfig.title}
        </p>
        <h1 className="max-w-content text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {siteConfig.summary}
        </h1>
        <p className="mt-6 max-w-content text-lg leading-relaxed text-ink-muted">
          Eight years at Nike leading design for internal operational tools. I
          combine hands-on workflow craft with team leadership — mentoring
          designers, facilitating critique, and scaling patterns through design
          systems.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="#work"
            className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink/90"
          >
            View selected work
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-surface-border px-5 py-2.5 text-sm font-medium text-ink transition hover:border-ink/30"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-wide px-6 pb-16">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-wider text-ink-faint">
          Case studies
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {caseStudies.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-wide px-6 pb-20">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-wider text-ink-faint">
          More projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
