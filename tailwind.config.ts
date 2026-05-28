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
          DEFAULT: "#a855f7",
          hover: "#9333ea",
        },
        up: {
          DEFAULT: "#22c55e",
          bg: "rgba(34,197,94,0.1)",
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
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
