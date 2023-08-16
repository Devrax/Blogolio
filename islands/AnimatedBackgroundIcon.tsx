import { IS_BROWSER } from "$fresh/runtime.ts";

interface AnimatedBackgroundIcon {
   heightReference?: string;
   widthReference?: string;
   iconsProp?: string[]
}

export default function AnimatedBackgroundIcon({ heightReference, widthReference, iconsProp }: AnimatedBackgroundIcon) {

   if(!IS_BROWSER) return <></>

   const getRefHeight = heightReference ? document.querySelector<HTMLDivElement>(heightReference)!.offsetHeight : null,
         getRefWidth = widthReference ? document.querySelector<HTMLDivElement>(widthReference)!.offsetHeight : null;
   const icons = iconsProp ?? ["🦕", "🚧", "🇩🇴", "📱", "🐒", "🚀", "💻"],
      setBackgroundIcons = (icons: string[]) => {
            const viewportWidth = getRefWidth ?? window.innerWidth,
            viewportHeight = getRefHeight ?? window.innerHeight,
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
         <article class={`animated-icon-mosaics absolute ${getRefHeight ? 'h-[' + getRefHeight + 'px]' : 'min-h-[100dvh]'} flex select-none cursor-none z-[-1]`} aria-hidden>
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
