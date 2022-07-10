import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
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

export const config: Configuration = {
	darkMode: "class",
	mode: "silent",
	theme: {
		fill: (theme) => theme("colors"),
		extend: {
			colors,
		},
	},
};
if (IS_BROWSER) setup(config);
