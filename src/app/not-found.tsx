import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-24 text-center">
      <h1 className="mb-4 text-2xl font-semibold text-text-strong-950">Page not found</h1>
      <Link href="/" className="text-sm text-brand-base hover:text-brand-dark">
        Return home
      </Link>
    </div>
  );
}
