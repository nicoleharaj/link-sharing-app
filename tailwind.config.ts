import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1440px'
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "sans-serif"],
      },
    },
    fontSize: {
      "body-s": ["12px", "150%"],
      base: ["16px", "150%"],
      "heading-sm": ["16px", "150%"],
      "heading-md-web": ["32px", "150%"],
      "heading-md-mobile": ["24px", "150%"],
    },

    boxShadow: {
      none: "0 0 #0000",
      active: "0 0 32px 0 rgba(99, 60, 255, 0.25)",
      DEFAULT: "0 0 32px 0 rgba(0, 0, 0, 0.1)",
    },

    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: {
        dark: "#333333",
        DEFAULT: "#737373",
        border: "#D9D9D9",
        light: "#FAFAFA",
      },
      white: "#ffffff",
      red: "#FF3939",
      purple: {
        DEFAULT: "#633CFF",
        hover: "#BEADFF",
        light: "#EFEBFF",
      },
    },
  },
  plugins: [],
};
export default config;
