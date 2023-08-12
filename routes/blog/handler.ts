import { getGithubUser } from "../../private/external-apis/github.ts";
import { extract } from '$std/front_matter/yaml.ts';
import { Handlers } from "$fresh/server.ts";
import { GithubUser } from "@interfaces/GithubUser.ts";
import { MarkdownAttributes } from "@interfaces/MarkdownAttributes.ts";

const getMarkdownPostsList = async (): Promise<MarkdownAttributes[]> => {
   const files: MarkdownAttributes[] = [];
   const postsFolderPath = "./markdown/posts";
   for await (const dirEntry of Deno.readDir(postsFolderPath)) {
     if(!dirEntry.isFile) continue;
     const { attrs } = extract(await Deno.readTextFile(postsFolderPath + "/" + dirEntry.name));
     files.push(attrs as unknown as MarkdownAttributes);
   }

   return files.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
 }

 export const blogHandler: Handlers = {
	async GET(_, ctx) {
		try {
			const [mdList, user] = await Promise.all([getMarkdownPostsList(), getGithubUser()]);
         if(!user) ctx.render(null);
			return ctx.render({ user, mdList } as { user: GithubUser, mdList: MarkdownAttributes[]});
		} catch (err) {
			console.log(err);
			return ctx.render(null);
		}
	},
};