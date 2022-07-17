import { HandlerContext, Handlers } from "$fresh/server.ts";
import { MarkdownMetaEnum } from "../enums/MarkdownMetaSignature.ts";
import { MarkdownMeta } from "../interfaces/MarkdownMeta.ts";
import { GithubUserGET } from "./external-apis/github.ts";

function createMarkdownMapping(): MarkdownMeta[] {
	try {
		const path = "./static/markdown",
			mappedJSON: MarkdownMeta[] = [];

		for (const dir of Deno.readDirSync(path)) {
			if (dir.isFile && dir.name.includes(".md")) {
				const content = Deno.readTextFileSync(`${path}/${dir.name}`),
					metaContent = content.match(/<--\n*([^]+)\n*!-->/gm);

				if (metaContent != null && metaContent.length > 0) {
					const map = metaContent[0]
						.replace(/<--|!-->/g, "")
						.trim()
						.split("\n")
						.reduce((initial, currentValue) => {
							const [key, value] = currentValue.split("=") as [
								MarkdownMetaEnum,
								string
							];
							initial[key] = value.trim();
							return initial;
						}, {} as { [key in MarkdownMetaEnum]: string | Date });

					mappedJSON.push(map as MarkdownMeta);
				}
			}
		}
		return mappedJSON;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export const handler: Handlers = {
	async GET(_, ctx: HandlerContext) {
		try {
			const blogList = createMarkdownMapping(),
				githubUser = await GithubUserGET();
			return ctx.render({ blogList, githubUser });
		} catch (err) {
			console.log(err);
			return ctx.render();
		}
	},
};
