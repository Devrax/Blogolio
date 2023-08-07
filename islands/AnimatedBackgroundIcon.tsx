import { IS_BROWSER } from "$fresh/runtime.ts";

export default function AnimatedBackgroundIcon() {
   const icons = ["🦕", "🚧", "🇩🇴", "📱", "🐒", "🚀", "💻"],
      setBackgroundIcons = (icons: string[]) => {
         if (!IS_BROWSER) return [];
         const viewportWidth = document.body.clientWidth,
            viewportHeight = document.body.clientHeight,
            fixedIconPixelWidth = 20,
            fixedIconPixelHeight = 24.5;

         const howManyCols = Math.round(viewportWidth / fixedIconPixelWidth),
            howManyRows = Math.round(viewportHeight / fixedIconPixelHeight);

         const [_, fraction] = (howManyCols / icons.length).toString().split(".");
         const attempts = Math.round(howManyCols / icons.length);
         let repeatedIcons = "";
         for (let i = 1; i <= attempts; i++) {
            if (attempts === i && fraction) {
               const arr = [...icons].slice(0, icons.length * +("0." + fraction));
               repeatedIcons += arr.join("");
            } else {
               repeatedIcons += icons.join("");
            }
         }

         const repeatSetIconsHeight = [];
         for (let i = 0; i < howManyRows; i++) {
            repeatSetIconsHeight.push(repeatedIcons);
         }
         return repeatSetIconsHeight;
      };

   const setMosaics = setBackgroundIcons(icons);

   return (
      <>
         <article class="animated-icon-mosaics absolute min-h-[100dvh] flex select-none cursor-none z-[-1]" aria-hidden>
            <section class="col-icon-mosaics w-[100vw]">
               {setMosaics.map((col) => (
                  <span class="row-icon-mosaics">
                     {col}
                  </span>
               ))}
            </section>
            <section class="col-icon-mosaics w-[100vw]">
               {setMosaics.map((col) => (
                  <span class="row-icon-mosaics">
                     {col}
                  </span>
               ))}
            </section>
            <section class="col-icon-mosaics w-[100vw]">
               {setMosaics.map((col) => (
                  <span class="row-icon-mosaics">
                     {col}
                  </span>
               ))}
            </section>
         </article>
      </>
   );
}
