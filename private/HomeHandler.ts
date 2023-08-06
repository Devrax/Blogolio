import { Handlers } from "$fresh/server.ts";
import { GithubUser, GithubUserData } from "@interfaces/GithubUser.ts";

import {
	GithubUserGET,
} from "./external-apis/github.ts";
import { getMarkdown } from "../markdown/getMarkdown.ts";

export const handler: Handlers = {
	async GET(_, ctx) {
		try {
			const githubUser: Response = await GithubUserGET();
			if (githubUser.status === 404) {
				return ctx.render(null);
			}
			const user: GithubUser = await githubUser.json();

			return ctx.render({ ...user, cv: await getMarkdown('cv') } as GithubUserData);
		} catch (err) {
			console.log(err);
			return ctx.render(null);
		}
	},
};
