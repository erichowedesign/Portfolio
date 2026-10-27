import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectSections({ projects }: { projects: Project[] }) {
  const caseStudies = projects.filter((p) => p.kind === "case-study");
  const galleryProjects = projects.filter((p) => p.kind === "gallery");

  return (
    <>
      {caseStudies.length > 0 && (
        <section className="mx-auto max-w-wide px-6 pb-16">
          <h2 className="mb-8 text-sm font-medium uppercase tracking-wider text-ink-faint">
            Case studies
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {caseStudies.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {galleryProjects.length > 0 && (
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
      )}
    </>
  );
}
