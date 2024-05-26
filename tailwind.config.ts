import type { Config } from "tailwindcss";
import { addIconSelectors, addDynamicIconSelectors } from "@iconify/tailwind";

const config: Config = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      screens: {
         xs: "500px",
         sm: "640px",
         md: "768px",
         lg: "1024px",
         xl: "1280px",
      },
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
         body: "#151515",
         white: "#ffffff",
         black: "#000000",
      },
      fontFamily: {
         sans: ["Roboto Flex", "sans-serif"],
         serif: ["El Messiri", "serif"],
      },
      zIndex: {
         0: "0",
         10: "10",
         20: "20",
         30: "30",
         40: "40",
         50: "50",
         60: "60",
         70: "70",
         80: "80",
         90: "90",
         100: "100",
         1000: "1000",
         max: "10000",
         auto: "auto",
      },
   },
   plugins: [addIconSelectors(["mdi", "mdi-light"]), addDynamicIconSelectors()],
};
export default config;
