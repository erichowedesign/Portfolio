import { siteConfig } from "@/data/projects";

export function UnderConstruction() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-content">
        <p className="mb-6 text-xs font-medium uppercase tracking-wider text-text-soft-400">
          Under construction
        </p>
        <h1 className="mb-3 text-4xl font-semibold tracking-tight text-text-strong-950">
          {siteConfig.name}
        </h1>
        <p className="mb-8 text-lg text-text-sub-600">{siteConfig.title}</p>
        <p className="mb-12 text-lg leading-relaxed text-text-sub-600">
          My portfolio is being built and will be up soon. In the meantime,
          I&apos;d love to hear from you.
        </p>

        <div className="space-y-6">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-soft-400">
              Email
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-base font-medium text-brand-base hover:text-brand-dark"
            >
              {siteConfig.email}
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-soft-400">
              LinkedIn
            </p>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-brand-base hover:text-brand-dark"
            >
              {siteConfig.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-soft-400">
              Location
            </p>
            <p className="text-base text-text-strong-950">{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
