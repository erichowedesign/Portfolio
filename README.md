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

## Deploy to Vercel (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo — set **Root Directory** to `portfolio`
4. Deploy (defaults work for Next.js)
5. Add custom domain in Vercel project settings if you have one

### CLI alternative

```bash
npm i -g vercel
cd portfolio
vercel
```

Follow prompts. Production URL will look like `your-project.vercel.app`.

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
