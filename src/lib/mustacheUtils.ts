const Mustache = require("mustache");

export function extractMustacheVariables(template: string): string[] {
  const tokens = Mustache.parse(template);
  return tokens
    .filter(([type]: [string]) => type === "name")
    .map(([, name]: [string, string]) => name);
}
