import Link from "next/link";
import { backLink, type CaseStudy, type ImageSlot } from "@/data/projects";
import { ImagePlaceholder, ImageRow } from "@/components/ImagePlaceholder";
import { MetaList } from "@/components/MetaList";

export function CaseStudyLayout({ project }: { project: CaseStudy }) {
  const back = backLink(project);

  return (
    <article className="py-16">
      <header className="mx-auto max-w-content px-6">
        <Link
          href={back.href}
          className="mb-8 inline-block text-sm text-ink-muted transition hover:text-ink"
        >
          ← {back.label}
        </Link>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
          Case study · {project.category} · {project.year}
        </p>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {project.title}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-ink-muted">
          {project.overview}
        </p>
        <MetaList items={project.meta} />
      </header>

      <div className="mx-auto mt-12 max-w-wide px-6">
        <ImagePlaceholder slot={{ label: "Hero image", aspect: "wide" }} />
      </div>

      <dl className="mx-auto mt-12 grid max-w-content gap-6 px-6 sm:grid-cols-3">
        {project.highlights.map((item) => (
          <div
            key={item.label}
            className="flex flex-col-reverse rounded-xl border border-surface-border bg-surface-card p-5"
          >
            <dt className="mt-1 text-sm text-ink-muted">{item.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      {project.sections.map((section) => (
        <section key={section.title} className="mt-16">
          <div className="prose-case mx-auto max-w-content px-6">
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          {section.images && <SectionImages images={section.images} />}
        </section>
      ))}
    </article>
  );
}

function SectionImages({ images }: { images: ImageSlot[] }) {
  const [first, ...rest] = images;
  const leadIsWide = first.aspect === "wide" || first.aspect === "video";

  return (
    <div className="mx-auto mt-8 max-w-wide space-y-4 px-6">
      {leadIsWide ? (
        <>
          <ImagePlaceholder slot={first} />
          {rest.length > 0 && <ImageRow images={rest} />}
        </>
      ) : (
        <ImageRow images={images} />
      )}
    </div>
  );
}
