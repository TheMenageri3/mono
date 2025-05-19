import Mustache from "mustache";

export function extractMustacheVariables(template: string): string[] {
  const tokens = Mustache.parse(template);
  return tokens
    .filter(([type]) => type === "name")
    .map(([, name]) => name);
}
