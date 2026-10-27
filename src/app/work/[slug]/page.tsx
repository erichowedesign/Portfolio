import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/data/projects";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { GalleryLayout } from "@/components/GalleryLayout";
import { NextProject } from "@/components/NextProject";

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
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      {project.kind === "case-study" ? (
        <CaseStudyLayout project={project} />
      ) : (
        <GalleryLayout project={project} />
      )}
      <NextProject project={getNextProject(slug)} />
    </>
  );
}
