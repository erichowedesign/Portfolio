import type { MetaItem } from "@/data/projects";

const columns: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function MetaList({ items }: { items: MetaItem[] }) {
  return (
    <dl
      className={`grid gap-4 border-y border-surface-border py-6 ${columns[items.length] ?? "sm:grid-cols-3"}`}
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
