import { useState } from "preact/hooks";

export default function FooterNavigation() {
	const [hiddeFooter, setter] = useState(true);
	return (
		<div
			class={`flex p-5 bg-slate-700 fixed w-full z-10 bottom-0 lg:hidden slid ${
				hiddeFooter ? "hiddenFooter" : ""
			}`}
		>
			<span
				onClick={() => setter(!hiddeFooter)}
				class={`drop-shadow font-bold p-2 rounded-lg text-shadow text-white transform duration-1000 ${
					!hiddeFooter && "rotate-180"
				}`}
			>
				{" "}
				←{" "}
			</span>
			<span class={`p-2 rounded-lg mr-5`}>
				<a
					class="mx-2 drop-shadow font-bold text-shadow text-white"
					href="#start"
				>
					{" "}
					↑{" "}
				</a>
			</span>
			<div class="bg-slate-700 flex flex-1 items-center justify-between pr-10 text-white">
				{[
					{
						title: "Experience",
						id: "experience",
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
					<a
						class="mx-2 drop-shadow font-bold text-shadow text-white"
						href={"#" + section.id}
					>
						{section.title}
					</a>
				))}
			</div>
		</div>
	);
}
