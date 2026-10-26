export type ProjectSection = {
  title: string;
  content: string[];
  list?: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  impact: string;
  role: string;
  timeline: string;
  team: string;
  tags: string[];
  heroColor: string;
  overview: string;
  sections: ProjectSection[];
};

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

export const projects: Project[] = [
  {
    slug: "inventory-allocation-tool",
    title: "Regional Inventory Allocation Tool",
    subtitle: "Global athletic apparel company · Internal ops",
    impact: "~35% reduction in allocation task time · 12 regional teams",
    role: "Lead Product Designer",
    timeline: "14 months",
    team: "1 designer (guided) · 2 PMs · 6 engineers · ops SMEs",
    tags: ["Design leadership", "Workflow design", "Design systems"],
    heroColor: "from-slate-800 to-slate-600",
    overview:
      "Operational teams spent hours reconciling inventory across regions using spreadsheets and legacy tools. As design lead, I set UX direction and guided a designer through research and delivery for a unified allocation workflow adopted by 12 regional teams.",
    sections: [
      {
        title: "Context",
        content: [
          "Regional inventory planners and warehouse ops leads manage high-volume SKU allocation during seasonal peaks — high-stakes decisions under time pressure.",
          "Data lived in 4+ systems. Planners copied numbers manually. New hires required weeks of shadowing.",
        ],
      },
      {
        title: "Problem",
        content: [
          "Misallocation drove costly transfers and fulfillment delays. Planners lacked confidence in data and tools.",
          "Design challenge: surface complex constraints without overwhelming power users.",
        ],
      },
      {
        title: "Leadership",
        content: ["My scope as design lead:"],
        list: [
          "Set UX direction and IA strategy across 2 eng squads",
          "Guided 1 designer on research synthesis and deliverable quality",
          "Facilitated weekly critique with PM and eng leads",
          "Drove exception-first framework — pushed back on low-impact feature requests",
          "Established patterns adopted into internal ops design system",
        ],
      },
      {
        title: "Process",
        content: ["Research and alignment approach:"],
        list: [
          "Contextual inquiry with 8 planners across 3 regions",
          "Workflow mapping — 6 handoff points causing delay",
          "Cross-functional workshops with PM, eng, and ops",
          "Concept and usability testing before build",
        ],
      },
      {
        title: "Solution",
        content: ["Task-based navigation and progressive disclosure:"],
        list: [
          "Exception-first landing matched mental model",
          "Inline validation kept users in flow during bulk edits",
          "Audit log on same screen for trust and compliance",
          "Shared patterns aligned with internal ops design system",
        ],
      },
      {
        title: "Impact",
        content: [
          "~35% reduction in weekly allocation cycle time. 12 regional teams adopted across two rollout phases. Allocation patterns became reference flows for subsequent ops tools.",
        ],
      },
      {
        title: "Reflection",
        content: [
          "Embedding ops SMEs in critiques made decisions stick. I'd instrument analytics earlier to tie design changes to error rates across teams.",
        ],
      },
    ],
  },
  {
    slug: "returns-processing-dashboard",
    title: "Returns Processing Operations Dashboard",
    subtitle: "Global athletic apparel company · Internal ops",
    impact: "Fewer processing errors · 800+ daily users",
    role: "Lead Product Designer (player-coach)",
    timeline: "10 months",
    team: "1 PM · 4 engineers · returns ops lead",
    tags: ["Player-coach", "Ops UX", "Stakeholder leadership"],
    heroColor: "from-zinc-800 to-zinc-600",
    overview:
      "Returns center staff processed thousands of inbound items daily using fragmented screens. As sole designer on the pod, I owned design direction, stakeholder alignment, and quality bar for a unified dashboard serving 800+ daily users.",
    sections: [
      {
        title: "Context",
        content: [
          "Associates complete high-volume, repetitive tasks; supervisors manage throughput and exceptions across lanes.",
          "Users switched between 3 tools per item. Priority queues were unclear. Supervisors relied on end-of-day reports.",
        ],
      },
      {
        title: "Problem",
        content: [
          "Processing delays and errors increased cost per return. Associates needed speed and clarity; supervisors needed situational awareness without micromanaging.",
        ],
      },
      {
        title: "Leadership",
        content: ["Player-coach scope on the pod:"],
        list: [
          "Owned design direction with no direct reports — set standards for eng design reviews",
          "Advocated for role-based IA over separate tools; aligned ops leadership on shared data model",
          "Ran weekly working sessions with floor leads during pilot",
          "Defined scan-feedback patterns reused in subsequent floor-tool projects",
        ],
      },
      {
        title: "Process",
        content: ["Floor-first discovery:"],
        list: [
          "Site visits during peak receipt at 2 processing centers",
          "Task timing — 40% of time lost to context switching",
          "Co-design sessions with associates on paper",
          "Pilot prototype on one lane before full build",
        ],
      },
      {
        title: "Solution",
        content: ["Role-based views on a shared data model:"],
        list: [
          "Associate mode: scan → classify → disposition → next",
          "Supervisor mode: queue depth, error rate, active exceptions",
          "Large touch targets and immediate scan feedback",
          "Plain-language error recovery to reduce escalations",
        ],
      },
      {
        title: "Impact",
        content: [
          "Pilot lane showed ~25% fewer mis-classifications. Rolled out to 800+ daily users. Scan-feedback patterns adopted as reference for other ops tools.",
        ],
      },
      {
        title: "Reflection",
        content: [
          "Designing with associates on the floor surfaced constraints we wouldn't catch in Figma. Next time I'd run a longer pilot across shift changes.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
