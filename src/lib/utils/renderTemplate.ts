import Mustache from 'mustache';

export function renderTemplate(template: string, variables: Record<string, any>) {
  return Mustache.render(template, variables);
}
