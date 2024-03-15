import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { GithubUser } from "@interfaces/GithubUser.ts";
import { MarkdownAttributes } from "@interfaces/MarkdownAttributes.ts";
import { blogHandler } from "./handler.ts";
import BlogCard from "@islands/BlogCard.tsx";

export const handler: Handlers = blogHandler;

export default function Blog({ data }: PageProps<{ user: GithubUser, mdList: MarkdownAttributes[]}>) {
  const { ...user } = (data.user as GithubUser) || {},
    meta = {
      title: user?.login,
      description: user?.html_url,
    };
  const markdownList = data.mdList;
  

  return (
    <>
      <Head>
        <title>{'Blog | ' + meta.title + ' 🐒'}</title>
        <meta content={meta.description} name="description" />
        <meta content={user?.name} name="author" />
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
      <main>
        <header class="lg:max-w-[2000px] mb-6 overflow-hidden relative overflow-hidden" fake-ref>
          <nav class="p-4">
            <ul>
              <li>
                <a href="./" class="text-white text-md font-bold fake-attributes">&lt;{user?.name} <span class="attribute">to="./"</span> /&gt;</a>
              </li>
            </ul>
          </nav>
        </header>
        <article class="flex justify-center items-center md:flex-row md:flex-row-reverse lg:max-w-[2000px] lg:mx-auto">
          {
            markdownList?.map(md => <BlogCard md={md} />)
          }
        </article>
      </main>
    </>
  );
}
