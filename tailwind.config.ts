/** Semantic color tokens are defined per theme in src/app/tokens.css. */
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

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
        ink: {
          DEFAULT: token("ink"),
          muted: token("ink-muted"),
          faint: token("ink-faint"),
          inverse: token("ink-inverse"),
        },
        surface: {
          DEFAULT: token("surface"),
          card: token("surface-card"),
          border: token("surface-border"),
        },
        accent: {
          DEFAULT: token("accent"),
          hover: token("accent-hover"),
        },
        danger: token("danger"),
        selection: token("selection"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      maxWidth: {
        content: "680px",
        wide: "960px",
      },
    },
  },
  plugins: [],
};
