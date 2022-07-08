import { Handlers } from "$fresh/server.ts";
import { env } from "@env";
import { GithubUser, GithubUserData } from "@interfaces/GithubUser.ts";
import { GithubUserRepo } from "@interfaces/GithubUserRepo.ts";

export const handler: Handlers = {
	async GET(_, ctx) {
		const githubApiBaseUrl = "https://api.github.com",
			githubApiHeaders = new Headers({
				Accept: "application/vnd.github+json",
				...(env.GITHUB_CREDENTIALS
					? { Authorization: `token ${env.GITHUB_CREDENTIALS}` }
					: {}),
			});

		const [githubUser, githubRepos]: [Response, Response] =
			await Promise.all([
				fetch(`${githubApiBaseUrl}/users/${env.GITHUB_USERNAME}`, {
					headers: githubApiHeaders,
				}),
				fetch(
					`${githubApiBaseUrl}/users/${env.GITHUB_USERNAME}/repos`,
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
	},
};
