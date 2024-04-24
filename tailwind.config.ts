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
			brown: "#615655",
			green: "#28443D",
			lightBrown: "#AA9E9D",
			darkBrown: "#3A3231",
			darkerBrown: "#251F1F",
			yellow: "#F2B138",
			blue: "#011640",
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
