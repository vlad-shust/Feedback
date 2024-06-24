/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#34D399',
        'custom-gray': '#EAF0F6',
        'custom-white-gray': '#F8FAFC',
        'custom-blue-gray': '#1E293B',
        'custom-light-gray': '#64748B',
      },
      fontSize: {
        '24': '24px',
        '14': '14px',
      },
    },
  },
  plugins: [],
}

