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
        "background": "#0000",
        "texto": "#f1f1f1",
        "primaria": "#f622",
        "secundaria": "#f222",
        },
    },
  },
  plugins: [],
};
export default config;
