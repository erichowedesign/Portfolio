import { getNextProject, type Project } from "@/data/projects";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { GalleryLayout } from "@/components/GalleryLayout";
import { SplitGalleryLayout } from "@/components/SplitGalleryLayout";
import { NextProject } from "@/components/NextProject";

export function ProjectView({ project }: { project: Project }) {
  const next = getNextProject(project);

  return (
    <>
      {project.kind === "case-study" ? (
        <CaseStudyLayout project={project} />
      ) : project.presentation === "split" ? (
        <SplitGalleryLayout project={project} />
      ) : (
        <GalleryLayout project={project} />
      )}
      {next.slug !== project.slug &&
        !(project.kind === "gallery" && project.presentation === "split") && (
          <NextProject project={next} />
        )}
    </>
  );
}
