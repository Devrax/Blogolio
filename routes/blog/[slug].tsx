import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { handler as BlogEntry } from "../../private/BlogEntry.ts";
import { MarkdownMeta } from "@interfaces/MarkdownMeta.ts";
import { GithubUser } from "@interfaces/GithubUser.ts";

export const handler = BlogEntry;

export default function BlogPost({
	data: { blogPost, githubUser },
}: PageProps<{ blogPost: string | null; githubUser: GithubUser }>) {
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
				<script src="https://cdn.tailwindcss.com" defer></script>
				<link rel="stylesheet" href="/css/markdown.css" />
				<link rel="stylesheet" href="/css/text-utilities.css" />
			</Head>
			<main
				class="bg-slate-800 min-h-screen relative overflow-hidden"
			>
				<header class="pt-10 px-10 lg:max-w-screen-xl lg:mx-auto">
					<nav>
						<ul class="flex items-center justify-end">
							<li class="mr-5">
								<a
									rel="prefetch preload"
									class="hover:underline decoration-solid text-white font-bold text-xl hover:text-yellow-500 hover:fill-yellow-500 cursor-pointer"
									href="/"
								>
									Home
								</a>
							</li>
							<li class="mr-5">
								<a
									rel="prefetch preload"
									class="hover:underline decoration-solid text-white font-bold text-xl hover:text-yellow-500 hover:fill-yellow-500 cursor-pointer"
									href="/blog"
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href={githubUser?.html_url}
									target="_blank"
									rel="noopener"
								>
									<img
										class="rounded-full w-10"
										src={githubUser?.avatar_url}
										alt={githubUser?.name}
									/>
								</a>
							</li>
						</ul>
					</nav>
				</header>

				{blogPost ? (
					<article
						class="p-10 lg:max-w-screen-xl lg:mx-auto markdown"
						dangerouslySetInnerHTML={{ __html: blogPost }}
					></article>
				) : (
					<article>No Entries :(</article>
				)}
			</main>
		</>
	);
}
