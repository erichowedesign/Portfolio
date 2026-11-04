import { getNextProject, type Project } from "@/data/projects";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { GalleryLayout } from "@/components/GalleryLayout";
import { NikeCaseLayout } from "@/components/NikeCaseLayout";
import { SplitGalleryLayout } from "@/components/SplitGalleryLayout";
import { NextProject } from "@/components/NextProject";

export function ProjectView({ project }: { project: Project }) {
  const next = getNextProject(project);

  return (
    <>
      {project.kind === "case-study" ? (
        <CaseStudyLayout project={project} />
      ) : project.presentation === "nike-case" ? (
        <NikeCaseLayout project={project} />
      ) : project.presentation === "split" ? (
        <SplitGalleryLayout project={project} />
      ) : (
        <GalleryLayout project={project} />
      )}
      {next.slug !== project.slug &&
        !(
          project.kind === "gallery" &&
          (project.presentation === "split" || project.presentation === "nike-case")
        ) && <NextProject project={next} />}
    </>
  );
}
