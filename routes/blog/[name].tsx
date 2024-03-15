import { Head } from "$fresh/runtime.ts";
import { RouteContext } from "$fresh/server.ts";
import { GithubUser } from "@interfaces/GithubUser.ts";
import { MarkdownAttributes } from "@interfaces/MarkdownAttributes.ts";
import { getGithubUser } from "../../private/external-apis/github.ts";
import extract from "$std/front_matter/yaml.ts";
import { render } from 'markdown';

type PostMarkdown = { attrs: MarkdownAttributes, body: string };

const getMarkdownPost = async (postName: string): Promise<PostMarkdown> => {
   const postFolderPath = `./markdown/posts/${postName}.md`;
   const { attrs, body } = extract(await Deno.readTextFile(postFolderPath));
   return { attrs, body } as PostMarkdown;
 }

export default async function BlogPost(_: Request, ctx: RouteContext) {
  const { name } = ctx.params;
  const post = await getMarkdownPost(name),
  user: GithubUser = await getGithubUser();

  return (
    <>
      <Head>
        <title>{post.attrs.title}</title>
        <meta content={post.attrs.description} name="description" />
        <meta name={post.attrs.author} content="Author name" />
        <meta name="keywords" content={post.attrs.keywords} />
        <meta property="og:title" content={`${post.attrs.title}`} />
        <meta property="og:profile:username" content={post.attrs.author} />
        <meta property="og:url" content={ctx.url.href} />
        <meta property="og:image" content={post.attrs.image} />
        <meta
          property="og:description"
          content={post.attrs.description}
        />
        <meta property="og:locale" content="en_US" />
        <link rel="stylesheet" href="/styles/animations/animated-background.css" />
        <link rel="stylesheet" href="/styles/blog/blog.index.css" />
        <script src="/scripts/copy2clipboard.js" type="module" defer></script>
      </Head>
      <main>
        <header class="lg:max-w-[2000px] mb-6 overflow-hidden relative overflow-hidden" fake-ref>
          <nav class="p-4">
            <ul>
              <li>
                <a href="../" class="text-white text-md font-bold fake-attributes">&lt;{user?.name} <span class="attribute">to="./"</span> /&gt;</a>
                <br />
                <a href="./" class="text-white text-md font-bold fake-attributes">&lt;Blogs <span class="attribute">to="./blog"</span> /&gt;</a>
              </li>
            </ul>
          </nav>
        </header>
        <article class="flex justify-center items-center md:flex-row md:flex-row-reverse lg:max-w-[2000px] lg:mx-auto">
          <div
            class="markdown p-5 pt-0 md:mb-5 lg:mb-0 max-w-[768px]"
            dangerouslySetInnerHTML={{ __html: render(post.body) as string }}></div>
        </article>
      </main>
    </>
  );
}