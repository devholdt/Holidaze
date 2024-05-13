import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      colors: {
         dark: "#333333",
         red: "#C51919",
         darkRed: "#B21D1D",
         yellow: "#F2B138",
         darkYellow: "#D7961D",
         blue: "#011640",
         green: "#28443D",
         lightGreen: "#30544b",
         brown: "#615655",
         lightBrown: "#AA9E9D",
         darkBrown: "#3A3231",
         darkerBrown: "#251F1F",
         grey: "#AAAAAA",
         lightGrey: "#E5E5E5",
         lighterGrey: "#EEEEEE",
         darkGrey: "#383840",
         background: "#F1F3F5",
         white: "#ffffff",
         black: "#000000",
      },
      fontFamily: {
         sans: ["Roboto Flex", "sans-serif"],
         serif: ["El Messiri", "serif"],
      },
   },
   plugins: [],
};
export default config;
