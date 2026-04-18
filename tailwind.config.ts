import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        mist: "#a0a8b7",
        accent: "#7ca0ff",
      },
      boxShadow: {
        glow: "0 30px 80px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
