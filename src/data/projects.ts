import { oldSiteProjects } from "@/data/oldSiteProjects";

export type ImageAspect = "wide" | "video" | "landscape" | "square" | "portrait";

export type ImageSlot = {
  label: string;
  /** Crops the image to this shape. Leave unset on real images to show them uncropped. */
  aspect?: ImageAspect;
  caption?: string;
  /** Path under /public, e.g. "/images/projects/relate/01.jpg". Without it, a wireframe box is shown. */
  src?: string;
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

export type GalleryProject = ProjectBase & {
  kind: "gallery";
  description: string[];
  /** Each row holds 1–3 images, displayed side by side. */
  gallery: ImageSlot[][];
};

export type Project = CaseStudy | GalleryProject;

export const siteConfig = {
  name: "Eric Howe",
  title: "Lead Product Designer",
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

export const projects: Project[] = [
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
  period: "2018 – 2026",
  summary: "One-line summary of the body of work at Nike.",
  intro: [
    "A short introduction to your time at Nike: the teams you were part of, the kinds of products you designed, and the scope of your role. Two or three sentences.",
    "Optional: a note on confidentiality, e.g. that details have been anonymized.",
  ],
  cover: { label: "Collection cover", aspect: "video" },
};

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
