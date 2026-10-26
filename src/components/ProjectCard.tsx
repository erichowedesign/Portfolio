import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-xl border border-surface-border bg-surface-card p-6 transition hover:border-ink/20 hover:shadow-sm"
    >
      <div
        className={`mb-6 h-40 rounded-lg bg-gradient-to-br ${project.heroColor} opacity-90 transition group-hover:opacity-100`}
        aria-hidden
      />
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
        {project.subtitle}
      </p>
      <h3 className="mb-2 text-lg font-semibold tracking-tight text-ink group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-ink-muted">
        {project.impact}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-ink-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
