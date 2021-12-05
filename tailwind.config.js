module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainBg: "#dadbd3",
        appBg: "#ebebeb",
        searchBg: "#f6f6f6",
        chatReciever: "#dcf8c6",
        loginBg: "#f8f8f8",
        loginBtn: "#0a8d48",
        loginBtnHover: "#54d161",
      },

      boxShadow: {
        mainShadow: "-1px 4px 20px -6px rgba(0,0,0,0.2)",
      },

      backgroundImage: {
        "chat-wallpaper": `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
