// Dish ideas: names and one-line descriptions for discovery only.
// Ideas are NOT recipes: no ingredients, steps, servings, nutrition or safety
// guidance, and they never enter the planner or grocery list.
import IDEAS_DATA from '../data/ideas.mjs';

export const IDEAS = IDEAS_DATA;
export const IDEA_BY_ID = new Map(IDEAS.map((i) => [i.id, i]));

export function ideaMatches(idea, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return idea.name.toLowerCase().includes(q)
    || idea.blurb.toLowerCase().includes(q)
    || idea.countries.some((c) => c.toLowerCase().includes(q));
}
