# Attribution - world recipe import

This dataset adapts **UniTools World Recipes v2.0** (501 dishes from 127 countries),
author **UniTools** (github.com/farcrak/unitools-recipes, DOI 10.5281/zenodo.22969098),
licensed **Creative Commons Attribution-ShareAlike 4.0 International**
(https://creativecommons.org/licenses/by-sa/4.0/).

Changes made (per CC BY-SA 4.0 section 3(a)(1)(B)): dish selection limited to lunch/dinner
categories; ingredient names and quantities translated into this app's catalog ids and
rescaled from source servings to 4 servings; cooking fats, bone-in yields and piece weights
adjusted using documented conventions (see MAPPING-REPORT.md); nutrition recomputed per
serving; salt/water/to-taste lines omitted per app convention. Method text in
data/instructions/*.json is verbatim from the source (modified=false).

This adapted dataset is shared under CC BY-SA 4.0 as required by the license.

Per-dish provenance (source slug, country, adjustments, nutrition comparison) is in MANIFEST.json.

Ingredient nutrition reference: USDA FoodData Central SR Legacy (public domain),
fdcId recorded per new ingredient in data/ingredients-additions.js.
