import { projectHref, type Project } from "@/data/projects";
import { WideCard } from "@/components/WideCard";

export function ProjectWideCard({ project }: { project: Project }) {
  return (
    <WideCard
      href={projectHref(project)}
      cover={project.cover}
      eyebrow={`${project.category} · ${project.year}`}
      title={project.title}
      summary={project.summary}
      footer={
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
      }
    />
  );
}
