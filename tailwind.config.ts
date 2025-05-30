import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        link: {
          DEFAULT: "#679DFA",
        },
        blue: {
          lightest: "#E5F1FF",
          light: "#81CEFD",
          main: "#009CFD",
          darker: "#008BE3",
          darkest: "#0082D5",
        },
        green: {
          main: "#56A786",
          secondary: "#3F9270",
        },
        deepgreen: {
          main: "#235955",
        },
        gray: {
          light: "#DCDCDC",
          main: "#4F6367",
          darker: "#314045",
        },
        bluegray: {
          main: "#59657F",
        },
        yellow: {
          main: "#E3AF3E",
          secondary: "#FDA200",
        },
        pink: {
          main: "#CE608C",
        },
        red: {
          main: "#FD5F55",
          darker: "#E2483D",
        },
      },
      borderRadius: {
        "2xl": "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-custom": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-custom": "pulse-custom 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
