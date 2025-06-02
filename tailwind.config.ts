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
        border: {
          DEFAULT: "var(--border)",
        },
        background: "#314045",
        link: {
          DEFAULT: "#679DFA",
        },
        blue: {
          lightest: "#E5F1FF",
          light: "#00a7ca",
          light1: "#00657c",
          main: "#009CFD",
          spectral: "#2e76fd",
          darker: "#0057a1",
          "spectral-darker": "#14449e",
          deep: "#003367",
        },
        green: {
          main: "#56A786",
          secondary: "#3F9270",
          darker: "#215f46",
        },
        deepgreen: {
          main: "#235955",
          darkest: "#1e2b2d",
        },
        gray: {
          lightnest: "#DCDCDC",
          light0: "#a3acb9",
          light: "#708386",
          main: "#4F6367",
          darker: "#404c4e",
          darkest: "#35484d",
        },
        bluegray: {
          main: "#59657F",
        },
        yellow: {
          main: "#E3AF3E",
          secondary: "#FDA200",
          darker: "#a05b00",
        },
        pink: {
          main: "#CE608C",
        },
        purple: {
          main: "#9e74ce",
          darker: "#5e437e",
        },
        red: {
          main: "#ff4c40",
          darker: "#a02721",
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
        jumping: {
          "0%, 30%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-3px)" },
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
        jumping: "jumping 0.8s ease-in-out infinite",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
