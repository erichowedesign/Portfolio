import Link from "next/link";
import { projectHref, type Project } from "@/data/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <div className="mx-auto mt-24 max-w-wide border-t border-border-soft-200 px-6 pt-10">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-soft-400">
        Next project
      </p>
      <Link
        href={projectHref(project)}
        className="group inline-flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-text-strong-950 transition hover:text-brand-base"
      >
        {project.title}
        <span className="transition group-hover:translate-x-1" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}
