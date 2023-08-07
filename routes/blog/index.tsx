import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { GithubUserData } from "@interfaces/GithubUser.ts";
import { handler as homeHandler } from "../../private/HomeHandler.ts";
export const handler: Handlers = homeHandler;

export default function Home({ data }: PageProps<GithubUserData | null>) {
  const { ...user } = (data as GithubUserData) || {},
    meta = {
      title: user?.login,
      description: user?.html_url,
    };

  return (
    <>
      <Head>
        <title>{meta.title + ' 🐒'}</title>
        <meta content={meta.description} name="description" />
        <meta name={user?.name} content="Author name" />
        <meta property="og:title" content={`${user?.name}'s resume`} />
        <meta property="og:type" content={`${user?.name}'s blog entries`} />
        <meta property="og:url" content="https://devrafx.deno.dev/" />
        <meta property="og:image" content="https://avartation-api.vercel.app/api?face=03&outfit=10&hair=23&accessory=02" />
        <meta
          property="og:description"
          content="My blog entry, I hope you find something enlightful"
        />
        <meta property="og:locale" content="en_US" />
      </Head>
      <main class="bg-slate-800 relative overflow-hidden">
        <article class="flex h-[100dvh] justify-center items-center md:flex-row md:flex-row-reverse lg:max-w-[2000px] lg:mx-auto">
         <section id="banner-men-working" class="text-white font-bold text-2xl md:text-4xl lg:text-6xl text-center">
            <h1>👷🏻‍♂️🛑MAN WORKING!🏗️🚧</h1>
            <h3>Come later</h3>
         </section>
        </article>
      </main>
    </>
  );
}
