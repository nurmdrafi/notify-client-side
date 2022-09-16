/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#198F85",
          secondary: "#F1F5F9",
          success: "#07b03f",
          warning: "#FEBD17",
          error: "#EF4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
