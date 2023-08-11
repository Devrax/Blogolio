const githubApiBaseUrl = "https://api.github.com";
const gitCredentials = Deno.env.get("GITHUB_CREDENTIALS");
const gitUserName = Deno.env.get("GITHUB_USERNAME");
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

export const getGithubUser = async () => {
	const githubUser: Response = await GithubUserGET();
	if (githubUser.status === 404) {
		return null;
	}
	return githubUser.json();
}
