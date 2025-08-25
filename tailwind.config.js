/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: '#a21caf', // purple-700
          light: '#e879f9', // fuchsia-300
          dark: '#701a75', // fuchsia-900
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500
          light: '#67e8f9', // cyan-300
          dark: '#164e63', // cyan-900
        },
        glass: 'rgba(255,255,255,0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        devnexus: {
          primary: '#a21caf',
          secondary: '#06b6d4',
          accent: '#e879f9',
          neutral: '#18181b',
          'base-100': '#1e1b4b',
          info: '#38bdf8',
          success: '#22d3ee',
          warning: '#fbbf24',
          error: '#ef4444',
        },
      },
      'dark', 'cupcake', 'synthwave', 'light'
    ],
    darkTheme: 'devnexus',
  },
};
