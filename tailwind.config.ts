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
			yellow: "#F2B138",
			blue: "#011640",
			grey: "#AAAAAA",
			lightGrey: "#EEEEEE",
			darkGrey: "#383840",
			background: "#F1F3F5",
			white: "#ffffff",
			black: "#000000",
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
