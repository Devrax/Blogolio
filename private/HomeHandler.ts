import { Handlers } from "$fresh/server.ts";
import { GithubUser, GithubUserData } from "@interfaces/GithubUser.ts";
import { getGithubUser } from "./external-apis/github.ts";
import { getMarkdown } from "../markdown/getMarkdown.ts";

export const handler: Handlers = {
	async GET(_, ctx) {
		try {
			const user: GithubUser = await getGithubUser();

			if(!user) return ctx.render(null);

			return ctx.render({ ...user, cv: await getMarkdown('cv') } as GithubUserData);
		} catch (err) {
			console.log(err);
			return ctx.render(null);
		}
	},
};
