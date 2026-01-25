import Exa from "exa-js";
import { memory } from "../memory";

const exa = new Exa(process.env.EXA_API_KEY);

export const exaSearchTool = {
  name: "search",
  description: "بحث في الإنترنت باستخدام Exa API",
  execute: async ({ input }: { input: string }) => {
    const result = await exa.searchAndContents(input, { numResults: 5, text: true });
    const output = result.results
      .map(r => `🔹 ${r.title}\n${r.text?.slice(0,300)}...\n${r.url}`)
      .join("\n\n");

    memory.add(`[search]\n${output}`);
    return output || "لم يتم العثور على نتائج.";
  }
};
