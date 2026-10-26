import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-24 text-center">
      <h1 className="mb-4 text-2xl font-semibold text-ink">Page not found</h1>
      <Link href="/" className="text-sm text-accent hover:text-accent-hover">
        Return home
      </Link>
    </div>
  );
}
