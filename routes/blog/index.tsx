import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { GithubUserData } from "@interfaces/GithubUser.ts";
import { handler as homeHandler } from "../../private/HomeHandler.ts";
import AnimatedBackgroundIcon from "@islands/AnimatedBackgroundIcon.tsx";
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
        <title>{'Blog ' +meta.title + ' 🐒'}</title>
        <meta content={meta.description} name="description" />
        <meta name={user?.name} content="Author name" />
        <meta property="og:title" content={`${user?.name}'s journey as web developer`} />
        <meta property="og:type" content={`${user?.name}'s blog entries`} />
        <meta property="og:url" content="https://devrafx.deno.dev/" />
        <meta property="og:image" content="https://avartation-api.vercel.app/api?face=03&outfit=10&hair=23&accessory=02&bg=rgb(30,%2041,%2059)" />
        <meta
          property="og:description"
          content="My blog entry, I hope you find something enlightful"
        />
        <meta property="og:locale" content="en_US" />
        <link rel="stylesheet" href="/styles/animations/animated-background.css" />
        <link rel="stylesheet" href="/styles/blog/blog.index.css" />
      </Head>
      <main class="relative overflow-hidden">
        <AnimatedBackgroundIcon />
      <header class="p-[16px]">
        <nav>
          <ul>
            <li>
              <a href="./" class="text-white text-xl font-bold fake-attributes"><span>&lt;{ user?.name } <span class="attribute">to="./"</span> /&gt;</span></a>
            </li>
          </ul>
        </nav>
      </header>
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
