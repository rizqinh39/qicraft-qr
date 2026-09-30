/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-base': '#0B1326',
        'surface-card': '#171F33',
        'surface-hover': '#222A3D',
        'surface-active': '#2D3449',
        'border-subtle': '#334155',
        'border-focus': '#6366F1',
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#C0C1FF',
        },
        secondary: {
          DEFAULT: '#10B981',
          container: '#00A572',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};
