/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "var(--font-color-main)",
        second: "var(--font-color-second)",
        // Hex (not CSS vars) so opacity modifiers like text-brand/10 work. Same values as globals.css.
        brand: { DEFAULT: "#00aa63", light: "#38ce86", dark: "#00804a", darker: "#006b3e" },
      },
      fontFamily: {
        elisabethische: ['"Elisabethische"', "serif"], // Add your font and a fallback
      },
    },
  },
  plugins: [],
};
