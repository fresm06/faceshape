import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          bg: "#FDFBF7",
          surface: "#F0E6DD",
          accent: "#D3BBA8",
          primary: "#A77E70",
          text: "#4F3B43",
          muted: "#8B6B72",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', "Georgia", "serif"],
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "slide-up-delay": "slideUp 0.7s ease-out 0.2s forwards",
        "slide-up-delay2": "slideUp 0.7s ease-out 0.4s forwards",
        scan: "scan 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "pulse-ring": "pulseRing 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0.8" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0.8" },
        },
        pulseRing: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(2deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
      },
      backgroundImage: {
        "grain-overlay":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
