import type { Metadata } from "next";
import Link from "next/link";
import { getCollectionProjects, nikeCollection } from "@/data/projects";
import { ProjectSections } from "@/components/ProjectSections";

export const metadata: Metadata = {
  title: nikeCollection.title,
};

export default function NikePage() {
  return (
    <>
      <section className="mx-auto max-w-wide px-6 pb-16 pt-20">
        <Link
          href="/#work"
          className="mb-8 inline-block text-sm text-ink-muted transition hover:text-ink"
        >
          ← Back home
        </Link>
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-faint">
          {nikeCollection.period}
        </p>
        <h1 className="max-w-content text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {nikeCollection.title}
        </h1>
        {nikeCollection.intro.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-6 max-w-content text-lg leading-relaxed text-ink-muted"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <ProjectSections projects={getCollectionProjects(nikeCollection.slug)} />
    </>
  );
}
