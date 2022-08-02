/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {

    screens:{
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1280px'}, // 1136 WEB
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '768px'}, // 720 TABLET
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '360px'}, // 312 MOBILE
      // => @media (max-width: 639px) { ... }
    },
    extend: {

      width:{
        "laptop": "71rem",
        "tablet": "45rem",
        "mobile": "19.5rem",
        "laptop-full": "80rem",
        "tablet-full": "48rem",
        "mobile-full": "22.5rem",
      },

      backgroundImage: {
        "hero-tracer": "url('/assets/img-tracer-graffiti.png')",
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
