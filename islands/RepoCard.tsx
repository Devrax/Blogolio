import { tw } from "twind";
import { shieldBadge } from "../utils/badgeShields.ts";
import timeDifference from "@tamago";
import { textShorter } from "../utils/textShorter.ts";
import { GithubUserRepo } from "../interfaces/GithubUserRepo.ts";

export default function RepoCard(repo: GithubUserRepo) {
	const href = (url: string) => {
		window.open(url, "_blank", "noopener");
	};

	return (
		<section
			onClick={() => href(repo.html_url)}
			class="min-w-full h-44 overflow-hidden cursor-pointer shadow-slate-900 shadow-md rounded-xl hover:scale-110 transition active:scale-100"
		>
			<div
				class={tw`p-2 border border-slate-700 rounded-xl h-full relative ext-${repo?.language?.toLocaleLowerCase()}`}
			>
				<span class="flex">
					<h1 class="text-white text-shadow text-xl drop-shadow-2xl flex-1">
						{repo?.name}
					</h1>
					<span class="flex items-center">
						<p class="text-slate-500 text-xs align-middle">
							{timeDifference(
								new Date(),
								new Date(repo?.created_at)
							)}
						</p>
					</span>
				</span>
				<span class="flex flex-wrap mb-1">
					{repo?.topics?.map((topic: string) => (
						<img class="mr-1 mt-1" src={shieldBadge(topic)} />
					))}
				</span>
				<span class="text-gray-300 text-shadow drop-shadow relative z-10">
					{textShorter(repo?.description)}
				</span>
			</div>
		</section>
	);
}
