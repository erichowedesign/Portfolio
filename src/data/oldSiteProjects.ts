import type { GalleryProject, ImageSlot } from "@/data/projects";

// Projects carried over from the old Squarespace site. Images live in public/images/projects/{slug}/.

const description = [
  "A short description of the project: what it is, who it was for, and what you contributed. Two or three sentences.",
];

function oldSiteProject(
  slug: string,
  title: string,
  client: string,
  year: string,
  /** Card image on the home page, in public/images/projects/{slug}/. Shown cropped to 16:9. */
  splash: string,
  gallery: ImageSlot[][],
  extras: Partial<GalleryProject> = {},
): GalleryProject {
  return {
    kind: "gallery",
    slug,
    title,
    category: client,
    year,
    summary: "One-line description of the work shown.",
    tags: [],
    cover: { label: title, src: `/images/projects/${slug}/${splash}`, aspect: "video" },
    meta: [
      { label: "Client", value: client },
      { label: "Year", value: year },
    ],
    description,
    gallery,
    presentation: "split",
    heading: title.split(" — ")[0],
    subheading: title.split(" — ")[1],
    ...extras,
  };
}

const nikePlus = (file: string, width: number, height: number): ImageSlot => ({
  label: "Nike+",
  src: `/images/projects/nikeplus/${file}`,
  width,
  height,
});

const googleImage = (file: string, width: number, height: number): ImageSlot => ({
  label: "Google",
  src: `/images/projects/google-product-experts/${file}`,
  width,
  height,
});

const googleIntro = [
  "In 2017, R/GA partnered with Google to completely reimagine its Top Contributor Program, creating a new identity and recognition system for some of Google's most knowledgeable community members. Working closely with my team of designers, I helped bring the experience to life through visual design, branding, and iconography. The challenge was creating a premium, cohesive visual language that clearly communicated different levels of expertise while remaining flexible enough to work across Google's various products, forums, and platforms.",
];

const nikePlusIntro = [
  "In 2015, R/GA partnered with Nike to completely redesign the Nike+ web experience. Serving millions of users, Nike+ was the central hub that brought together activity and fitness data from Nike's growing ecosystem of apps. Working alongside a talented team of designers, I designed several key areas of the experience and collaborated with engineering through development and QA to help bring the redesigned platform to life.",
];

export const oldSiteProjects: GalleryProject[] = [
  oldSiteProject(
    "google-product-experts",
    "Google — Product Experts",
    "Google",
    "2017",
    "splash_google.webp",
    [
      [googleImage("24.jpg", 1920, 1080)],
      [googleImage("17.jpg", 1920, 1080)],
      [googleImage("05.jpg", 1920, 1080)],
      [googleImage("07.jpg", 1920, 1080)],
      [googleImage("21.jpg", 1920, 1080)],
      [googleImage("26.jpg", 1920, 1080)],
      [googleImage("15.jpg", 1920, 1080)],
      [googleImage("11.jpg", 1440, 5672)],
      [googleImage("23.jpg", 1920, 1080)],
      [googleImage("25.jpg", 1920, 1080)],
      [googleImage("09.jpg", 1440, 2051)],
      [googleImage("10.jpg", 1920, 1080)],
      [googleImage("18.jpg", 1440, 3198)],
      [googleImage("14.jpg", 1920, 1080)],
      [googleImage("01.jpg", 1920, 1080)],
      [googleImage("08.jpg", 1920, 1080)],
      [googleImage("29.jpg", 1920, 1080)],
      [googleImage("20.jpg", 1440, 2161)],
      [googleImage("27.jpg", 1920, 1080)],
      [googleImage("16.jpg", 1920, 1080)],
      [googleImage("30.jpg", 1920, 1080)],
      [googleImage("12.jpg", 1920, 1080)],
      [googleImage("04.jpg", 1920, 1080)],
      [googleImage("22.jpg", 1920, 1080)],
    ],
    {
      studio: "R/GA",
      heading: "Google",
      subheading: "Product Experts",
      description: googleIntro,
      chapterGap: 64,
      chapters: [
        { subheading: "Product Experts", description: googleIntro, start: 0 },
        {
          subheading: "Product Experts - Branding",
          description: ["First, we created a logo and visual design system."],
          start: 1,
          separated: true,
        },
        {
          subheading: "Product Experts - Marketing Website",
          description: ["We then created a marketing website to attract new candidates into the program."],
          start: 7,
          separated: true,
        },
        {
          subheading: "Product Experts - Profile Setup",
          description: ["Product Expert Candidates are taken to profile creation."],
          start: 10,
        },
        {
          subheading: "Product Experts - Activity Tracker",
          description: [
            "After the Product Expert remains active, they level up to Early Product Expert and are able to track activity in the profile.",
          ],
          start: 12,
          separated: true,
        },
        {
          subheading: "Product Experts - Public Profile",
          description: [
            "Continued activity levels the user up to Product Expert; unlocking the ability to then create a public profile.",
          ],
          start: 16,
          separated: true,
        },
        {
          subheading: "Product Experts - Directory",
          description: ["Profiles made public are then displayed on a profile directory."],
          start: 18,
          separated: true,
        },
        {
          subheading: "Product Experts - Social Status",
          description: [
            "And lastly, assets for social media were created so Product Experts could show off their status.",
          ],
          start: 20,
          separated: true,
        },
      ],
    },
  ),
  oldSiteProject(
    "nikeplus",
    "Nike+ — Web Redesign",
    "Nike+",
    "2015",
    "splash_nikeplus.webp",
    [
      [nikePlus("03.jpg", 1920, 1080)],
      [nikePlus("06.jpg", 1440, 3532)],
      [nikePlus("02.jpg", 1920, 1080)],
      [nikePlus("05.jpg", 1920, 1080)],
      [nikePlus("01.jpg", 1440, 4481)],
      [nikePlus("07.jpg", 1920, 1080)],
      [nikePlus("10.jpg", 1920, 1080)],
      [nikePlus("04.jpg", 1440, 4570)],
      [nikePlus("08.jpg", 1920, 1080)],
      [nikePlus("12.jpg", 1920, 1080)],
      [nikePlus("09.jpg", 1440, 2441)],
      [nikePlus("11.jpg", 1920, 1080)],
    ],
    {
      studio: "R/GA",
      heading: "Nike+",
      subheading: "Web Redesign",
      description: nikePlusIntro,
      chapters: [
        { subheading: "Web Redesign", description: nikePlusIntro, start: 0 },
        {
          subheading: "Activity Dashboard",
          description: [
            "The landing page to the Nike+ experience, showcasing all your activity in one place. Athletes can save their progress, compare workouts, and connect with other athletes by creating unique activity sessions using Nike and Partner apps.",
          ],
          start: 1,
          separated: true,
        },
        {
          subheading: "Activity Aggregate",
          description: [
            "The Activity Aggregate is the place where Nike+ members go to track their progress, keep up with training plans, connect with friends, and find everyday motivation.",
          ],
          start: 4,
          separated: true,
        },
        {
          subheading: "Leaderboards",
          description: [
            "Leaderboards allow athletes to see how they stack up against their friends and the Nike+ community.",
          ],
          start: 10,
          separated: true,
        },
      ],
    },
  ),
  oldSiteProject(
    "15-years-of-sb-dunk",
    "Nike SB — 15 Years of SB Dunk",
    "Nike SB",
    "2017",
    "splash_nikesb.webp",
    [
      [{ label: "Nike SB", src: "/images/projects/15-years-of-sb-dunk/02.jpg", width: 1920, height: 1080 }],
      [{ label: "Nike SB", src: "/images/projects/15-years-of-sb-dunk/06.jpg", width: 1440, height: 4735 }],
      [{ label: "Nike SB", src: "/images/projects/15-years-of-sb-dunk/08.jpg", width: 1920, height: 1080 }],
      [{ label: "Nike SB", src: "/images/projects/15-years-of-sb-dunk/11.jpg", width: 1440, height: 3476 }],
      [{ label: "Nike SB", src: "/images/projects/15-years-of-sb-dunk/03.jpg", width: 1920, height: 1080 }],
      [{ label: "Nike SB", src: "/images/projects/15-years-of-sb-dunk/05.jpg", width: 1440, height: 5690 }],
      [{ label: "Nike SB", src: "/images/projects/15-years-of-sb-dunk/12.jpg", width: 1920, height: 1080 }],
    ],
    {
      presentation: "split",
      heading: "Nike SB",
      subheading: "15 Years of SB Dunk",
      studio: "R/GA",
      description: [
        "Originally created as a custom experience celebrating 15 years of Nike SB Dunk, the site needed to be brought onto Nike.com. I led the redesign at R/GA, adapting the original experience to work within Nike's existing platform while preserving its visual design and interactions. This included making the experience responsive across screen sizes and establishing scalable design patterns that allowed Nike to easily update and expand the site as new Dunks were released.",
      ],
    },
  ),
  oldSiteProject(
    "natures-recipe",
    "Natures Recipe — Web Design",
    "Natures Recipe",
    "2017",
    "splash_natures_recipe.webp",
    [
      [{ label: "Natures Recipe", src: "/images/projects/natures-recipe/08.jpg", width: 1920, height: 1080 }],
      [{ label: "Natures Recipe", src: "/images/projects/natures-recipe/05.jpg", width: 1440, height: 6533 }],
      [{ label: "Natures Recipe", src: "/images/projects/natures-recipe/04.jpg", width: 1920, height: 1080 }],
      [{ label: "Natures Recipe", src: "/images/projects/natures-recipe/03.jpg", width: 1920, height: 1080 }],
      [{ label: "Natures Recipe", src: "/images/projects/natures-recipe/01.jpg", width: 1920, height: 1080 }],
      [{ label: "Natures Recipe", src: "/images/projects/natures-recipe/02.jpg", width: 1440, height: 4261 }],
      [{ label: "Natures Recipe", src: "/images/projects/natures-recipe/03.jpg", width: 1920, height: 1080 }],
    ],
    {
      studio: "R/GA",
      heading: "Natures Recipe",
      subheading: "Web Design",
      description: [
        "In 2017, R/GA San Francisco did a full redesign of Nature's Recipe web experience. I was brought in at the end to help bring the last few pages across the finish line.",
      ],
    },
  ),
];
