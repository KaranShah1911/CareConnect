  /** @type {import('tailwindcss').Config} */
  export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: '#5C67F2',
          secondary: '#F2F5FF',
          accent: '#38BDF8',
          dark: '#1F2937',
          muted: '#6B7280',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        gridTemplateColumns:{
          'auto' : 'repeat(auto-fill,minmax(250px,1fr))'
        },

      },
    },
    plugins: [],
  }

