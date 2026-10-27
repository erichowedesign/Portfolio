import Link from "next/link";
import type { Project } from "@/data/projects";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-xl border border-surface-border bg-surface-card p-4 transition hover:border-ink/20 hover:shadow-sm"
    >
      <ImagePlaceholder slot={project.cover} className="mb-5" />
      <div className="px-2 pb-2">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
          {project.kind === "case-study" ? "Case study" : "Project"} · {project.category}
        </p>
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-ink group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-ink-muted">
          {project.summary}
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
      </div>
    </Link>
  );
}
