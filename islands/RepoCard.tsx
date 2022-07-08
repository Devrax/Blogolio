/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { shieldBadge } from "../utils/badgeShields.ts";
import { timeAgo } from "../utils/timeAgo.ts";
import { textShorter } from "../utils/textShorter.ts";
import { GithubUserRepo } from "../interfaces/GithubUserRepo.ts";

export default function RepoCard(repo: GithubUserRepo) {
	return (
		<section
			class={tw`w-72 m-1 h-44 overflow-hidden shadow-slate-900 shadow-md rounded-xl`}
		>
			<div
				class={tw`p-2 border border-slate-700 rounded-xl h-full relative ext-${repo?.language?.toLocaleLowerCase()}`}
			>
				<span class={tw`flex`}>
					<h1
						class={tw`text-white text-shadow text-xl drop-shadow-2xl flex-1`}
					>
						{repo?.name}
					</h1>
					<span class={tw`flex items-center`}>
						<p class={tw`text-slate-500 text-xs align-middle`}>
							{timeAgo(repo?.updated_at)}
						</p>
					</span>
				</span>
				<span class={tw`flex flex-wrap mb-1`}>
					{repo?.topics?.map((topic: string) => (
						<img class={tw`mr-1 mt-1`} src={shieldBadge(topic)} />
					))}
				</span>
				<span class={tw`text-gray-300 text-shadow drop-shadow`}>
					{textShorter(repo?.description)}
				</span>
			</div>
		</section>
	);
}
