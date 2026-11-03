import type { Metadata } from "next";
import Link from "next/link";
import { safeNextPath } from "@/lib/access";
import { siteConfig } from "@/data/projects";
import { unlock } from "./actions";

export const metadata: Metadata = {
  title: "Password required",
  robots: { index: false },
};

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function UnlockPage({ searchParams }: Props) {
  const { next, error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-soft-400">
        Password protected
      </p>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-text-strong-950">
        This work is confidential
      </h1>
      <p className="mb-8 leading-relaxed text-text-sub-600">
        Enter the password to view it. Don&apos;t have one?{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-brand-base hover:text-brand-dark"
        >
          Email me
        </a>{" "}
        and I&apos;ll send it over.
      </p>

      <form action={unlock} className="space-y-4">
        <input type="hidden" name="next" value={safeNextPath(next)} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-text-strong-950">Password</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            autoComplete="current-password"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "password-error" : undefined}
            className="w-full rounded-lg border border-border-soft-200 bg-bg-white-0 px-3 py-2.5 text-text-strong-950 outline-none transition focus:border-brand-base aria-[invalid=true]:border-state-error-base-500"
          />
        </label>
        {error && (
          <p id="password-error" className="text-sm text-state-error-base-500">
            That password didn&apos;t work. Try again.
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-bg-strong-950 px-5 py-2.5 text-sm font-medium text-text-white-0 transition hover:bg-bg-strong-950/90"
        >
          View work
        </button>
      </form>

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-text-sub-600 transition hover:text-text-strong-950"
      >
        ← Back home
      </Link>
    </div>
  );
}
