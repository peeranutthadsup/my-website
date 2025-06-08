/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",    // ตรงนี้สำคัญ ให้ Tailwind รู้ว่าต้องสแกนไฟล์ไหนบ้าง
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};