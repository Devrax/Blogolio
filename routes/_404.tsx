
import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="px-4 py-8 mx-auto text-white text-center">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">404 - Page not found</h1>
          <p class="my-4">
            The page you were looking for doesn't exist.
          </p>
          <img src="/404-no-found.gif" alt="404 page no found animated gif" />
          <a href="/" class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
