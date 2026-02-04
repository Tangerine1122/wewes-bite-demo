/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bite: {
          bg: "#FFF7ED",
          card: "#FFFFFF",
          text: "#111827",
          muted: "#6B7280",
          yellow: "#FBBF24",
          orange: "#F97316",
          red: "#EF4444",
        },
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
