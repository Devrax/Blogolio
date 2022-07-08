/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { GithubUserData } from "@interfaces/GithubUser.ts";
import { Head } from "$fresh/runtime.ts";
import { handler as homeHandler } from "../private/HomeHandler.ts";
import RepoCard from "../islands/RepoCard.tsx";
import ExperienceBoard from "../islands/ExperienceBoard.tsx";
import { Experience } from "../interfaces/Experience.ts";
import cv from "../static/local/curriculum.json" assert { type: "json" };

export const handler: Handlers = homeHandler;
const curriculums: Experience[] = cv;

export default function Home({ data }: PageProps<GithubUserData | null>) {
	const { repos, ...user } = (data as GithubUserData) || {},
		meta = {
		title: user?.login,
		description: user?.html_url,
		},
		sections = [
			{
				title: "Experience",
				id: "#experience",
				content: (
					<article>
						{curriculums.map((curriculum) => (
							<ExperienceBoard {...curriculum} />
						))}
					</article>
				),
			},
			{
				title: "Projects",
				id: "#projects",
				content: repos?.map((repo) => <RepoCard {...repo} />),
				classContent: "flex flex-wrap",
			},
		];

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
							<span class={tw`flex`}>
							<p
									class={tw`drop-shadow-2xl w-1/2 text-yellow-500 text-shadow flex-1`}
							>
								{user?.bio || "No bio"}
							</p>
								<span class={tw`text-white`}>
									{sections.map((section, pos, arr) => (
										<>
											<a href={section.id}>
												{section.title}
											</a>
											{pos === arr.length - 1 ? (
												""
											) : (
												<span>&nbsp;|&nbsp;</span>
											)}
										</>
									))}
								</span>
							</span>
						</section>
					</article>
				</header>

				<div class={tw`p-10`}>
					<article>
						{sections.map((section) => (
							<section class={tw`mb-10`}>
								<div class={tw`mb-3`} id="projects">
									<h1
										class={tw`text-white text-3xl text-shadow`}
									>
										<a
											href={section.id}
											class={tw`text-4xl font-bold text-shadow drop-shadow-xl`}
										>
											{section.title}
										</a>
									</h1>
								</div>
								<hr />
								<br />
								<div class={tw`${section.classContent}`}>
									{section.content}
								</div>
							</section>
						))}
					</article>

					<aside></aside>
				</div>
			</main>
		</>
	);
}
