import { Handlers } from "$fresh/server.ts";
import { GithubUser, GithubUserData } from "@interfaces/GithubUser.ts";
import { GithubUserRepo } from "@interfaces/GithubUserRepo.ts";
import { env } from "@env";

export const handler: Handlers = {
	async GET(_, ctx) {
		try {
			const gitCredentials =
					env.GITHUB_CREDENTIALS ||
					Deno.env.get("GITHUB_CREDENTIALS"),
				gitUserName =
					env.GITHUB_USERNAME || Deno.env.get("GITHUB_USERNAME"),
				githubApiBaseUrl = "https://api.github.com",
				githubApiHeaders = new Headers({
					Accept: "application/vnd.github+json",
					...(gitCredentials
						? {
								Authorization: `token ${gitCredentials}`,
						  }
						: {}),
				}),
				[githubUser, githubRepos]: [Response, Response] =
					await Promise.all([
						fetch(`${githubApiBaseUrl}/users/${gitUserName}`, {
							headers: githubApiHeaders,
						}),
						fetch(
							`${githubApiBaseUrl}/users/${gitUserName}/repos`,
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
			console.log(err);
			return ctx.render(null);
		}
	},
};
