/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Home() {
	return (
		<main class={tw`p-4 mx-auto max-w-screen-md`}>
			<p class={tw`my-6`}>
				Welcome to `fresh`. Try update this message in the ./routes/index.tsx
				file, and refresh.
			</p>
		</main>
	);
}
