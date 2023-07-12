module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,var(--el-color-white))",
        },
      });
    },
  ],
  daisyui: {
    themes: ["cupcake", "dark", "cmyk"],
  },
};
