import { collections, getCollectionProjects, siteConfig } from "@/data/projects";
import { CollectionCard } from "@/components/CollectionCard";
import { ProjectWideCard } from "@/components/ProjectWideCard";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-wide px-6 pb-16 pt-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-faint">
          {siteConfig.title}
        </p>
        <h1 className="max-w-content text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {siteConfig.summary}
        </h1>
        <p className="mt-6 max-w-content text-lg leading-relaxed text-ink-muted">
          Eight years at Nike leading design for internal operational tools. I
          combine hands-on workflow craft with team leadership — mentoring
          designers, facilitating critique, and scaling patterns through design
          systems.
        </p>
      </section>

      <section id="work" className="mx-auto max-w-wide px-6 pb-20">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-wider text-ink-faint">
          Work
        </h2>
        <div className="space-y-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
          {getCollectionProjects(undefined).map((project) => (
            <ProjectWideCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
