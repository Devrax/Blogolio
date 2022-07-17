/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { handler as BlogEntries } from "../../private/BlogEntries.ts";
import { MarkdownMeta } from "@interfaces/MarkdownMeta.ts";
import { GithubUser } from "@interfaces/GithubUser.ts";
import { shieldBadge } from "../../utils/badgeShields.ts";
import { timeAgo } from "../../utils/timeAgo.ts";

export const handler = BlogEntries;

export default function BlogHome({
	data: { blogList, githubUser },
}: PageProps<{ blogList: MarkdownMeta[]; githubUser: GithubUser }>) {
	return (
		<>
			<Head>
				<title>Blog | Entries</title>
				<meta
					content={`Blog entry where users can see all the topics tackling by ${githubUser.login}`}
					name="description"
				/>
				<meta name={githubUser?.name} content="Author name" />
				<meta
					name="keywords"
					content="Blog, entries, programming, learning, Software development"
				/>
				<script src="https://cdn.tailwindcss.com" defer></script>
				<link rel="stylesheet" href="/css/grid.css" />
				<link rel="stylesheet" href="/css/text-utilities.css" />
			</Head>
			<main
				class={tw`bg-slate-800 min-h-screen relative overflow-hidden`}
			>
				<article class={tw`p-10 lg:max-w-screen-xl lg:mx-auto`}>
					<section id="blog-entries">
						<div class={tw`mb-10`}>
							<h1
								class={tw`text-white text-shadow drop-shadow text-4xl text-center`}
							>
								Welcome to my Blog
							</h1>
						</div>
						<div class={tw`grid-projects`}>
							{blogList.map((entry) => (
								<div
									class={tw`bg-slate-800 border border-slate-900 drop-shadow-xl hover:scale-105 active:scale-90 max-w-full overflow-hidden rounded-xl transform-gpu transition-transform`}
								>
									<img
										class={tw`h-40 max-h-40 object-center object-cover w-full`}
										src={entry.thumbnail}
										alt={`${entry.title} image`}
									/>
									<div class={tw`p-5 text-white`}>
										<h1
											class={tw`text-xl truncate text-shadow drop-shadow`}
											title={entry?.title}
										>
											{entry?.title}
										</h1>
										<p class={tw`text-orange-500 text-xs`}>
											{entry?.author} -{" "}
											{timeAgo(entry?.creationAt)}
										</p>
										<div
											class={tw`flex mt-3 overflow-x-scroll`}
										>
											{entry.keywords
												.split(",")
												.map((keyword) => (
													<img
														src={shieldBadge(
															keyword
														)}
														class={tw`mr-2`}
														alt={keyword}
													/>
												))}
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				</article>
			</main>
		</>
	);
}
