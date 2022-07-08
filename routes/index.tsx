/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { GithubUserData } from "@interfaces/GithubUser.ts";
import { Head } from "$fresh/runtime.ts";
import { handler as homeHandler } from "../private/HomeHandler.ts";
import RepoCard from "../islands/RepoCard.tsx";

export const handler: Handlers = homeHandler;

export default function Home({ data }: PageProps<GithubUserData | null>) {
	const { repos, ...user } = (data as GithubUserData) || {};
	const meta = {
		title: user?.login,
		description: user?.html_url,
	};

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta content={meta.description} name="description" />
				<link rel="stylesheet" href="/css/style.css" />
				<script src="https://cdn.tailwindcss.com"></script>
			</Head>
			<main class={tw`bg-slate-800 min-h-screen`}>
				<header class="js-bg">
					<article class={tw`flex p-10`}>
						<section class={tw`w-48 rounded-lg overflow-hidden`}>
							<img
								src={user?.avatar_url}
								alt={user ? `${user?.name}'s pic` : "No user"}
							/>
						</section>

						<section
							class={tw`ml-2 flex flex-col justify-end w-full`}
						>
							<h1
								class={tw`text-white text-6xl drop-shadow-2xl text-shadow`}
							>
								{user?.name || "User not found"}
							</h1>
							<hr />
							<p
								class={tw`drop-shadow-2xl w-1/2 text-yellow-500 text-shadow`}
							>
								{user?.bio || "No bio"}
							</p>
						</section>
					</article>
				</header>

				<div class={tw`p-10`}>
					<article class={tw`flex flex-wrap`}>
						{repos?.map((repo) => (
							<RepoCard {...repo} />
						))}
					</article>

					<aside></aside>
				</div>
			</main>
		</>
	);
}
