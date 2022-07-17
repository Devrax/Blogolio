import { LeadStatus } from "../enums/LeadStatus.ts";

const baseImgShield = "https://img.shields.io/badge/";

export const badges = [
	{
		key: ["HTML5", "HTML"],
		labelColor: "E34F26",
		color: "E34F26",
		style: "plastic",
		logo: "HTML5",
		logoColor: "white",
		label: "HTML5",
	},
	{
		key: ["CSS3", "CSS"],
		labelColor: "1572B6",
		color: "1572B6",
		style: "plastic",
		logo: "CSS3",
		logoColor: "white",
		label: "CSS3",
	},
	{
		key: ["Scss"],
		labelColor: "CC6699",
		color: "CC6699",
		style: "plastic",
		logo: "Sass",
		logoColor: "white",
		label: "Sass",
	},
	{
		key: ["Vue", "Vue3", "Vuejs", "Vuejs2", "Nuxt"],
		labelColor: "41b883",
		color: "41b883",
		style: "plastic",
		logo: "Vue.js",
		logoColor: "white",
		label: "Vue.js",
	},
	{
		key: ["Angular", "Nestjs(Nodejs)"],
		labelColor: "d8614b",
		color: "red",
		style: "plastic",
		logo: "Angular",
		logoColor: "white",
		label: "Angular",
	},
	{
		key: ["Javascript", "JS"],
		labelColor: "f8da59",
		color: "f8da59",
		style: "plastic",
		logo: "JavaScript",
		logoColor: "black",
		label: "Javascript",
	},
	{
		key: ["Typescript", "TS"],
		labelColor: "3178C6",
		color: "3178C6",
		style: "plastic",
		logo: "TypeScript",
		logoColor: "white",
		label: "Typescript",
	},
	{
		key: ["Flutter"],
		labelColor: "02569B",
		color: "02569B",
		style: "plastic",
		logo: "Flutter",
		logoColor: "white",
		label: "Flutter",
	},
	{
		key: ["Dart"],
		labelColor: "0175C2",
		color: "0175C2",
		style: "plastic",
		logo: "Dart",
		logoColor: "white",
		label: "Dart",
	},
	{
		key: ["Solidity"],
		labelColor: "363636",
		color: "363636",
		style: "plastic",
		logo: "Solidity",
		logoColor: "white",
		label: "Solidity",
	},
	{
		key: ["jsx", "tsx", "Nextjs", "React"],
		labelColor: "61DAFB",
		color: "61DAFB",
		style: "plastic",
		logo: "React",
		logoColor: "white",
		label: "React",
	},
	{
		key: ["Preact"],
		labelColor: "673AB8",
		color: "673AB8",
		style: "plastic",
		logo: "Preact",
		logoColor: "white",
		label: "Preact",
	},
	{
		key: ["Nodejs", "express(Nodejs)"],
		labelColor: "339933",
		color: "339933",
		style: "plastic",
		logo: "Node.js",
		logoColor: "white",
		label: "Node.js",
	},
	{
		key: ["Deno"],
		labelColor: "000000",
		color: "000000",
		style: "plastic",
		logo: "Deno",
		logoColor: "white",
		label: "Deno",
	},
	{
		key: ["Fresh"],
		labelColor: "FFFFFF",
		color: "FFED4E",
		style: "plastic",
		logo: "Deno",
		logoColor: "white",
		label: "Fresh",
	},
	{
		key: ["npm"],
		labelColor: "CB3837",
		color: "CB3837",
		style: "plastic",
		logo: "npm",
		logoColor: "white",
		label: "NPM",
	},
	{
		key: ["Python", "Flask", "Django"],
		labelColor: "3178C6",
		color: "f8da59",
		style: "plastic",
		logo: "Python",
		logoColor: "white",
		label: "Python",
	},
	{
		key: ["CSharp", "C#"],
		labelColor: "239120",
		color: "239120",
		style: "plastic",
		logo: "C Sharp",
		logoColor: "white",
		label: "C Sharp",
	},
	{
		key: ["Vite"],
		labelColor: "646CFF",
		color: "646CFF",
		style: "plastic",
		logo: "Vite",
		logoColor: "white",
		label: "Vite",
	},
	{
		key: ["MongoDB"],
		labelColor: "47A248",
		color: "47A248",
		style: "plastic",
		logo: "MongoDB",
		logoColor: "white",
		label: "MongoDB",
	},
	{
		key: ["Ionic"],
		labelColor: "3880FF",
		color: "3880FF",
		style: "plastic",
		logo: "Ionic",
		logoColor: "white",
		label: "Ionic",
	},
	{
		key: ["Stenciljs"],
		labelColor: "3880FF",
		color: "3880FF",
		style: "plastic",
		logo: "Ionic",
		logoColor: "white",
		label: "Stenciljs",
	},
	{
		key: ["Capacitor"],
		labelColor: "119EFF",
		color: "119EFF",
		style: "plastic",
		logo: "Capacitor",
		logoColor: "white",
		label: "Capacitor",
	},
	{
		key: ["Cordova"],
		labelColor: "000000",
		color: "E8E8E8",
		style: "plastic",
		logo: "apachecordova",
		logoColor: "white",
		label: "cordova",
	},
	{
		key: ["Swift", "Swiftui"],
		labelColor: "F05138",
		color: "E8E8E8",
		style: "plastic",
		logo: "Swift",
		logoColor: "white",
		label: "Swift",
	},
	{
		key: ["web-component", "webcomponents", "webcomponent"],
		labelColor: "3880FF",
		color: "3880FF",
		style: "plastic",
		logo: "webcomponents.org",
		logoColor: "white",
		label: "webcomponents.org",
	},
	{
		key: ["Rust"],
		labelColor: "000000",
		color: "000000",
		style: "plastic",
		logo: "rust",
		logoColor: "white",
		label: "Rust",
	},
];

export function shieldBadge(language: string) {
	const findLanguage = badges
		.map((el) => el.key.map((topic) => topic.toLowerCase()))
		.findIndex((el) => el.includes(language.trim().toLowerCase()));
	if (findLanguage === -1) {
		return `${baseImgShield}-${language}-lightgray?style=plastic&labelColor=white`;
	}

	const { label, color, style, logo, labelColor, logoColor } =
		badges[findLanguage];

	return `${baseImgShield}-${label}-${color}?style=${style}&logo=${logo}&labelColor=${labelColor}&logoColor=${logoColor}`;
}

export function normalBadge(status: LeadStatus | string) {
	const badge = {
		[LeadStatus.NOT_PUBLISHED]: { color: "yellow" },
		[LeadStatus.PUBLISHED]: { color: "success", logo: "googleplay" },
		[LeadStatus.REMOVED]: { color: "critical" },
	}[status.toLocaleUpperCase()];
	return `${baseImgShield}-${status}-${badge?.color ?? "inactive"}${
		(badge?.logo && `?style=social&logo=${badge.logo}`) || ""
	}`;
}

export function labelBadge(
	label: string,
	subLabel = "",
	style: shieldStyles = "flat",
	color?: string
) {
	const lowerCaser = (str: string) => str.toLocaleLowerCase();
	const { color: fColor, labelColor } =
		badges.find((lbl) =>
			lbl.key.map(lowerCaser).includes(label.toLocaleLowerCase())
		) || {};

	return `${baseImgShield}${label}-${subLabel}-${color}?style=${style}&color=${
		labelColor || color || "lightgray"
	}&labelColor=${color || fColor || "lightgray"}`;
}

type shieldStyles =
	| "flat"
	| "plastic"
	| "flat-square"
	| "for-the-badge"
	| "social";
