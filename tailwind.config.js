/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0F211D",
          alt: "#16302A",
        },
        paper: "#F7F4EC",
        teal: {
          dark: "#0B7C80",
          DEFAULT: "#37A693",
          light: "#96D1CB",
        },
        copper: {
          DEFAULT: "#C97B4A",
          hover: "#DA8955",
        },
        muted: "#8FA69F",
        line: "rgba(247, 244, 236, 0.13)",

        border: "rgba(247, 244, 236, 0.13)",
        input: "rgba(247, 244, 236, 0.13)",
        ring: "#37A693",
        background: "#0F211D",
        foreground: "#F7F4EC",
        primary: {
          DEFAULT: "#C97B4A",
          foreground: "#23140A",
        },
        secondary: {
          DEFAULT: "#16302A",
          foreground: "#F7F4EC",
        },
        accent: {
          DEFAULT: "#37A693",
          foreground: "#0F211D",
        },
        card: {
          DEFAULT: "#16302A",
          foreground: "#F7F4EC",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "3px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-30px, 20px)" },
        },
        "pulse-wa": {
          "0%, 100%": {
            boxShadow:
              "0 6px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(37,211,102,0.5)",
          },
          "50%": {
            boxShadow:
              "0 6px 20px rgba(0,0,0,0.4), 0 0 0 10px rgba(37,211,102,0)",
          },
        },
        "page-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
        "pulse-wa": "pulse-wa 2.6s ease-in-out infinite",
        "page-in": "page-in 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
