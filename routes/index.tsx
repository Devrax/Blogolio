/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { env } from "@env";
import { GithubUser } from "@interfaces/GithubUser.ts";

export const handler: Handlers = {
	async GET(_, ctx) {
		const resp = await fetch(
			`https://api.github.com/users/${env.GITHUB_USERNAME}`
		);
		if (resp.status === 404) {
			return ctx.render(null);
		}
		const user: GithubUser = await resp.json();
		return ctx.render(user);
	},
};

export default function Home({ data }: PageProps<GithubUser | null>) {
	return (
		<div class={tw`p-4 mx-auto max-w-screen-md`}>
			<header>
				<article>
					<section>
						<img
							src={data?.avatar_url}
							alt={data ? `${data?.name}'s pic` : "No user"}
						/>
					</section>

					<section>
						<h1>{data?.name || "User not found"}</h1>
						<p>{data?.bio || "No bio"}</p>
					</section>
				</article>
			</header>
		</div>
	);
}
