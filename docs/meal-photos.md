# Meal photos: how Claude reads them

When someone logs "Ate something else" on the Today tab, they can add a photo. The app saves it to the shared Supabase table, next to the receipts, and Claude reads it later from the same scheduled task on the Mac that reads receipts.

## Rows (table `meal_state`)

| id | data |
| --- | --- |
| `<household>:meal-photo:<id>` | `{ at, iso, person, meal, status: "new", thumb, note, foods: [{ food, n }] }` |
| `<household>:meal-photo-img:<id>` | `{ images: ["data:image/jpeg;base64,..."] }` |

- `iso` is the day, `person` is 0 or 1 (order in Settings → People), `meal` is `breakfast`, `lunch` or `dinner`.
- `note` is what they typed ("What did you have?"), and `foods` are the portions they picked from the quick-food list (ids in `js/quick-foods.js`). Both are hints, not the answer.
- Rows with `removed: true` are deleted photos. Skip them.

## What the task should do

For every `meal-photo` row with `status: "new"`:

1. Read the image from the matching `meal-photo-img` row.
2. Work out the foods and the amount of each, in household measures (katori, cup, pieces, grams).
3. Estimate protein, kcal, carbs and fibre for the whole plate. Say "approximate"; a photo can't show oil or hidden ingredients.
4. Write the row back with `status: "read"` and:

```json
"estimate": {
  "items": [{ "name": "Chicken biryani", "qty": "1 plate, about 300 g", "protein": 25, "kcal": 500, "carbs": 60, "fibre": 3 }],
  "protein": 25, "kcal": 500, "carbs": 60, "fibre": 3,
  "note": "Raita on the side not counted"
}
```

If the photo can't be read (blurry, no food), write `status: "unreadable"` and leave `estimate` out. The app then keeps using the picked foods.

Keep every other field as it was. Never delete the image row. The app clears it when someone removes the photo.

## Suggested instruction to add to the scheduled task

> Also check the Two Plates `meal_state` table for rows whose id contains `:meal-photo:` and whose data has `"status": "new"`. For each, open the image in the matching `:meal-photo-img:` row, estimate the foods, amounts, protein, kcal, carbs and fibre as described in `docs/meal-photos.md` in the two-plates repository, and write the result back as `status: "read"` with an `estimate` object (or `status: "unreadable"`).
