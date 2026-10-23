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
          DEFAULT: "#0a0a0b",
          elev: "#131315",
          hover: "#1b1b1e",
        },
        border: {
          DEFAULT: "#222225",
          subtle: "#19191c",
        },
        text: {
          DEFAULT: "#f4f4f5",
          muted: "#8a8a90",
          subtle: "#55555b",
        },
        brand: {
          DEFAULT: "#3ee5a1",
          hover: "#2fcf8d",
        },
        up: {
          DEFAULT: "#3ee5a1",
          bg: "rgba(62,229,161,0.12)",
        },
        down: {
          DEFAULT: "#f05d65",
          bg: "rgba(240,93,101,0.14)",
        },
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
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
