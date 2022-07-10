/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { GithubUserData } from "@interfaces/GithubUser.ts";
import { Experience } from "@interfaces/Experience.ts";
import { ContactRef } from "@interfaces/ContactRef.ts";
import { SkillSection as ISkillSection } from "@interfaces/Skill.ts";
import { handler as homeHandler } from "../private/HomeHandler.ts";
import RepoCard from "../islands/RepoCard.tsx";
import ExperienceBoard from "../islands/ExperienceBoard.tsx";
import SkillSection from "../islands/SkillSection.tsx";
import ContactButton from "../islands/ContactButton.tsx";
import cv from "@local/curriculum.json" assert { type: "json" };
import sk from "@local/skills.json" assert { type: "json" };
import ctt from "@local/contact.json" assert { type: "json" };

export const handler: Handlers = homeHandler;
const curriculums: Experience[] = cv;
const skills = sk as ISkillSection[];
const contacts = ctt as ContactRef[];

export default function Home({ data }: PageProps<GithubUserData | null>) {
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
				<script src="https://cdn.tailwindcss.com"></script>
			</Head>
			<main class={tw`bg-slate-800 min-h-screen`}>
				<header class="js-bg">
					<article class={tw`flex p-10 max-w-screen-xl mx-auto`}>
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
									class={tw`drop-shadow-2xl mr-10 w-1/2 text-yellow-500 text-shadow flex-1`}
								>
									{user?.bio || "No bio"}
								</p>
								<span class={tw`text-white`}>
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

					<article
						class={tw`max-w-screen-xl justify-between flex text-white px-10 mx-auto`}
					>
						{contacts.map((contact) => (
							<ContactButton {...contact} userName={user?.name} />
						))}
					</article>
				</header>

				<div class={tw`p-10 flex max-w-screen-xl mx-auto`}>
					<article class={tw`flex-1 mr-10`}>
						{sections.map((section) => (
							<section class={tw`mb-10`}>
								<div class={tw`mb-3`} id={section.id}>
									<h1
										class={tw`text-white text-3xl text-shadow`}
									>
										<a
											href={"#" + section.id}
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

					<aside>
						<div>
							<h1
								class={tw`text-white text-4xl font-bold drop-shadow-xl text-shadow mb-3`}
							>
								Skills
							</h1>
							<hr />
							<br />
							<article class={tw`mb-10`}>
								{skills.map((skill) => (
									<SkillSection {...skill} />
								))}
							</article>
						</div>
					</aside>
				</div>
			</main>
		</>
	);
}
