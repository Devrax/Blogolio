import { env } from "@env";

const githubApiBaseUrl = "https://api.github.com";
const gitCredentials =
	env.GITHUB_CREDENTIALS || Deno.env.get("GITHUB_CREDENTIALS");
const gitUserName = env.GITHUB_USERNAME || Deno.env.get("GITHUB_USERNAME");
const githubApiHeaders = new Headers({
	Accept: "application/vnd.github+json",
	...(gitCredentials
		? {
				Authorization: `token ${gitCredentials}`,
		  }
		: {}),
});

const githubFetcherGET = (api: string) =>
	fetch(api, { headers: githubApiHeaders });

export function GithubUserGET() {
	return githubFetcherGET(`${githubApiBaseUrl}/users/${gitUserName}`);
}

export function GithubUserRepositoriesGET() {
	return githubFetcherGET(`${githubApiBaseUrl}/users/${gitUserName}/repos`);
}
