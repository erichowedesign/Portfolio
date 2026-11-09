import { oldSiteProjects } from "@/data/oldSiteProjects";

export type ImageAspect = "wide" | "video" | "landscape" | "square" | "portrait";

export type ImageSlot = {
  label: string;
  /** Crops the image to this shape. Leave unset on real images to show them uncropped. */
  aspect?: ImageAspect;
  caption?: string;
  /** Path under /public, e.g. "/images/projects/nikeplus/01.jpg". Without it, a wireframe box is shown. */
  src?: string;
  /** Looping video, used in place of an image. */
  video?: string;
  width?: number;
  height?: number;
};

export type MetaItem = {
  label: string;
  value: string;
};

export type Collection = {
  slug: string;
  title: string;
  period: string;
  /** Italic line under the title on the collection landing. */
  subtitle: string;
  /** One line shown on the home page card. */
  summary: string;
  intro: string[];
  cover: ImageSlot;
};

type ProjectBase = {
  slug: string;
  /** Projects in a collection live under /{collection}/{slug} and share its password. */
  collection?: string;
  title: string;
  category: string;
  year: string;
  /** One line shown on project cards. */
  summary: string;
  tags: string[];
  cover: ImageSlot;
  meta: MetaItem[];
};

export type CaseStudySection = {
  title: string;
  body: string[];
  list?: string[];
  /** Images render below the text; 2–3 images sit side by side. */
  images?: ImageSlot[];
};

export type CaseStudy = ProjectBase & {
  kind: "case-study";
  overview: string;
  highlights: MetaItem[];
  sections: CaseStudySection[];
};

/** Copy that replaces the split sidebar while this stretch of images is in view. */
export type GalleryChapter = {
  subheading: string;
  description: string[];
  /** Index of this chapter's first image in `gallery`, flattened. */
  start: number;
  /** Wider gap above this chapter's first image. */
  separated?: boolean;
};

export type GalleryProject = ProjectBase & {
  kind: "gallery";
  description: string[];
  /** Each row holds 1–3 images, displayed side by side. */
  gallery: ImageSlot[][];
  /** "split" is the Figma sidebar + image well. Default is the stacked layout. */
  presentation?: "stack" | "split" | "nike-case";
  /** Small line above the title. Year comes after the dash, e.g. "Nike - 2018". */
  eyebrow?: string;
  /** Large title in the split sidebar. Falls back to `title`. */
  heading?: string;
  /** Line under the heading in the split sidebar. */
  subheading?: string;
  /** Shown before the year in the split sidebar, e.g. "R/GA - 2016". */
  studio?: string;
  /**
   * When set, the split sidebar swaps to the chapter whose images are at the
   * top of the well. Chapters run in order and cover the whole gallery.
   */
  chapters?: GalleryChapter[];
  /**
   * Extra space above a separated chapter, added to the 24px image gap.
   * Defaults to 48, which makes a 72px break.
   */
  chapterGap?: number;
};

export type Project = CaseStudy | GalleryProject;

export const siteConfig = {
  name: "Eric Howe",
  title: "Senior Digital Product Designer",
  email: "erichowedesign@gmail.com",
  linkedin: "https://www.linkedin.com/in/eric-howe-76a771b4/",
  location: "Portland, OR · Open to remote",
  summary:
    "I lead design for complex operational tools — setting direction, elevating team craft, and scaling patterns across enterprise products.",
  bio: [
    "For eight years at Nike, I led design for internal tools serving warehouse, inventory, and supply chain teams. I combined hands-on workflow design with team leadership: mentoring designers, facilitating critique, and governing patterns in our internal design system.",
    "I'm looking for Lead Product Designer roles where I can bring that player-coach approach to enterprise, B2B SaaS, or operational products — partnering with design directors, PM, and engineering to ship outcomes at scale.",
  ],
  skills: {
    leadership: [
      "Design direction",
      "Team mentorship",
      "Design critique",
      "Cross-team alignment",
      "Design system governance",
      "Stakeholder facilitation",
    ],
    ux: [
      "User research",
      "Contextual inquiry",
      "Journey mapping",
      "Workflow design",
      "Information architecture",
      "Prototyping",
      "Usability testing",
    ],
    tools: ["Figma", "FigJam", "Miro", "Jira", "Confluence"],
    domain: [
      "Enterprise UX",
      "Internal tools",
      "Operational workflows",
      "Design systems",
      "B2B SaaS",
    ],
  },
};

const caseStudyMeta: MetaItem[] = [
  { label: "Role", value: "Your title on the project" },
  { label: "Timeline", value: "Duration · Year" },
  { label: "Team", value: "Who you worked with" },
  { label: "Tools", value: "Figma, FigJam, etc." },
];

const caseStudyHighlights: MetaItem[] = [
  { label: "Outcome metric", value: "00%" },
  { label: "Adoption or scale", value: "000+" },
  { label: "Time or cost saved", value: "0x" },
];

const caseStudySections: CaseStudySection[] = [
  {
    title: "Context",
    body: [
      "Who the users are, what the business does, and what the world looked like before this project. Two or three sentences.",
    ],
  },
  {
    title: "Problem",
    body: [
      "The core problem in one or two sentences, framed from the user's and the business's point of view.",
      "Optional: the design challenge or key constraint that made this hard.",
    ],
    images: [{ label: "Before state / current experience", aspect: "video" }],
  },
  {
    title: "My role",
    body: ["What you owned and how you led:"],
    list: [
      "Scope of ownership and decisions you drove",
      "People you guided, mentored, or aligned",
      "Rituals you ran (critique, workshops, reviews)",
    ],
  },
  {
    title: "Process",
    body: [
      "How you got from problem to solution — research, synthesis, exploration, testing. Show the messy middle.",
    ],
    list: ["Research method + what you learned", "Key insight that shaped direction", "How you validated it"],
    images: [
      { label: "Research artifact", aspect: "landscape", caption: "Caption for the artifact" },
      { label: "Journey map / flow", aspect: "landscape", caption: "Caption for the flow" },
    ],
  },
  {
    title: "Solution",
    body: ["The final design and the reasoning behind the most important decisions."],
    images: [
      { label: "Key screen", aspect: "wide", caption: "Caption describing the key screen" },
      { label: "Detail", aspect: "square" },
      { label: "Detail", aspect: "square" },
      { label: "Detail", aspect: "square" },
    ],
  },
  {
    title: "Outcomes",
    body: [
      "What changed because of this work — metrics, adoption, qualitative feedback, and anything the team kept building on.",
    ],
  },
  {
    title: "Reflection",
    body: ["What you learned, and what you'd do differently next time."],
  },
];

const galleryDescription = [
  "A short description of the project: what it is, who it was for, and what you contributed. Two or three sentences.",
];

const materialLibraryImage = (file: string): ImageSlot => ({
  label: "Material Library",
  src: `/nike/media/material-library/${file}`,
  width: 2880,
  height: 2048,
});

export const projects: Project[] = [
  {
    kind: "gallery",
    collection: "nike",
    slug: "material-library",
    title: "Material Library",
    category: "Internal Platform",
    year: "2018",
    summary:
      "Nike's Material Library brought an extensive collection of physical materials into a centralized digital experience.",
    tags: [],
    cover: materialLibraryImage("01.png"),
    meta: [
      { label: "Client", value: "Nike" },
      { label: "Year", value: "2018" },
    ],
    description: [
      "Nike's Material Library brought an extensive collection of physical materials into a centralized digital experience. The platform made it easier for footwear and apparel teams to discover, browse, and explore materials, while connecting material information to other tools across Nike's product creation process.",
    ],
    gallery: [
      [materialLibraryImage("01.png")],
      [materialLibraryImage("02.png")],
      [materialLibraryImage("03.png")],
      [materialLibraryImage("04.png")],
    ],
    presentation: "nike-case",
    heading: "Material Library",
    subheading: "Internal Platform",
    eyebrow: "Nike - 2018",
  },
  {
    kind: "case-study",
    collection: "nike",
    slug: "case-study-one",
    title: "Case Study One",
    category: "Company · Product area",
    year: "2025",
    summary: "One-line summary of the project and its headline outcome.",
    tags: ["Tag one", "Tag two", "Tag three"],
    cover: { label: "Cover image", aspect: "landscape" },
    meta: caseStudyMeta,
    overview:
      "A two-to-three sentence overview: the problem, what you did, and the result. Someone who only reads this paragraph should understand the project.",
    highlights: caseStudyHighlights,
    sections: caseStudySections,
  },
  {
    kind: "case-study",
    collection: "nike",
    slug: "case-study-two",
    title: "Case Study Two",
    category: "Company · Product area",
    year: "2024",
    summary: "One-line summary of the project and its headline outcome.",
    tags: ["Tag one", "Tag two"],
    cover: { label: "Cover image", aspect: "landscape" },
    meta: caseStudyMeta,
    overview:
      "A two-to-three sentence overview: the problem, what you did, and the result. Someone who only reads this paragraph should understand the project.",
    highlights: caseStudyHighlights,
    sections: caseStudySections,
  },
  {
    kind: "gallery",
    collection: "nike",
    slug: "project-one",
    title: "Project One",
    category: "Visual design",
    year: "2025",
    summary: "One-line description of the work shown.",
    tags: ["Tag one", "Tag two"],
    cover: { label: "Cover image", aspect: "landscape" },
    meta: [
      { label: "Type", value: "Project type" },
      { label: "Year", value: "2025" },
      { label: "Tools", value: "Figma" },
    ],
    description: galleryDescription,
    gallery: [
      [{ label: "Hero image", aspect: "wide" }],
      [
        { label: "Screen", aspect: "landscape" },
        { label: "Screen", aspect: "landscape" },
      ],
      [{ label: "Full-width image", aspect: "video", caption: "Optional caption" }],
      [
        { label: "Detail", aspect: "square" },
        { label: "Detail", aspect: "square" },
        { label: "Detail", aspect: "square" },
      ],
    ],
  },
  {
    kind: "gallery",
    collection: "nike",
    slug: "project-two",
    title: "Project Two",
    category: "Mobile app",
    year: "2024",
    summary: "One-line description of the work shown.",
    tags: ["Tag one", "Tag two"],
    cover: { label: "Cover image", aspect: "landscape" },
    meta: [
      { label: "Type", value: "Project type" },
      { label: "Year", value: "2024" },
      { label: "Tools", value: "Figma" },
    ],
    description: galleryDescription,
    gallery: [
      [{ label: "Hero image", aspect: "video" }],
      [
        { label: "Mobile screen", aspect: "portrait" },
        { label: "Mobile screen", aspect: "portrait" },
        { label: "Mobile screen", aspect: "portrait" },
      ],
      [{ label: "Full-width image", aspect: "wide" }],
    ],
  },
  {
    kind: "gallery",
    collection: "nike",
    slug: "project-three",
    title: "Project Three",
    category: "Design system",
    year: "2023",
    summary: "One-line description of the work shown.",
    tags: ["Tag one"],
    cover: { label: "Cover image", aspect: "landscape" },
    meta: [
      { label: "Type", value: "Project type" },
      { label: "Year", value: "2023" },
      { label: "Tools", value: "Figma" },
    ],
    description: galleryDescription,
    gallery: [
      [{ label: "Hero image", aspect: "wide" }],
      [
        { label: "Component sheet", aspect: "square" },
        { label: "Component sheet", aspect: "square" },
      ],
      [{ label: "Full-width image", aspect: "video" }],
    ],
  },
  ...oldSiteProjects,
];

export const nikeCollection: Collection = {
  slug: "nike",
  title: "Nike",
  period: "Nike - 2018-2026",
  subtitle: "Digital Product Creation",
  summary: "Digital Product Creation - 2018-2026",
  intro: [
    "Over eight years at Nike, I designed digital products that supported the teams behind Nike's footwear and apparel creation process. My work ranged from individual tools to large, connected platforms, focused on simplifying complex workflows, modernizing legacy systems, and creating intuitive, thoughtfully crafted experiences.",
  ],
  cover: { label: "Nike", src: "/images/projects/nike/splash_nikethumb.png", aspect: "video" },
};

export type PortfolioStop = {
  href: string;
  label: string;
};

/** Home order, with Nike first so next and previous land on this page. */
export function portfolioStops(): PortfolioStop[] {
  return [
    { href: `/${nikeCollection.slug}`, label: nikeCollection.title },
    ...oldSiteProjects.map((project) => ({
      href: `/work/${project.slug}`,
      label: project.heading ?? project.title,
    })),
  ];
}

export function adjacentPortfolioStops(href: string): {
  previous: PortfolioStop;
  next: PortfolioStop;
} {
  const stops = portfolioStops();
  const index = Math.max(
    0,
    stops.findIndex((stop) => stop.href === href),
  );
  return {
    previous: stops[(index - 1 + stops.length) % stops.length],
    next: stops[(index + 1) % stops.length],
  };
}

export const collections: Collection[] = [nikeCollection];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProjects(collection: string | undefined): Project[] {
  return projects.filter((p) => p.collection === collection);
}

export function getProject(
  slug: string,
  collection?: string,
): Project | undefined {
  return getCollectionProjects(collection).find((p) => p.slug === slug);
}

export function getNextProject(project: Project): Project {
  const siblings = getCollectionProjects(project.collection);
  const index = siblings.findIndex((p) => p.slug === project.slug);
  return siblings[(index + 1) % siblings.length];
}

export function getPreviousProject(project: Project): Project {
  const siblings = getCollectionProjects(project.collection);
  const index = siblings.findIndex((p) => p.slug === project.slug);
  return siblings[(index - 1 + siblings.length) % siblings.length];
}

export function projectHref(project: Project): string {
  return project.collection
    ? `/${project.collection}/${project.slug}`
    : `/work/${project.slug}`;
}

export function backLink(project: Project): { href: string; label: string } {
  const collection = project.collection && getCollection(project.collection);
  return collection
    ? { href: `/${collection.slug}`, label: `Back to ${collection.title}` }
    : { href: "/#work", label: "Back to work" };
}
