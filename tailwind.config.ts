/** Appetite UI tokens live in src/app/tokens.css (generated from the Figma library). */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;
const paint = (name: string) => `var(--${name})`;

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const hue = (name: string) =>
  Object.fromEntries(STEPS.map((step) => [step, rgb(`${name}-${step}`)]));

const alphaStops = (name: string) => ({
  10: `rgb(var(--alpha-${name}-10))`,
  16: `rgb(var(--alpha-${name}-16))`,
  24: `rgb(var(--alpha-${name}-24))`,
});

const state = (name: string, lighter: string, light: string) => ({
  [lighter]: paint(`state-${name}-${lighter}`),
  [light]: paint(`state-${name}-${light}`),
  "base-500": rgb(`state-${name}-base-500`),
  "dark-950": rgb(`state-${name}-dark-950`),
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: { 0: rgb("gray-0"), ...hue("gray") },
        blue: hue("blue"),
        red: hue("red"),
        orange: hue("orange"),
        yellow: hue("yellow"),
        green: hue("green"),
        purple: hue("purple"),
        sky: hue("sky"),
        pink: hue("pink"),
        teal: hue("teal"),
        alpha: {
          white: alphaStops("white"),
          black: alphaStops("black"),
          gray: alphaStops("gray"),
          blue: alphaStops("blue"),
          red: alphaStops("red"),
          orange: alphaStops("orange"),
          yellow: alphaStops("yellow"),
          green: alphaStops("green"),
          purple: alphaStops("purple"),
          sky: alphaStops("sky"),
          pink: alphaStops("pink"),
          teal: alphaStops("teal"),
        },
        bg: {
          "white-0": rgb("bg-white-0"),
          "weak-50": rgb("bg-weak-50"),
          "soft-200": rgb("bg-soft-200"),
          "sub-300": rgb("bg-sub-300"),
          "surface-800": rgb("bg-surface-800"),
          "strong-950": rgb("bg-strong-950"),
        },
        text: {
          "white-0": rgb("text-white-0"),
          "disabled-300": rgb("text-disabled-300"),
          "soft-400": rgb("text-soft-400"),
          "sub-600": rgb("text-sub-600"),
          "strong-950": rgb("text-strong-950"),
        },
        fg: {
          "white-0": rgb("fg-white-0"),
          "disabled-300": rgb("fg-disabled-300"),
          "soft-400": rgb("fg-soft-400"),
          "sub-600": rgb("fg-sub-600"),
          "strong-950": rgb("fg-strong-950"),
        },
        border: {
          "white-0": rgb("border-white-0"),
          "soft-200": rgb("border-soft-200"),
          "sub-300": rgb("border-sub-300"),
          "strong-950": rgb("border-strong-950"),
        },
        brand: {
          lighter: rgb("brand-lighter"),
          light: rgb("brand-light"),
          DEFAULT: rgb("brand-base"),
          base: rgb("brand-base"),
          dark: rgb("brand-dark"),
          darker: rgb("brand-darker"),
          "alpha-10": paint("brand-alpha-10"),
          "alpha-16": paint("brand-alpha-16"),
          "alpha-24": paint("brand-alpha-24"),
        },
        static: {
          "white-0": rgb("static-white-0"),
          "black-950": rgb("static-black-950"),
        },
        state: {
          faded: state("faded", "lighter-100", "light-200"),
          information: state("information", "lighter-50", "light-200"),
          error: state("error", "lighter-50", "light-200"),
          warning: state("warning", "lighter-50", "light-200"),
          away: state("away", "lighter-50", "light-200"),
          success: state("success", "lighter-50", "light-200"),
          feature: state("feature", "lighter-50", "light-200"),
          verified: state("verified", "lighter-50", "light-200"),
          highlighted: state("highlighted", "lighter-50", "light-200"),
          stable: state("stable", "lighter-50", "light-200"),
        },
      },
      fontFamily: {
        sans: ["var(--font-family-body)"],
        heading: ["var(--font-family-heading)"],
        inter: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-chela)", "cursive"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        xs: ["var(--font-size-xs)", { lineHeight: "var(--line-height-xs)" }],
        sm: ["var(--font-size-sm)", { lineHeight: "var(--line-height-sm)" }],
        base: ["var(--font-size-base)", { lineHeight: "var(--line-height-base)" }],
        lg: ["var(--font-size-lg)", { lineHeight: "var(--line-height-lg)" }],
        xl: ["var(--font-size-xl)", { lineHeight: "var(--line-height-xl)" }],
        "2xl": ["var(--font-size-2xl)", { lineHeight: "var(--line-height-2xl)" }],
        "3xl": ["var(--font-size-3xl)", { lineHeight: "var(--line-height-3xl)" }],
        "4xl": ["var(--font-size-4xl)", { lineHeight: "var(--line-height-4xl)" }],
        "5xl": ["var(--font-size-5xl)", { lineHeight: "var(--line-height-5xl)" }],
        "6xl": ["var(--font-size-6xl)", { lineHeight: "var(--line-height-6xl)" }],
      },
      fontWeight: {
        normal: "var(--font-weight-default)",
        semibold: "var(--font-weight-emphasized)",
        emphasized: "var(--font-weight-emphasized)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-base)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      maxWidth: {
        content: "680px",
        wide: "960px",
      },
    },
  },
  plugins: [],
};
