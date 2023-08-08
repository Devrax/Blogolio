import { IS_BROWSER } from "$fresh/runtime.ts";

interface AnimatedBackgroundIcon {
   heightRefernce?: number;
   widthRefernce?: number;
   iconsProp?: string[]
}

export default function AnimatedBackgroundIcon({ heightRefernce, widthRefernce, iconsProp }: AnimatedBackgroundIcon) {
   const icons = iconsProp ?? ["🦕", "🚧", "🇩🇴", "📱", "🐒", "🚀", "💻"],
      setBackgroundIcons = (icons: string[]) => {
         if (!IS_BROWSER) return [];
         console.log("setBackground");
         const viewportWidth = widthRefernce ?? document.body.clientWidth,
            viewportHeight = heightRefernce ?? document.body.clientHeight,
            fixedIconPixelWidth = 20,
            fixedIconPixelHeight = 24.5;

         const howManyCols = Math.round(viewportWidth / fixedIconPixelWidth) - 1,
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
         <article class={`animated-icon-mosaics absolute ${heightRefernce ? 'h-[' + heightRefernce + ']' : 'min-h-[100dvh]'} flex select-none cursor-none z-[-1]`} aria-hidden>
            {
               ['sec1', 'sec2'].map((sect) => {
                  return (
                     <section class="col-icon-mosaics w-[100vw]" key={sect}>
                        {setMosaics.map((col) => (
                           <span class="row-icon-mosaics">
                              {col}
                           </span>
                        ))}
                     </section>
                  )
               })
            }
         </article>
      </>
   );
}
