/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f6f6f7",
          100: "#e8e9eb",
          200: "#c7c9cd",
          300: "#a1a5ac",
          400: "#71767f",
          500: "#4f545c",
          600: "#383c43",
          700: "#26282d",
          800: "#18191c",
          850: "#131316",
          900: "#0b0b0d",
          950: "#050506",
        },
        gold: {
          50: "#faf6ec",
          100: "#f3e8cc",
          200: "#e6d19d",
          300: "#d8b96e",
          400: "#cba54a",
          500: "#c5a059",
          600: "#a9843c",
          700: "#876730",
          800: "#634b25",
          900: "#40301a",
        },
        accent: {
          DEFAULT: "#ff5a1f",
          light: "#ff8a4c",
        },
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(197,160,89,0.18), transparent)",
        "gold-sheen":
          "linear-gradient(120deg, #c5a059 0%, #e6d19d 45%, #c5a059 100%)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(197,160,89,0.25), 0 8px 30px -6px rgba(197,160,89,0.25)",
        card: "0 10px 30px -12px rgba(0,0,0,0.55)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      letterSpacing: {
        tightest: "-0.045em",
        widest2: "0.28em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        shimmer: "shimmer 1.6s linear infinite",
        floatY: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
