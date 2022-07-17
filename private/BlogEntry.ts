import { HandlerContext, Handlers } from "$fresh/server.ts";
import { GithubUserGET } from "./external-apis/github.ts";
import { marked } from "@marked";

async function getMarkdownContent(slug: string): Promise<null | string> {
	try {
		const path = "./static/markdown";
		let dir: Deno.DirEntry | null = null;

		for await (const directory of Deno.readDir(path)) {
			if (directory.name === `${slug}.md`) {
				dir = directory;
				break;
			}
		}

		if (dir != null) {
			const getText = (
				await Deno.readTextFile(`${path}/${dir.name}`)
			).replace(/<--\n*([^]+)\n*!-->/, "");
			return marked.parse(getText);
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
			const blogPost = await getMarkdownContent(ctx.params.slug),
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
