export default {
  "id": "unitools:tarator",
  "kind": "source-native-fixed-base",
  "name": "Tarator",
  "country": "BG",
  "cuisine": "Bulgarian cuisine",
  "baseServings": 4,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": null,
  "dietClassificationBasis": "Unverified stock/product formulation; do not promote source claims",
  "sourceDietClaims": [
    "vegetarian",
    "gluten-free"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 20,
    "cookMinutes": 0,
    "stepMinutesTotal": 51,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:tarator:001",
      "name": "Bulgarian yoghurt",
      "quantity": 700,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "yogurt",
        "name": {
          "ru": "Болгарский йогурт",
          "en": "Bulgarian yoghurt"
        },
        "quantity": 700,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        5
      ]
    },
    {
      "lineRef": "src:unitools:tarator:002",
      "name": "Cucumbers",
      "quantity": 500,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "cucumber",
        "name": {
          "ru": "Огурцы",
          "en": "Cucumbers"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        2,
        6
      ]
    },
    {
      "lineRef": "src:unitools:tarator:003",
      "name": "Walnuts",
      "quantity": 80,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "walnuts",
        "name": {
          "ru": "Грецкие орехи",
          "en": "Walnuts"
        },
        "quantity": 80,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:tarator:004",
      "name": "Garlic",
      "quantity": 3,
      "unit": "clove",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "garlic",
        "name": {
          "ru": "Чеснок",
          "en": "Garlic"
        },
        "quantity": 3,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        3,
        5
      ]
    },
    {
      "lineRef": "src:unitools:tarator:005",
      "name": "Dill",
      "quantity": 40,
      "unit": "g",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "dill",
        "name": {
          "ru": "Укроп",
          "en": "Dill"
        },
        "quantity": 40,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6
      ]
    },
    {
      "lineRef": "src:unitools:tarator:006",
      "name": "Sunflower oil",
      "quantity": 3,
      "unit": "tbsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "sunfloweroil",
        "name": {
          "ru": "Подсолнечное масло",
          "en": "Sunflower oil"
        },
        "quantity": 3,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6
      ]
    },
    {
      "lineRef": "src:unitools:tarator:007",
      "name": "Cold water",
      "quantity": 200,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "water",
        "name": {
          "ru": "Вода холодная",
          "en": "Cold water"
        },
        "quantity": 200,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        5
      ]
    },
    {
      "lineRef": "src:unitools:tarator:008",
      "name": "Salt",
      "quantity": null,
      "unit": "toTaste",
      "note": null,
      "scaling": "fixed",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "salt",
        "name": {
          "ru": "Соль",
          "en": "Salt"
        },
        "quantity": null,
        "unit": "toTaste",
        "scaling": "fixed",
        "note": null
      },
      "methodSteps": [
        1,
        3
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Натрите огурцы на крупной тёрке или нарежьте мелким кубиком и посолите.",
        "en": "Grate the cucumbers coarsely or dice them small and salt them."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Оставьте огурцы на десять минут, чтобы они отдали воду, но воду не сливайте.",
        "en": "Leave the cucumber ten minutes to give up its water, but do not pour that water away."
      },
      "minutes": 12
    },
    {
      "text": {
        "ru": "Растолките чеснок с солью в пасту, чтобы он не попадался кусочками.",
        "en": "Crush the garlic with salt into a paste so it does not turn up in pieces."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Смелите грецкие орехи в мелкую крошку, оставив немного крупных кусочков.",
        "en": "Grind the walnuts to a fine crumb, keeping a few larger pieces back."
      },
      "minutes": 6
    },
    {
      "text": {
        "ru": "Взбейте йогурт венчиком с холодной водой до однородности и добавьте чеснок и орехи.",
        "en": "Whisk the yoghurt with the cold water until even and add the garlic and walnuts."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Вмешайте огурцы с их соком, рубленый укроп и подсолнечное масло.",
        "en": "Stir in the cucumber with its juice, the chopped dill and the sunflower oil."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Охладите час и подавайте с кубиком льда в каждой тарелке.",
        "en": "Chill it an hour and serve with an ice cube in each bowl."
      },
      "minutes": 8
    }
  ],
  "sourceRecord": {
    "slug": "tarator",
    "country": "BG",
    "name": {
      "ru": "Таратор",
      "en": "Tarator"
    },
    "nativeName": "Таратор",
    "summary": {
      "ru": "Холодный суп из йогурта с огурцом, чесноком, укропом и грецкими орехами.",
      "en": "A cold yoghurt soup with cucumber, garlic, dill and walnuts."
    },
    "category": "soup",
    "diets": [
      "vegetarian",
      "gluten-free"
    ],
    "difficulty": "easy",
    "baseServings": 4,
    "prepMinutes": 20,
    "cookMinutes": 0,
    "nutritionPerServing": {
      "calories": 260,
      "protein": 12,
      "fat": 18,
      "carbs": 14
    },
    "ingredients": [
      {
        "id": "yogurt",
        "name": {
          "ru": "Болгарский йогурт",
          "en": "Bulgarian yoghurt"
        },
        "quantity": 700,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "cucumber",
        "name": {
          "ru": "Огурцы",
          "en": "Cucumbers"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "walnuts",
        "name": {
          "ru": "Грецкие орехи",
          "en": "Walnuts"
        },
        "quantity": 80,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "garlic",
        "name": {
          "ru": "Чеснок",
          "en": "Garlic"
        },
        "quantity": 3,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "dill",
        "name": {
          "ru": "Укроп",
          "en": "Dill"
        },
        "quantity": 40,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "sunfloweroil",
        "name": {
          "ru": "Подсолнечное масло",
          "en": "Sunflower oil"
        },
        "quantity": 3,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "water",
        "name": {
          "ru": "Вода холодная",
          "en": "Cold water"
        },
        "quantity": 200,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "salt",
        "name": {
          "ru": "Соль",
          "en": "Salt"
        },
        "quantity": null,
        "unit": "toTaste",
        "scaling": "fixed",
        "note": null
      }
    ],
    "steps": [
      {
        "text": {
          "ru": "Натрите огурцы на крупной тёрке или нарежьте мелким кубиком и посолите.",
          "en": "Grate the cucumbers coarsely or dice them small and salt them."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Оставьте огурцы на десять минут, чтобы они отдали воду, но воду не сливайте.",
          "en": "Leave the cucumber ten minutes to give up its water, but do not pour that water away."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Растолките чеснок с солью в пасту, чтобы он не попадался кусочками.",
          "en": "Crush the garlic with salt into a paste so it does not turn up in pieces."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Смелите грецкие орехи в мелкую крошку, оставив немного крупных кусочков.",
          "en": "Grind the walnuts to a fine crumb, keeping a few larger pieces back."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Взбейте йогурт венчиком с холодной водой до однородности и добавьте чеснок и орехи.",
          "en": "Whisk the yoghurt with the cold water until even and add the garlic and walnuts."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Вмешайте огурцы с их соком, рубленый укроп и подсолнечное масло.",
          "en": "Stir in the cucumber with its juice, the chopped dill and the sunflower oil."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Охладите час и подавайте с кубиком льда в каждой тарелке.",
          "en": "Chill it an hour and serve with an ice cube in each bowl."
        },
        "minutes": 8
      }
    ]
  },
  "rights": {
    "credit": "UniTools - theunitools.com",
    "sourceUrl": "https://theunitools.com/data/unitools-recipes-v1.json",
    "landingPage": "https://theunitools.com/en/data",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "changes": "Photo omitted; source-local references, method traces and review metadata added; quantities and method unchanged."
  },
  "review": {
    "productionApproved": false,
    "contentFidelityAcceptedByWriter": false,
    "catalogMappingReviewed": false,
    "dietIndependentlyReviewed": false,
    "crossContactKnown": false
  },
  "scopedReviewEvidence": {
    "scope": "Full bilingual ingredient objects including notes and every method read; no cooking test",
    "sourceCategory": "soup",
    "mealScope": "soup_only_no_invented_accompaniment",
    "limits": [
      "Bulgarian yoghurt700ml, cucumber500g, walnuts80g, garlic3clove, dill40g, sunfloweroil3tbsp, coldwater200ml and salttoTaste: all have explicit method references. Full ingredient notes all null, so no hidden soaked/precooked alternative.",
      "Cucumber liquid explicitly retained, not drained yield; yoghurt ml not changed to grams and sunflower oil not generic oil.",
      "Source optional-looking serving instruction ice cube in each bowl is unlisted water form; preserve method and flag separate ice requirement, no invented shopping amount or silent200ml increase. Writer may omit selectable release if ice detail cannot be represented.",
      "Cold dairy soup, not a heat kill-step. Use safely stored product, clean produce/utensils and keep cold; preparation does not certify product pasteurisation/allergens.",
      "Walnuts and yoghurt explicit foods, no nut-free/dairy-free/vegan label. Diet remains unknown pending product review; soup only, no invented bread side."
    ],
    "allergenAbsenceClaim": false
  }
};
