import type { Config } from "tailwindcss";

const config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        ocean: {
          100: "#070d0d",
          200: "#0e181e",
          300: "#111c24",
          400: "#132029",
          500: "#172833",
        },
        dark: "#232527",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
