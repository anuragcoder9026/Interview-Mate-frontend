// tailwind.config.js
import plugin from "tailwindcss/plugin"
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f3f2ef', // Light beige/cream color similar to LinkedIn
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        loadingBar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out forwards',
        loadingBar: 'loadingBar 2s linear infinite',
      },
      colors: {
        blue: {
          DEFAULT: "#296CF2",
          50: "#EFF6FF",   // Lightest shade
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",  // Slightly darker than default
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",  // Darkest shade
        },
        
        yellow: "#FFEB01",
        purple: "#5C40EC",
        white: "#FFFFFF",
        orange: "#FF6F0F",
        green: {
          DEFAULT: '#10B981',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#052e16',
        },
        
        black: "#1F1F1F",
        lightblue: "#5C40EC",
        pastelBlue: "#90A8ED",
        custom: '#D9D9D9',
        pink: '#ec4899',
      },
      fontFamily: {
        "Space-Grotesk": ["Space Grotesk", "sans-serif"],
        "Plus-Jakarta": ["Plus Jakarta Sans", "sans-serif"],
        "Red-Hat-Display": ["Red Hat Display", "sans-serif"],
        "Minecraft": ["Minecraft", "Minecrafter", "sans-serif"],
        "Poppins": ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "2xl": "3px 3px black",
        "3xl": "5px 5px black",
        "5xl": "10px 10px 0px 0px white",
        "4xl": "8px 8px black",
        "bordered-blue": "8px 8px 0 -2px #296cf2, 8px 8px black",
        "bordered-black": "8px 8px 0 -2px black, 8px 8px white",
        "bordered-orange": "8px 8px 0 -2px #FF6F0F, 8px 8px black",
        "bordered-yellow": "0px 0px 0 5px #FFEB01",
        hack: "0px 0px 0 8px #D0A4FF",
      },
      // backgroundImage: {
      //   'tshirt': "url('./public/t-shirt_mockup_red_bg.jpg')",
      // }
    },
  },

  variants: {},
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin', // Firefox
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          'width': '2px', // Webkit browsers
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          'background-color': '#6b7280', // Gray color for thumb
          'border-radius': '10px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          'background-color': '#f3f4f6', // Light gray for track
        },
      });
    }),
  ],
};
