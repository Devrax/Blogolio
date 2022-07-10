/** @jsx h */
import { h } from "preact";
import { tw } from "@utils/twind.ts";
import { useState } from "preact/hooks";

export default function FooterNavigation() {
	const [hiddeFooter, setter] = useState(true);
	return (
		<div
			class={tw`flex p-5 bg-slate-700 fixed w-full bottom-0 lg:hidden slid ${
				hiddeFooter ? "hiddenFooter" : ""
			}`}
		>
			<span
				onClick={() => setter(!hiddeFooter)}
				class={tw`drop-shadow font-bold p-2 rounded-lg text-shadow text-white transform duration-1000 ${
					!hiddeFooter && "rotate-180"
				}`}
			>
				{" "}
				←{" "}
			</span>
			<div
				class={tw`bg-slate-700 flex flex-1 items-center justify-between px-10 text-white`}
			>
				{[
					{
						title: "↑",
						id: "start",
					},
					{
						title: "Portfolio",
						id: "portfolio",
					},
					{
						title: "Projects",
						id: "projects",
					},
					{
						title: "Skills",
						id: "skills",
					},
				].map((section) => (
					<a class={tw`mx-2`} href={"#" + section.id}>
						{section.title}
					</a>
				))}
			</div>
		</div>
	);
}
