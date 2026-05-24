import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0e11",
          elev: "#161a1e",
          hover: "#1e2329",
        },
        border: {
          DEFAULT: "#2b3139",
          subtle: "#1e2329",
        },
        text: {
          DEFAULT: "#eaecef",
          muted: "#848e9c",
          subtle: "#5e6673",
        },
        brand: {
          DEFAULT: "#f0b90b",
          hover: "#d9a309",
        },
        up: {
          DEFAULT: "#0ecb81",
          bg: "rgba(14,203,129,0.1)",
        },
        down: {
          DEFAULT: "#f6465d",
          bg: "rgba(246,70,93,0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
