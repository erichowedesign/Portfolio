import { getCollectionProjects, type Collection } from "@/data/projects";
import { WideCard } from "@/components/WideCard";

export function CollectionCard({ collection }: { collection: Collection }) {
  const projects = getCollectionProjects(collection.slug);
  const caseStudyCount = projects.filter((p) => p.kind === "case-study").length;
  const projectCount = projects.length - caseStudyCount;

  return (
    <WideCard
      href={`/${collection.slug}`}
      cover={collection.cover}
      eyebrow={collection.period}
      title={collection.title}
      summary={collection.summary}
      badge={
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-surface-border px-2.5 py-1 text-xs font-medium text-ink-muted">
          <LockIcon />
          Password protected
        </p>
      }
      footer={
        <p className="text-sm text-ink-faint">
          {caseStudyCount} case {caseStudyCount === 1 ? "study" : "studies"} ·{" "}
          {projectCount} {projectCount === 1 ? "project" : "projects"}
        </p>
      }
    />
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
