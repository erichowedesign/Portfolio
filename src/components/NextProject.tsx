import Link from "next/link";
import { projectHref, type Project } from "@/data/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <div className="mx-auto mt-24 max-w-wide border-t border-surface-border px-6 pt-10">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
        Next project
      </p>
      <Link
        href={projectHref(project)}
        className="group inline-flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-ink transition hover:text-accent"
      >
        {project.title}
        <span className="transition group-hover:translate-x-1" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}
