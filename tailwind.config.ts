import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "768px",
      desktop: "1440px",
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
      black: "#000000",
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
      social: {
        github: "#000000",
        frontendmentor: "#FFF",
        twitter: "#43B7E9",
        linkedin: "#2D68FF",
        youtube: "#EE3939",
        facebook: "#2442AC",
        twitch: "#EE3FC8",
        devto: "#333333",
        codewars: "#8A1A50",
        freecodecamp: "#302267",
        gitlab: "#EB4925",
        hashnode: "#0330D1",
        stackoverflow: "#EC7100",
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
export default config;
