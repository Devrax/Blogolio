/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { handler as BlogEntries } from "../../private/BlogEntries.ts";
import { MarkdownMeta } from "@interfaces/MarkdownMeta.ts";
import { GithubUser } from "@interfaces/GithubUser.ts";
import BlogCard from "../../islands/BlogCard.tsx";

export const handler = BlogEntries;

export default function BlogHome({
	data: { blogList, githubUser },
}: PageProps<{ blogList: MarkdownMeta[]; githubUser: GithubUser }>) {
	return (
		<>
			<Head>
				<title>Blog | {githubUser?.login}</title>
				<meta
					content={`Blog entry where users can see all the topics tackling by ${githubUser.login}`}
					name="description"
				/>
				<meta name={githubUser?.name} content="Author name" />
				<meta
					name="keywords"
					content="Blog, entries, programming, learning, Software development"
				/>
				<link rel="stylesheet" href="/css/grid.css" />
				<link rel="stylesheet" href="/css/text-utilities.css" />
			</Head>
			<main
				class={tw`bg-slate-800 min-h-screen relative overflow-hidden`}
			>
				<header class={tw`pt-10 px-10 lg:max-w-screen-xl lg:mx-auto`}>
					<nav>
						<ul class={tw`flex items-center justify-end`}>
							<li class={tw`mr-5`}>
								<a
									rel="prefetch preload"
									class={tw`hover:underline decoration-solid text-white font-bold text-xl hover:text-yellow-500 hover:fill-yellow-500 cursor-pointer`}
									href="/"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href={githubUser?.html_url}
									target="_blank"
									rel="noopener"
								>
									<img
										class={tw`rounded-full w-10`}
										src={githubUser?.avatar_url}
										alt={githubUser?.name}
									/>
								</a>
							</li>
						</ul>
					</nav>
				</header>
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
								<BlogCard {...entry} />
							))}
						</div>
					</section>
				</article>
			</main>
		</>
	);
}
