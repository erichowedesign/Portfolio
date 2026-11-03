import Link from "next/link";
import { projectHref, type Project } from "@/data/projects";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={projectHref(project)}
      className="group block rounded-xl border border-border-soft-200 bg-bg-white-0 p-4 transition hover:border-border-sub-300 hover:shadow-sm"
    >
      <ImagePlaceholder slot={project.cover} className="mb-5" />
      <div className="px-2 pb-2">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-soft-400">
          {project.kind === "case-study" ? "Case study" : "Project"} · {project.category}
        </p>
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-text-strong-950 group-hover:text-brand-base">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-text-sub-600">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg-weak-50 px-2.5 py-0.5 text-xs text-text-sub-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
