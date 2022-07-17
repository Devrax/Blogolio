import { HandlerContext, Handlers } from "$fresh/server.ts";
import { GithubUserGET } from "./external-apis/github.ts";
import { marked } from "@marked";

function getMarkdownContent(slug: string): null | string {
	try {
		const path = "./static/markdown",
			dir = Array.from(Deno.readDirSync(path)).find(
				(dir) => dir.name === `${slug}.md`
			);

		if (dir != null) {
			return marked.parse(
				Deno.readTextFileSync(`${path}/${dir.name}`).replace(
					/<--\n*([^]+)\n*!-->/,
					""
				)
			);
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const handler: Handlers = {
	async GET(_, ctx: HandlerContext) {
		try {
			const blogPost = getMarkdownContent(ctx.params.slug),
				githubUser = await GithubUserGET();
			return ctx.render({
				blogPost,
				githubUser: await githubUser.json(),
			});
		} catch (err) {
			console.log(err);
			return ctx.render();
		}
	},
};
