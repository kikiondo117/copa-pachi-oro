/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-tracer": "url('/assets/tracer.png')",
        "form-top": "url('/assets/registro-equipo.png')",
      },
      colors: {
        "special-orange": "#F16414",
        "special-blue": "#27354F",
        "special-gray": "#E8E8E8",

        "organge-light": "#F37731",

        "blue-gray-light": "#7C93BE",
        "blue-gray-default": "#27354F",
        "blue-gray-dark": "#0F1726",

        "gray-one":"",
        "gray-two":"#C2C2C2",
        "gray-three":"#969899",

        "green-one": "#B7D019",
        "red-one": "#D63231",
        "yellow-one": "#FFD028",


      },
      fontFamily: {
        'big-noodle' : ['Big Noodle Titling'],
        'big-noodle-oblique' : ['Big Noodle Titling Oblique'],
        'coolveltica' : ['Coolvetica'],
      },
      // letterSpacing: {
      //   "five-percent" : "letter-spacing: 5%",
      // }
    },
  },
  plugins: [],
};
