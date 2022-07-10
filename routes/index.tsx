/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { GithubUser, GithubUserData } from "@interfaces/GithubUser.ts";
import { Experience } from "@interfaces/Experience.ts";
import { ContactRef } from "@interfaces/ContactRef.ts";
import { GithubUserRepo } from "@interfaces/GithubUserRepo.ts";
import { SkillSection as ISkillSection } from "@interfaces/Skill.ts";
import RepoCard from "../islands/RepoCard.tsx";
import ExperienceBoard from "../islands/ExperienceBoard.tsx";
import SkillSection from "../islands/SkillSection.tsx";
import ContactButton from "../islands/ContactButton.tsx";
import cv from "@local/curriculum.json" assert { type: "json" };
import sk from "@local/skills.json" assert { type: "json" };
import ctt from "@local/contact.json" assert { type: "json" };
import { env } from "@env";

export const handler: Handlers = {
	async GET(_, ctx) {
		try {
			const githubApiBaseUrl = "https://api.github.com",
				githubApiHeaders = new Headers({
					Accept: "application/vnd.github+json",
					...(Deno.env.get("GITHUB_CREDENTIALS")
						? {
								Authorization: `token ${Deno.env.get(
									"GITHUB_CREDENTIALS"
								)}`,
						  }
						: {}),
				});

			const [githubUser, githubRepos]: [Response, Response] =
				await Promise.all([
					fetch(
						`${githubApiBaseUrl}/users/${Deno.env.get(
							"GITHUB_USERNAME"
						)}`,
						{
							headers: githubApiHeaders,
						}
					),
					fetch(
						`${githubApiBaseUrl}/users/${Deno.env.get(
							"GITHUB_USERNAME"
						)}/repos`,
						{ headers: githubApiHeaders }
					),
				]);
			if (githubUser.status === 404 || githubRepos.status === 404) {
				return ctx.render(null);
			}
			const user: GithubUser = await githubUser.json();
			const repos = ((await githubRepos.json()) as GithubUserRepo[])
				.filter((repo) => !repo.fork)
				.sort(
					(repoA, repoB) =>
						repoA.stargazers_count - repoB.stargazers_count
				)
				.reverse();

			return ctx.render({ ...user, repos } as GithubUserData);
		} catch (err) {
			console.error(err);
			return ctx.render(err);
		}
	},
};

const curriculums: Experience[] = cv;
const skills = sk as ISkillSection[];
const contacts = ctt as ContactRef[];

export default function Home({ data }: PageProps<GithubUserData | null>) {
	console.log(data);
	const { repos, ...user } = (data as GithubUserData) || {},
		meta = {
			title: user?.login,
			description: user?.html_url,
		},
		sections = [
			{
				title: "Experience",
				id: "experience",
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
				classContent: "grid-projects",
			},
		];

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta content={meta.description} name="description" />
				<link rel="stylesheet" href="/css/style.css" />
				{/* <script src="https://cdn.tailwindcss.com"></script> */}
			</Head>
			<main class={tw`bg-slate-800 min-h-screen relative`}>
				<header class="js-bg" id="start">
					<article
						class={tw`p-10 lg:flex lg:max-w-screen-xl lg:mx-auto`}
					>
						<section
							class={tw`rounded-lg overflow-hidden w-48 mx-auto lg:w-56`}
						>
							<img
								src={user?.avatar_url}
								alt={user ? `${user?.name}'s pic` : "No user"}
							/>
						</section>

						<section
							class={tw`w-full text-center lg:text-left lg:ml-2 lg:flex lg:flex-col lg:justify-end`}
						>
							<h1
								class={tw`text-white text-5xl lg:drop-shadow-2xl lg:text-shadow lg:text-6xl`}
							>
								{user?.name || "User not found"}
							</h1>
							<hr class="hidOnSmallDevices" />
							<span class={tw`lg:flex`}>
								<p
									class={tw`text-yellow-500 text-shadow drop-shadow-2xl lg:mr-10 lg:w-1/2 lg:flex-1`}
								>
									{user?.bio || "No bio"}
								</p>
								<span
									class={tw`text-white hidOnSmallDevices lg:block`}
								>
									{sections.map((section, pos, arr) => (
										<>
											<a href={"#" + section.id}>
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

					<article class={tw`px-10 max-w-screen-xl mx-auto`}>
						<section
							class={tw`justify-between flex text-white lg:w-1/3`}
						>
							{contacts.map((contact) => (
								<ContactButton
									{...contact}
									userName={user?.name}
								/>
							))}
						</section>
					</article>
				</header>

				<div class={tw`p-10 lg:flex lg:max-w-screen-xl lg:mx-auto`}>
					<article class={tw`lg:flex-1 lg:mr-10`}>
						{sections.map((section) => (
							<section class={tw`mb-10`}>
								<div class={tw`lg:mb-3`} id={section.id}>
									<h1 class={tw`text-white text-shadow`}>
										<a
											href={"#" + section.id}
											class={tw`text-3xl font-bold text-shadow drop-shadow-xl lg:text-4xl`}
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

					<aside>
						<div id="skills">
							<h1
								class={tw`text-white text-4xl font-bold text-shadow lg:drop-shadow-xl lg:mb-3`}
							>
								Skills
							</h1>
							<hr />
							<br />
							<article class={tw`lg:mb-10`}>
								{skills.map((skill) => (
									<SkillSection {...skill} />
								))}
							</article>
						</div>
					</aside>
				</div>

				<footer class={tw`p-5 bg-slate-700 sticky bottom-0 lg:hidden`}>
					<div
						class={tw`bg-slate-700 text-white flex justify-evenly`}
					>
						{[
							...sections,
							{
								title: "Skills",
								id: "skills",
							},
							{
								title: "↑",
								id: "start",
							},
						].map((section) => (
							<a href={"#" + section.id}>{section.title}</a>
						))}
					</div>
				</footer>
			</main>
		</>
	);
}
