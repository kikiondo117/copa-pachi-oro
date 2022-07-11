/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-tracer": "url('/assets/tracer.png')",
      },
      colors: {
        "special-orange": "#F16414",
      },
    },
  },
  plugins: [],
};
