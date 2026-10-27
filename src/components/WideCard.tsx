import Link from "next/link";
import type { ImageSlot } from "@/data/projects";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

type Props = {
  href: string;
  cover: ImageSlot;
  eyebrow: string;
  title: string;
  summary: string;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
};

export function WideCard({ href, cover, eyebrow, title, summary, badge, footer }: Props) {
  return (
    <Link
      href={href}
      className="group grid gap-6 rounded-xl border border-surface-border bg-surface-card p-4 transition hover:border-ink/20 hover:shadow-sm sm:grid-cols-[3fr_2fr] sm:items-center"
    >
      <ImagePlaceholder slot={{ ...cover, aspect: "video" }} />
      <div className="px-2 pb-2 sm:pr-6">
        {badge}
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
          {eyebrow}
        </p>
        <h3 className="mb-2 text-2xl font-semibold tracking-tight text-ink group-hover:text-accent">
          {title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-ink-muted">{summary}</p>
        {footer}
      </div>
    </Link>
  );
}
