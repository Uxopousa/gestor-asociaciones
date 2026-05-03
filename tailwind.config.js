module.exports = {
  content: [
    "./views/**/*.ejs",
    "./controllers/**/*.js",
    "./routes/**/*.js",
    "./app.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
