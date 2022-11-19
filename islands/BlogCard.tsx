import { MarkdownMeta } from "@interfaces/MarkdownMeta.ts";
import { shieldBadge } from "@utils/badgeShields.ts";
import timeDifference from "@tamago";

export default function BlogCard(entry: MarkdownMeta) {
	return (
		<div
			onClick={() => {
				location.assign(`/blog/${entry.name}`);
			}}
			class="bg-slate-800 border border-slate-900 drop-shadow-xl hover:scale-105 active:scale-90 max-w-full overflow-hidden rounded-xl transform-gpu transition-transform"
		>
			<img
				class="h-40 max-h-40 object-center object-cover w-full"
				src={entry.thumbnail}
				alt={`${entry.title} image`}
			/>
			<div class="p-5 text-white">
				<h1
					class="text-xl truncate text-shadow drop-shadow"
					title={entry?.title}
				>
					{entry?.title}
				</h1>
				<p class="text-orange-500 text-xs">
					{entry?.author} -{" "}
					{timeDifference(new Date(), new Date(entry?.creationAt))}
				</p>
				<div class="flex mt-3 overflow-x-scroll">
					{entry.keywords.split(",").map((keyword) => (
						<img
							src={shieldBadge(keyword)}
							class="mr-2"
							alt={keyword}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
