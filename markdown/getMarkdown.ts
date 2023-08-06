import { render } from 'markdown';
export async function getMarkdown(name: string, raw = false): Promise<string> {
   const markdown = Deno.readTextFile('./markdown/' + name + '.md');
   return raw ? markdown : render(await markdown);
 }