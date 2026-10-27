import Link from "next/link";
import { backLink, type GalleryProject } from "@/data/projects";
import { ImageRow } from "@/components/ImagePlaceholder";

export function GalleryLayout({ project }: { project: GalleryProject }) {
  const back = backLink(project);

  return (
    <article className="py-16">
      <header className="mx-auto max-w-wide px-6">
        <Link
          href={back.href}
          className="mb-8 inline-block text-sm text-ink-muted transition hover:text-ink"
        >
          ← {back.label}
        </Link>
        <div className="grid gap-8 sm:grid-cols-[2fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
              {project.category} · {project.year}
            </p>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {project.title}
            </h1>
            {project.description.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-lg leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="space-y-4 sm:pt-8">
            {project.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-wide space-y-4 px-6">
        {project.gallery.map((row, i) => (
          <ImageRow key={i} images={row} />
        ))}
      </div>
    </article>
  );
}
