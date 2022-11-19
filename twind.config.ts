import { Options } from "$fresh/plugins/twind.ts";

const colors = {
	slate: {
		"50": "#F8FAFC",
		"100": "#F1F5F9",
		"200": "#E2E8F0",
		"300": "#CBD5E1",
		"400": "#94A3B8",
		"500": "#64748B",
		"600": "#475569",
		"700": "#334155",
		"800": "#1E293B",
		"900": "#0F172A",
	},
};

export default {
	selfURL: import.meta.url,
	darkMode: "class",
	mode: "silent",
	theme: {
		fill: (theme) => theme("colors"),
		extend: {
			colors,
		},
	},
} as Options;
