import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skov: {
          black: "#0B0B0B",
          gold: "#C9A45C",
          cream: "#F8F3EA",
          darkgold: "#8C6E33",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 10px 40px -10px rgba(201,164,92,0.45)",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(ellipse at top, rgba(201,164,92,0.18), transparent 60%)",
        "hero-grid":
          "linear-gradient(rgba(201,164,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,164,92,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
