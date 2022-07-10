export const textShorter = (text: string) => {
	return text?.length >= 130 ? text?.slice(0, 110) + " [...]" : text;
};
