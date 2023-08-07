import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { GithubUserData } from "@interfaces/GithubUser.ts";
import { handler as homeHandler } from "../private/HomeHandler.ts";
import SideProfiler from "../islands/SideProfile.tsx";
import AnimatedBackgroundIcon from "../islands/AnimatedBackgroundIcon.tsx";
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
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://devrafx.deno.dev/" />
        <meta property="og:image" content={user.avatar_url} />
        <meta
          property="og:description"
          content="An online resume where you can know more about me"
        />
        <meta property="og:locale" content="en_US" />
        <link rel="stylesheet" href="/styles/animations.css" />
        <link rel="stylesheet" href="/styles/animations/animated-background.css" />
      </Head>
      <body class="bg-slate-800 ">
      <main class="relative overflow-hidden">
        <AnimatedBackgroundIcon />
        <article class="flex h-[100dvh] flex-col md:flex-row md:flex-row-reverse lg:max-w-[2000px] lg:mx-auto">
          <section
            id="user-information"
            class="flex-1 text-white px-8 pb-8 overflow-hidden h-[calc(100dvh-64px)] md:h-[100dvh]"
          >
            <section class="relative faded-text overflow-auto h-[calc(100%+64px)] pb-[64px] md:pb-0 md:h-full md:flex md:flex-col md:justify-center lg:pr-12">
              <h2 id="user-github-name" style="--delay-ms: 0ms;" class="text-5xl my-5 mt-8 drop-shadow-xl font-bold">
                🦕 {user.name} 🚀
              </h2>

              <section
                style="--delay-ms: 300ms;"
                class="markdown md:mb-5 lg:mb-0"
                dangerouslySetInnerHTML={{ __html: user.cv as string }}
              >
              </section>
            </section>
          </section>
          <SideProfiler user={user} />
        </article>
      </main>
      </body>
    </>
  );
}
