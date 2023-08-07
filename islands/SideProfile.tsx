import { IS_BROWSER } from "$fresh/runtime.ts";
import { audioPlayer } from "@utils/audio-control.ts";

interface SideProfiler {
  user: {
    avatar_url: string;
    name: string;
  };
}

export default function SideProfiler({ user }: SideProfiler) {
  const anchorBehavior = (url: string, target = '_blank') => {
    audioPlayer('/sounds/click.wav').play();
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.target = target;
    a.rel = 'noopener external noreferrer';
    a.click();
  };

  const doubleSound = () => {
    const player = audioPlayer('/sounds/click.wav');
    player.play()
    setTimeout(() => {
      player.play()
    }, 300);
  }

  return (
    <section
      id="user-profile"
      style="--delay-ms: 0ms;"
      class="flex justify-center md:flex-col md:items-center md:max-h-[100dvh] lg:px-12"
    >

<button
        id="mail-box"
        aria-label="Open the default mailbox"
        disabled={!IS_BROWSER}
        onClick={() => anchorBehavior('mailto:devrafx@gmail.com', '_self')}
        style="--delay-ms: 100ms;"
        class="w-[35px] fill-white mr-5 focus:outline-none focus-visible:outline-none active:opacity-75 md:mr-0 md:mb-5 md:w-[40px] lg:w-[50px]"
      >

<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
  </svg>
      </button>

      <button
        id="github-href"
        aria-label={`Go to ${user.name}'s Github`}
        disabled={!IS_BROWSER}
        onClick={() => anchorBehavior('https://github.com/Devrax?tab=repositories')}
        style="--delay-ms: 200ms;"
        class="w-[35px] fill-white mr-5 focus:outline-none focus-visible:outline-none active:opacity-75 md:mr-0 md:mb-5 md:w-[40px] lg:w-[50px]"
      >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </button>
      <div
        id="profile-github-pic"
        style="--delay-ms: 300ms"
        class="w-[80px] h-[80px] relative top-[-20px] md:top-[0] lg:h-[250px] lg:w-[250px]"
        onClick={() => doubleSound()}
      >
        <img
          src={user.avatar_url}
          alt={`${user.name}'s github profile picture`}
          class="rounded-full border-8 border-slate-800"
        />
      </div>
      <button
        id="linkedin-href"
        aria-label={`Go to ${user.name}'s LinkedIn`}
        disabled={!IS_BROWSER}
         onClick={() => anchorBehavior('https://www.linkedin.com/in/rafael-alexander-mejia/')}
        style="--delay-ms: 400ms;"
        class="w-[35px] fill-white ml-5 focus:outline-none focus-visible:outline-none active:opacity-75 md:ml-0 md:mt-5 md:w-[40px] lg:w-[50px]"
      >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      <button
        id="blog-entries"
        aria-label={`Go to ${user.name}'s blog entry`}
        disabled={!IS_BROWSER}
        //  onClick={() => anchorBehavior('https://www.linkedin.com/in/rafael-alexander-mejia/')}
        style="--delay-ms: 500ms;"
        class="w-[35px] fill-white ml-5 focus:outline-none focus-visible:outline-none active:opacity-75 md:ml-0 md:mt-5 md:w-[40px] lg:w-[50px]"
      >
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18">
    <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z"/>
  </svg>
      </button>

    </section>
  );
}
