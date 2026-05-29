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
          DEFAULT: "#000000",
          elev: "#070708",
          hover: "#101012",
        },
        border: {
          DEFAULT: "#26282c",
          subtle: "#1c1d20",
        },
        text: {
          DEFAULT: "#f4f4f5",
          muted: "#8b8d92",
          subtle: "#5a5c61",
        },
        brand: {
          DEFAULT: "#0ea271",
          hover: "#0b8a60",
        },
        up: {
          DEFAULT: "#10b981",
          bg: "rgba(16,185,129,0.12)",
        },
        down: {
          DEFAULT: "#ef4444",
          bg: "rgba(239,68,68,0.1)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
