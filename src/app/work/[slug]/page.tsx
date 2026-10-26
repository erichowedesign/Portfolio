import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.overview,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <Link
        href="/#work"
        className="mb-8 inline-block text-sm text-ink-muted transition hover:text-ink"
      >
        ← Back to work
      </Link>

      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
        {project.subtitle}
      </p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {project.title}
      </h1>
      <p className="mb-8 text-lg font-medium text-accent">{project.impact}</p>

      <dl className="mb-12 grid gap-4 border-y border-surface-border py-6 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            Role
          </dt>
          <dd className="mt-1 text-sm text-ink">{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            Timeline
          </dt>
          <dd className="mt-1 text-sm text-ink">{project.timeline}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            Team
          </dt>
          <dd className="mt-1 text-sm text-ink">{project.team}</dd>
        </div>
      </dl>

      <div
        className={`mb-12 h-56 rounded-xl bg-gradient-to-br ${project.heroColor}`}
        aria-hidden
      />

      <p className="mb-12 text-lg leading-relaxed text-ink-muted">
        {project.overview}
      </p>

      <div className="prose-case">
        {project.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.content.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-surface-border bg-surface p-6">
        <p className="text-sm text-ink-muted">
          <strong className="text-ink">Note:</strong> Case study anonymized per
          employer guidelines. Replace placeholder visuals with your redacted
          screens from Figma exports in{" "}
          <code className="rounded bg-surface-card px-1.5 py-0.5 font-mono text-xs">
            portfolio/public/images/
          </code>
          .
        </p>
      </div>
    </article>
  );
}
