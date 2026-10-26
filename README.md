# Portfolio Site — Deploy Guide

Next.js + Tailwind portfolio MVP. Home, About, 2 case studies, Contact.

## Prerequisites

Install Node.js 18+ from [nodejs.org](https://nodejs.org/) or via Homebrew:

```bash
brew install node
```

## Local development

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize before launch

Edit **`src/data/projects.ts`**:

- `siteConfig.email` — your real email
- `siteConfig.linkedin` — your LinkedIn URL
- `siteConfig.name` — if not Eric Howe
- Project content — replace with your real Nike projects from `../case-studies/`

Add screenshots to **`public/images/`** and reference them in case study pages when ready.

## Deploy

Live at [erichowe.com](https://erichowe.com). Hosted on Vercel (project `portfolio`), code at [erichowedesign/Portfolio](https://github.com/erichowedesign/Portfolio).

Deploys are automatic:

- Push to `main` → production deploy to erichowe.com
- Push any other branch → preview deploy with its own URL

```bash
git add -A
git commit -m "Describe the change"
git push
```

Manual deploy from this folder (bypasses GitHub): `npx vercel --prod`

## Update resume & LinkedIn

Once deployed, add the live URL to:

- `../resume/resume-v1.md`
- `../linkedin/linkedin-v1.md`
- LinkedIn Featured section

## Build check

```bash
npm run build
```

Fix any TypeScript errors before deploying.
