import Link from "next/link";
import { getCollectionProjects, type Collection } from "@/data/projects";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function CollectionCard({ collection }: { collection: Collection }) {
  const projects = getCollectionProjects(collection.slug);
  const caseStudyCount = projects.filter((p) => p.kind === "case-study").length;
  const projectCount = projects.length - caseStudyCount;

  return (
    <Link
      href={`/${collection.slug}`}
      className="group grid gap-6 rounded-xl border border-surface-border bg-surface-card p-4 transition hover:border-ink/20 hover:shadow-sm sm:grid-cols-[3fr_2fr] sm:items-center"
    >
      <ImagePlaceholder slot={collection.cover} />
      <div className="px-2 pb-2 sm:pr-6">
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-surface-border px-2.5 py-1 text-xs font-medium text-ink-muted">
          <LockIcon />
          Password protected
        </p>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
          {collection.period}
        </p>
        <h3 className="mb-2 text-2xl font-semibold tracking-tight text-ink group-hover:text-accent">
          {collection.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-ink-muted">
          {collection.summary}
        </p>
        <p className="text-sm text-ink-faint">
          {caseStudyCount} case {caseStudyCount === 1 ? "study" : "studies"} ·{" "}
          {projectCount} {projectCount === 1 ? "project" : "projects"}
        </p>
      </div>
    </Link>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
