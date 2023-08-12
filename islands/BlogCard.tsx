import { IS_BROWSER } from "$fresh/runtime.ts";
import { audioPlayer } from "@utils/audio-control.ts";
import { MarkdownAttributes } from "@interfaces/MarkdownAttributes.ts";

export default function BlogCard({ md }: { md: MarkdownAttributes }) {

  const anchorBehavior = (url: string, target = "_blank") => {
    console.log(url);
    audioPlayer("/sounds/click.wav").play().finally(() => {
      const a: HTMLAnchorElement = document.createElement("a");
      a.href = url;
      a.target = target;
      a.rel = "noopener external noreferrer";
      a.click();
    });
  };

  return (
    <>
      <div
        class="min-w-[280px] w-[90%] rounded md:w-[500px] lg:w-[1024px] active:opacity-75"
        key={md.title}
        id={md.title}
      >
        <div
          onClick={() => anchorBehavior(`./blog/${md.pathName}`, "_self")}
          class="p-2">
          <h3 class="text-xl font-bold text-white drop-shadow-2xl">
            {md.title}
          </h3>
          <span class="text-[0.75rem] font-bold text-white opacity-75">
            {
              IS_BROWSER
                ? new Date(md.created_at).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
                : ''
            } - {md.author}
          </span>
          <p class="text-white text-sm text-justify">{md.description}..</p>
        </div>
        <hr />
      </div>
    </>
  );
}
