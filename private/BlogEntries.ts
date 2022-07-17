import { HandlerContext, Handlers } from "$fresh/server.ts";
import { MarkdownProcessor } from "@utils/markdown-parser/markdown-parser.ts";

function createMarkdownMapping(): Record<string, string>[] {
	try {
		const path = "./static/markdown",
			mappedJSON = [];

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
							const [key, value] = currentValue.split("=");
							initial[key] = value.trim();
							return initial;
						}, {} as Record<string, string>);
					console.log(map);
					mappedJSON.push(map);
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
	GET(_, ctx: HandlerContext) {
		try {
			const blogList = createMarkdownMapping();
			return ctx.render(blogList);
		} catch (err) {
			console.log(err);
			return ctx.render();
		}
	},
};
