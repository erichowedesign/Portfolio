import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionProjects, getProject, nikeCollection } from "@/data/projects";
import { ProjectView } from "@/components/ProjectView";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getCollectionProjects(nikeCollection.slug).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, nikeCollection.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function NikeProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug, nikeCollection.slug);
  if (!project) notFound();

  return <ProjectView project={project} />;
}
