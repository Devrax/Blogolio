import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { GithubUserData } from "@interfaces/GithubUser.ts";
import { Experience } from "@interfaces/Experience.ts";
import { ContactRef } from "@interfaces/ContactRef.ts";
import { SkillSection as ISkillSection } from "@interfaces/Skill.ts";
import RepoCard from "../islands/RepoCard.tsx";
import ExperienceBoard from "../islands/ExperienceBoard.tsx";
import SkillSection from "../islands/SkillSection.tsx";
import ContactButton from "../islands/ContactButton.tsx";
import FooterNavigation from "../islands/FooterNavigation.tsx";
import cv from "@local/curriculum.json" assert { type: "json" };
import sk from "@local/skills.json" assert { type: "json" };
import ctt from "@local/contact.json" assert { type: "json" };
import { handler as homeHandler } from "../private/HomeHandler.ts";
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
				id: "projects",
				content: repos?.map((repo) => <RepoCard {...repo} />),
				classContent: "grid-projects",
			},
		];

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta content={meta.description} name="description" />
				<meta name={user?.name} content="Author name" />
				<meta
					property="og:title"
					content={`${user?.name}'s curriculum`}
				/>
				<meta property="og:type" content="profile" />
				<meta property="og:url" content="https://devrafx.deno.dev/" />
				<meta property="og:image" content={user.avatar_url} />
				<link rel="stylesheet" href="/css/style.css" />
				<link rel="stylesheet" href="/css/grid.css" />
				<link rel="stylesheet" href="/css/text-utilities.css" />
				{/* <script src="https://cdn.tailwindcss.com"></script> */}
			</Head>
			<main class="bg-slate-800 min-h-screen relative overflow-hidden">
				<header class="js-bg" id="start">
					<article class="p-10 lg:flex lg:max-w-screen-xl lg:mx-auto">
						<section class="rounded-lg overflow-hidden w-48 mx-auto lg:w-56">
							<img
								src={user?.avatar_url}
								alt={user ? `${user?.name}'s pic` : "No user"}
							/>
						</section>

						<section class="w-full text-center lg:text-left lg:ml-2 lg:flex lg:flex-col lg:justify-end">
							<h1 class="text-white z-10 text-5xl lg:drop-shadow-2xl lg:text-shadow lg:text-6xl">
								{user?.name || "User not found"}
							</h1>
							<hr class="hidOnSmallDevices mb-2" />
							<span class="lg:flex">
								<p class="text-yellow-500 text-shadow drop-shadow-2xl lg:mr-10 lg:w-1/2 lg:flex-1">
									{user?.bio || "No bio"}
								</p>
								<span class="text-white hidOnSmallDevices lg:block">
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

					<article class="px-10 max-w-screen-xl mx-auto">
						<section class="justify-between flex text-white lg:w-1/3">
							{contacts.map((contact) => (
								<ContactButton
									{...contact}
									userName={user?.name}
								/>
							))}
						</section>
					</article>
				</header>

				<div class="p-10 lg:flex lg:max-w-screen-xl lg:mx-auto lg:flex-row-reverse">
					<aside class="mb-10">
						<div id="skills">
							<h1 class="text-white text-4xl font-bold text-shadow lg:drop-shadow-xl lg:mb-3">
								Skills
							</h1>
							<hr />
							<br />
							<article class="lg:mb-10">
								{skills.map((skill) => (
									<SkillSection {...skill} />
								))}
							</article>
						</div>
					</aside>

					<article class="lg:flex-1 lg:mr-10">
						{sections.map((section) => (
							<section class="mb-10">
								<div class="lg:mb-3" id={section.id}>
									<h1 class="text-white text-shadow">
										<a
											href={"#" + section.id}
											class="text-3xl font-bold text-shadow drop-shadow-xl lg:text-4xl"
										>
											{section.title}
										</a>
									</h1>
								</div>
								<hr />
								<br />
								<div class={section.classContent}>
									{section.content}
								</div>
							</section>
						))}
					</article>
				</div>
				<br />
				<FooterNavigation />
			</main>
		</>
	);
}
