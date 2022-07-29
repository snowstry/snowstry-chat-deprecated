/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./frontend/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			nord_dark: {
				100: "#4C566A",
				200: "#434C5E",
				300: "#3B4252",
				400: "#2E3440",
			},
			nord_light: {
				100: "#ECEFF4",
				200: "#E5E9F0",
				300: "#D8DEE9",
			},
			nord_blue: {
				100: "#8FBCBB",
				200: "#88C0D0",
				300: "#81A1C1",
				400: "#5E81AC",
			},
			nord_purple: "#B48EAD",
			nord_green: "#A3BE8C",
			nord_yellow: "#EBCB8B",
			nord_orange: "#D08770",
			nord_red: "#BF616A",
		},
		fontFamily: {
			jetbrains: ["JetbrainsMono", "monospace"],
		},
	},
	plugins: [],
};
