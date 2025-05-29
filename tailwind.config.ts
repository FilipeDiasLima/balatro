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
          main: "#009dff",
        },
        deepblue: {
          main: "#0081e6",
          secondary: "#2e76fd",
        },
        green: {
          main: "#35bd86",
        },
        deepgreen: {
          main: "#235955",
        },
        gray: {
          main: "#b1b1b1",
        },
        yellow: {
          main: "#f5b244",
        },
        greengray: {
          100: "#6F7E85",
          200: "#324B4D",
        },
        red: {
          main: "#ff4c40",
          hchearts: "#fa2315",
        },
      },
      borderRadius: {
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
