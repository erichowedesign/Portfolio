import { siteConfig } from "@/data/projects";

export function UnderConstruction() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-content">
        <p className="mb-6 text-xs font-medium uppercase tracking-wider text-ink-faint">
          Under construction
        </p>
        <h1 className="mb-3 text-4xl font-semibold tracking-tight text-ink">
          {siteConfig.name}
        </h1>
        <p className="mb-8 text-lg text-ink-muted">{siteConfig.title}</p>
        <p className="mb-12 text-lg leading-relaxed text-ink-muted">
          My portfolio is being built and will be up soon. In the meantime,
          I&apos;d love to hear from you.
        </p>

        <div className="space-y-6">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-faint">
              Email
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-base font-medium text-accent hover:text-accent-hover"
            >
              {siteConfig.email}
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-faint">
              LinkedIn
            </p>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-accent hover:text-accent-hover"
            >
              {siteConfig.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-ink-faint">
              Location
            </p>
            <p className="text-base text-ink">{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
