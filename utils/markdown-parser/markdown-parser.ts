type ParsingRuler = [RegExp, string][];
const omitComments: ParsingRuler = [[/<--\n*([^]+)\n*!-->/gm, ""]];
const headersRules: ParsingRuler = [
	[/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
	[/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
	[/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
	[/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
	[/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
	[/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],
];
const textTransformationRules: ParsingRuler = [
	[/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
	[/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
	[/__([^_]+)__/g, "<b>$1</b>"],
	[/_([^_`]+)_/g, "<i>$1</i>"],
	[/([^\n]+\n?)/g, "<p>$1</p>"],
];
const linksRules: ParsingRuler = [
	[
		/\[([^\]]+)\]\(([^)]+)\)/g,
		'<a href="$2" rel="noopener author external noreferrer" style="color:#2A5DB0;text-decoration: none;">$1</a>',
	],
	[
		/(`)(\s?[^\n,]+\s?)(`)/g,
		'<a style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</a>',
	],
];
const listsRules: ParsingRuler = [
	[/([^\n]+)(\+)([^\n]+)/g, "<ul><li>$3</li></ul>"],
	[/([^\n]+)(\*)([^\n]+)/g, "<ul><li>$3</li></ul>"],
];
const imagesRules: ParsingRuler = [
	[
		/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
		'<img src="$2" alt="$1" title="$3" />',
	],
];
const rules: ParsingRuler = [
	...omitComments,
	...headersRules,
	...textTransformationRules,
	...linksRules,
	...listsRules,
	...imagesRules,
];

export class MarkdownProcessor {
	private ruler: ParsingRuler;

	constructor(config?: { rules: ParsingRuler; extend: boolean }) {
		if (config?.rules && Array.isArray(config.rules)) {
			this.ruler =
				config?.extend || config.extend == null
					? [...rules, ...config.rules]
					: [...config.rules];
		} else {
			this.ruler = rules;
			console.assert(
				config?.rules && !Array.isArray(config.rules),
				`
         config is optional but when it's defined as an Object{rules, extend}
         the "rules" property must be define as a tuple of type Array[RegExp, string]`
			);
		}
	}

	public parseToHTML(markdown: string): string {
		for (const [expresion, parse] of this.ruler) {
			markdown = markdown.replace(expresion, parse);
		}
		return markdown;
	}
}
