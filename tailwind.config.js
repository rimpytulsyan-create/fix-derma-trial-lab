/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Derived from Fixderma logo
        teal: {
          50: "#e6f9fb",
          100: "#b3eef5",
          200: "#80e3ef",
          300: "#4dd8e9",
          400: "#26cfe5",
          500: "#00AEBD", // primary brand teal
          600: "#0098a6",
          700: "#00808e",
          800: "#006876",
          900: "#004f5a",
        },
        lime: {
          50: "#f4f9e6",
          100: "#e1efb3",
          200: "#cee580",
          300: "#bbdb4d",
          400: "#acd426",
          500: "#A8C542", // brand lime
          600: "#8faa38",
          700: "#768f2e",
          800: "#5d7424",
          900: "#44591a",
        },
        peach: {
          50: "#fdf5f2",
          100: "#fae4d9",
          200: "#f7d3c0",
          300: "#f4c2a7",
          400: "#f2b894",
          500: "#F0B8A0", // brand peach/skin
          600: "#e09880",
          700: "#c87860",
          800: "#b05840",
          900: "#984030",
        },
        charcoal: "#1C1C1C",
        "off-white": "#F8F9FA",
        "clinical-gray": {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
