import { Handlers } from "$fresh/server.ts";
import { GithubUser, GithubUserData } from "@interfaces/GithubUser.ts";
import { GithubUserRepo } from "@interfaces/GithubUserRepo.ts";
import {
	GithubUserRepositoriesGET,
	GithubUserGET,
} from "./external-apis/github.ts";

export const handler: Handlers = {
	async GET(_, ctx) {
		try {
			const [githubUser, githubRepos]: [Response, Response] =
				await Promise.all([
					GithubUserGET(),
					GithubUserRepositoriesGET(),
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
