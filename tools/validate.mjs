// Checks the recipe library: unknown ingredients, duplicates, and dishes whose
// per-serving numbers look off. Run with: node tools/validate.mjs [--all]
import { RECIPES, DATA_ERRORS, GROUPS } from '../js/data.js';

const showAll = process.argv.includes('--all');
let failed = false;

if (DATA_ERRORS.length) {
  failed = true;
  console.log('ERRORS');
  for (const e of DATA_ERRORS) console.log('  ' + e);
}

console.log(`\n${RECIPES.length} recipes`);
for (const g of GROUPS) {
  const rs = RECIPES.filter((r) => r.group === g);
  const veg = rs.filter((r) => r.diet === 'veg').length;
  const avgP = Math.round(rs.reduce((s, r) => s + r.protein, 0) / rs.length);
  const avgK = Math.round(rs.reduce((s, r) => s + r.kcal, 0) / rs.length);
  console.log(`  ${g.padEnd(14)} ${String(rs.length).padStart(3)}  veg ${String(veg).padStart(2)}  avg ${avgP} g protein / ${avgK} kcal per serving`);
}

const flagged = RECIPES.filter((r) => r.protein < 20 || r.kcal < 350 || r.kcal > 750);
console.log(`\nOutside 20 g+ protein / 350–750 kcal per serving: ${flagged.length}`);
for (const r of showAll ? RECIPES : flagged) {
  console.log(`  ${r.name.padEnd(48)} ${String(r.protein).padStart(3)} g  ${String(r.kcal).padStart(4)} kcal  ${r.diet.padEnd(6)} ${r.mainProtein}  ${r.time}m`);
}

process.exit(failed ? 1 : 0);
