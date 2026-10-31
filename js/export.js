// Excel export (SheetJS is loaded only when you tap Export).
import { buildGrocery } from './grocery.js';
import { planRecipes, mealFor, dayLabel } from './planner.js';
import { youtubeUrl, DIET_LABEL } from './data.js';

const SHEETJS = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';

function loadSheetJS() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SHEETJS;
    s.onload = () => resolve(window.XLSX);
    s.onerror = () => reject(new Error('Could not load the Excel library — check your connection.'));
    document.head.appendChild(s);
  });
}

export async function exportExcel(state) {
  const XLSX = await loadSheetJS();
  const { shop, pantry } = buildGrocery(state);
  const recipes = planRecipes(state);
  const [a, b] = state.people;

  const shopRows = [['Got it', 'Section', 'Item', 'Qty', 'Unit', 'For']];
  const unit = (i) => i.unit || (i.id ? 'pcs' : '');
  for (const i of shop) shopRows.push([i.checked ? '✓' : '', i.aisleLabel, i.name, i.amount, unit(i), [...new Set(i.dishes)].join(', ')]);
  const shopSheet = XLSX.utils.aoa_to_sheet(shopRows);
  shopSheet['!cols'] = [{ wch: 7 }, { wch: 30 }, { wch: 38 }, { wch: 7 }, { wch: 18 }, { wch: 70 }];
  shopSheet['!autofilter'] = { ref: `A1:F${shopRows.length}` };

  const pantryRows = [['Have it?', 'Section', 'Item', 'Qty', 'Unit', 'For']];
  for (const i of pantry) pantryRows.push(['', i.aisleLabel, i.name, i.amount, unit(i), [...new Set(i.dishes)].join(', ')]);
  const pantrySheet = XLSX.utils.aoa_to_sheet(pantryRows);
  pantrySheet['!cols'] = shopSheet['!cols'];

  const menuRows = [['When', 'Dish', 'Cuisine', 'Minutes', 'Type',
    `${a.name} protein (g/meal)`, `${a.name} kcal/meal`, `${b.name} protein (g/meal)`, `${b.name} kcal/meal`, 'YouTube']];
  recipes.forEach((r, i) => {
    const ma = mealFor(r, a), mb = mealFor(r, b);
    menuRows.push([dayLabel(state.rules.startDay, i, state.rules.mealsPerDish), r.name, r.cuisine, r.time,
      DIET_LABEL[r.diet], ma.protein, ma.kcal, mb.protein, mb.kcal, 'Watch']);
  });
  const menuSheet = XLSX.utils.aoa_to_sheet(menuRows);
  recipes.forEach((r, i) => {
    const cell = menuSheet[XLSX.utils.encode_cell({ r: i + 1, c: 9 })];
    cell.l = { Target: youtubeUrl(r) };
  });
  menuSheet['!cols'] = [{ wch: 22 }, { wch: 44 }, { wch: 13 }, { wch: 8 }, { wch: 16 },
    { wch: 14 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 10 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, shopSheet, 'Shopping list');
  XLSX.utils.book_append_sheet(wb, pantrySheet, 'Pantry check');
  XLSX.utils.book_append_sheet(wb, menuSheet, 'Menu');
  XLSX.writeFile(wb, `Groceries ${state.plan.weekOf || ''}.xlsx`.replace(' .', '.'));
}
