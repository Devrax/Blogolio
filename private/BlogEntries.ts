import { HandlerContext, Handlers } from "$fresh/server.ts";
import { MarkdownProcessor } from "@utils/markdown-parser/markdown-parser.ts";

function createMarkdownMapping(): Record<string, string>[] {
	try {
		const path = "./static/markdown",
			mappedJSON = [];

		for (const dir of Deno.readDirSync(path)) {
			if (dir.isFile && dir.name.includes(".md")) {
				const content = Deno.readTextFileSync(`${path}/${dir.name}`),
					content2html = new MarkdownProcessor({
						rules: [[/<--\n*([^]+)\n*!-->/gm, "<map>$1<map>"]],
						extend: false,
					}).parseToHTML(content);

				const metaContent = content2html.split("<map>")[1].trim();

				const map = metaContent
					.split("\n")
					.reduce((initial, currentValue) => {
						const [key, value] = currentValue.split("=");
						initial[key] = value.trim();
						return initial;
					}, {} as Record<string, string>);
				mappedJSON.push(map);
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
