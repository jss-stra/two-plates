export default {
  "id": "unitools:kaesespaetzle",
  "kind": "source-native-fixed-base",
  "name": "Käsespätzle",
  "country": "DE",
  "cuisine": "German cuisine",
  "baseServings": 4,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": null,
  "dietClassificationBasis": {
    "contentTrace": "manual_source_lines_to_steps",
    "proposedDietStatus": "unknown_for_strict_vegetarian_cheese_formulation_unverified",
    "notes": [
      "Base4 retained. Eggs4piece retained, no assumed mass.",
      "Water OR milk150ml remains a choice; step1 names water, not authorization to eliminate milk alternative. Milk allergy must see cheese/butter independently.",
      "Emmental OR Bergkase250g remains a choice, not a cheddar/gruyere proxy.",
      "Step3 boiling salted water is process medium with unspecified pot volume; no purchased quantity invented.",
      "Step5 green salad/vinegar dressing is a classic suggested side with no quantities, not counted as a mandatory meal ingredient or invented grocery list. Dish itself source-category main."
    ],
    "nutritionStatus": "unknown",
    "allergyReview": "positive_findings_only_no_safe_or_free_claim",
    "crossContactUnverified": true,
    "sourceSafetyNotIndependentlyCertified": true
  },
  "sourceDietClaims": [
    "vegetarian"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 25,
    "cookMinutes": 30,
    "stepMinutesTotal": 41,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:kaesespaetzle:001",
      "name": "Plain flour",
      "quantity": 400,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "flour",
        "name": {
          "ru": "Мука",
          "en": "Plain flour"
        },
        "quantity": 400,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1
      ]
    },
    {
      "lineRef": "src:unitools:kaesespaetzle:002",
      "name": "Eggs",
      "quantity": 4,
      "unit": "piece",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "eggs",
        "name": {
          "ru": "Яйца",
          "en": "Eggs"
        },
        "quantity": 4,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1
      ]
    },
    {
      "lineRef": "src:unitools:kaesespaetzle:003",
      "name": "Water or milk",
      "quantity": 150,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "water",
        "name": {
          "ru": "Вода или молоко",
          "en": "Water or milk"
        },
        "quantity": 150,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1
      ],
      "methodTraceStatus": "partial_alternative_water_only",
      "methodTraceNote": "Source dough method names water only, not milk; no milk instructions invented."
    },
    {
      "lineRef": "src:unitools:kaesespaetzle:004",
      "name": "Emmental or Bergkäse",
      "quantity": 250,
      "unit": "g",
      "note": {
        "ru": "натереть",
        "en": "grated"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "cheese",
        "name": {
          "ru": "Эмменталь или бергкезе",
          "en": "Emmental or Bergkäse"
        },
        "quantity": 250,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "натереть",
          "en": "grated"
        }
      },
      "methodSteps": [
        4
      ]
    },
    {
      "lineRef": "src:unitools:kaesespaetzle:005",
      "name": "Onions",
      "quantity": 3,
      "unit": "piece",
      "note": {
        "ru": "тонкими кольцами",
        "en": "in thin rings"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "onions",
        "name": {
          "ru": "Лук",
          "en": "Onions"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "linear",
        "note": {
          "ru": "тонкими кольцами",
          "en": "in thin rings"
        }
      },
      "methodSteps": [
        2,
        5
      ]
    },
    {
      "lineRef": "src:unitools:kaesespaetzle:006",
      "name": "Butter",
      "quantity": 60,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "butter",
        "name": {
          "ru": "Сливочное масло",
          "en": "Butter"
        },
        "quantity": 60,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:kaesespaetzle:007",
      "name": "Nutmeg",
      "quantity": 1,
      "unit": "pinch",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "nutmeg",
        "name": {
          "ru": "Мускатный орех",
          "en": "Nutmeg"
        },
        "quantity": 1,
        "unit": "pinch",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        1
      ]
    },
    {
      "lineRef": "src:unitools:kaesespaetzle:008",
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
        "ru": "Смешайте муку, яйца, воду, соль и мускат и бейте тесто ложкой минут пять, пока по поверхности не пойдут пузыри и оно не начнёт тянуться за ложкой.",
        "en": "Mix the flour, eggs, water, salt and nutmeg and beat the dough with a spoon for a good five minutes, until bubbles rise and it starts to string off the spoon."
      },
      "minutes": 8
    },
    {
      "text": {
        "ru": "Пока тесто отдыхает, обжарьте лук в масле на среднем огне до тёмно-золотого цвета. Это двадцать минут, а не пять: за это время сахар в луке карамелизуется.",
        "en": "While the dough rests, fry the onion in butter over medium heat until deep gold. That is twenty minutes, not five — the sugars need the time to caramelise."
      },
      "minutes": 20
    },
    {
      "text": {
        "ru": "Продавите тесто в кипящую подсоленную воду через шпецле-тёрку или дуршлаг с крупными отверстиями. Готовые шпецле всплывают через минуту — вынимайте шумовкой.",
        "en": "Press the dough into boiling salted water through a spätzle grater or a wide-holed colander. They float within a minute; lift them out with a slotted spoon."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Выкладывайте в горячую форму слоями: шпецле, сыр, шпецле, сыр. Тепло самой лапши расплавит сыр — духовка не нужна.",
        "en": "Layer them into a warm dish: spätzle, cheese, spätzle, cheese. The heat of the noodles melts it; no oven is needed."
      },
      "minutes": 3
    },
    {
      "text": {
        "ru": "Засыпьте жареным луком и подавайте сразу. Классический гарнир — зелёный салат с уксусной заправкой, и он здесь не украшение, а противовес.",
        "en": "Bury it under the fried onion and serve at once. The classic side is a green salad with a vinegar dressing, and it is a counterweight rather than a garnish."
      },
      "minutes": null
    }
  ],
  "sourceRecord": {
    "slug": "kaesespaetzle",
    "country": "DE",
    "name": {
      "ru": "Кезешпецле",
      "en": "Käsespätzle"
    },
    "nativeName": "Käsespätzle",
    "summary": {
      "ru": "Швабская яичная лапша, слоями пересыпанная сыром и засыпанная жареным луком.",
      "en": "Swabian egg noodles layered with cheese and buried under fried onion."
    },
    "category": "main",
    "diets": [
      "vegetarian"
    ],
    "difficulty": "medium",
    "baseServings": 4,
    "prepMinutes": 25,
    "cookMinutes": 30,
    "nutritionPerServing": {
      "calories": 720,
      "protein": 30,
      "fat": 32,
      "carbs": 78
    },
    "ingredients": [
      {
        "id": "flour",
        "name": {
          "ru": "Мука",
          "en": "Plain flour"
        },
        "quantity": 400,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "eggs",
        "name": {
          "ru": "Яйца",
          "en": "Eggs"
        },
        "quantity": 4,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "water",
        "name": {
          "ru": "Вода или молоко",
          "en": "Water or milk"
        },
        "quantity": 150,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "cheese",
        "name": {
          "ru": "Эмменталь или бергкезе",
          "en": "Emmental or Bergkäse"
        },
        "quantity": 250,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "натереть",
          "en": "grated"
        }
      },
      {
        "id": "onions",
        "name": {
          "ru": "Лук",
          "en": "Onions"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "linear",
        "note": {
          "ru": "тонкими кольцами",
          "en": "in thin rings"
        }
      },
      {
        "id": "butter",
        "name": {
          "ru": "Сливочное масло",
          "en": "Butter"
        },
        "quantity": 60,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "nutmeg",
        "name": {
          "ru": "Мускатный орех",
          "en": "Nutmeg"
        },
        "quantity": 1,
        "unit": "pinch",
        "scaling": "damped",
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
          "ru": "Смешайте муку, яйца, воду, соль и мускат и бейте тесто ложкой минут пять, пока по поверхности не пойдут пузыри и оно не начнёт тянуться за ложкой.",
          "en": "Mix the flour, eggs, water, salt and nutmeg and beat the dough with a spoon for a good five minutes, until bubbles rise and it starts to string off the spoon."
        },
        "minutes": 8
      },
      {
        "text": {
          "ru": "Пока тесто отдыхает, обжарьте лук в масле на среднем огне до тёмно-золотого цвета. Это двадцать минут, а не пять: за это время сахар в луке карамелизуется.",
          "en": "While the dough rests, fry the onion in butter over medium heat until deep gold. That is twenty minutes, not five — the sugars need the time to caramelise."
        },
        "minutes": 20
      },
      {
        "text": {
          "ru": "Продавите тесто в кипящую подсоленную воду через шпецле-тёрку или дуршлаг с крупными отверстиями. Готовые шпецле всплывают через минуту — вынимайте шумовкой.",
          "en": "Press the dough into boiling salted water through a spätzle grater or a wide-holed colander. They float within a minute; lift them out with a slotted spoon."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Выкладывайте в горячую форму слоями: шпецле, сыр, шпецле, сыр. Тепло самой лапши расплавит сыр — духовка не нужна.",
          "en": "Layer them into a warm dish: spätzle, cheese, spätzle, cheese. The heat of the noodles melts it; no oven is needed."
        },
        "minutes": 3
      },
      {
        "text": {
          "ru": "Засыпьте жареным луком и подавайте сразу. Классический гарнир — зелёный салат с уксусной заправкой, и он здесь не украшение, а противовес.",
          "en": "Bury it under the fried onion and serve at once. The classic side is a green salad with a vinegar dressing, and it is a counterweight rather than a garnish."
        },
        "minutes": null
      }
    ]
  },
  "rights": {
    "credit": "UniTools - theunitools.com",
    "sourceUrl": "https://theunitools.com/data/unitools-recipes-v1.json",
    "landingPage": "https://theunitools.com/en/data",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "changes": "Photo omitted; source-local references, method traces and review metadata added; quantities and method unchanged. Two Plates marked partial method coverage: Source dough method names water only, not milk; no milk instructions invented."
  },
  "review": {
    "productionApproved": false,
    "contentFidelityAcceptedByWriter": false,
    "catalogMappingReviewed": false,
    "dietIndependentlyReviewed": false,
    "crossContactKnown": false
  },
  "scopedReviewEvidence": {
    "id": "unitools:kaesespaetzle",
    "name": "Käsespätzle",
    "cuisine": "German cuisine",
    "country": "DE",
    "baseServings": 4,
    "sourceTimes": {
      "prepMinutes": 25,
      "cookMinutes": 30,
      "guaranteedElapsedTime": false
    },
    "sourceDietClaimsUnverified": [
      "vegetarian"
    ],
    "sourceCategory": "main",
    "mealReview": "Source main: made-from-scratch egg noodles with cheese and onions; optional salad suggestion not padded into counted ingredients.",
    "lines": [
      {
        "lineRef": "src:unitools:kaesespaetzle:001",
        "raw": "Plain flour",
        "qty": 400,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "flour",
          "name": {
            "ru": "Мука",
            "en": "Plain flour"
          },
          "quantity": 400,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          1
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": true,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:kaesespaetzle:002",
        "raw": "Eggs",
        "qty": 4,
        "unit": "piece",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "eggs",
          "name": {
            "ru": "Яйца",
            "en": "Eggs"
          },
          "quantity": 4,
          "unit": "piece",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          1
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [
          {
            "category": "egg",
            "basis": "Explicit Eggs line; retrieved FARE names this food class for allergen avoidance",
            "sourceUrl": "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/egg"
          }
        ],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:kaesespaetzle:003",
        "raw": "Water or milk",
        "qty": 150,
        "unit": "ml",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "water",
          "name": {
            "ru": "Вода или молоко",
            "en": "Water or milk"
          },
          "quantity": 150,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          1
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": true,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:kaesespaetzle:004",
        "raw": "Emmental or Bergkäse",
        "qty": 250,
        "unit": "g",
        "note": {
          "ru": "натереть",
          "en": "grated"
        },
        "scaling": "linear",
        "source": {
          "id": "cheese",
          "name": {
            "ru": "Эмменталь или бергкезе",
            "en": "Emmental or Bergkäse"
          },
          "quantity": 250,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "натереть",
            "en": "grated"
          }
        },
        "tracedMethodStepNumbers": [
          4
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [
          {
            "category": "dairy",
            "basis": "Explicit Emmental or Bergkäse line; retrieved FARE names this food class for allergen avoidance",
            "sourceUrl": "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/milk"
          }
        ],
        "productCompositionUnverified": true,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:kaesespaetzle:005",
        "raw": "Onions",
        "qty": 3,
        "unit": "piece",
        "note": {
          "ru": "тонкими кольцами",
          "en": "in thin rings"
        },
        "scaling": "linear",
        "source": {
          "id": "onions",
          "name": {
            "ru": "Лук",
            "en": "Onions"
          },
          "quantity": 3,
          "unit": "piece",
          "scaling": "linear",
          "note": {
            "ru": "тонкими кольцами",
            "en": "in thin rings"
          }
        },
        "tracedMethodStepNumbers": [
          2,
          5
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:kaesespaetzle:006",
        "raw": "Butter",
        "qty": 60,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "butter",
          "name": {
            "ru": "Сливочное масло",
            "en": "Butter"
          },
          "quantity": 60,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          2
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [
          {
            "category": "dairy",
            "basis": "Explicit Butter line; retrieved FARE names this food class for allergen avoidance",
            "sourceUrl": "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/milk"
          }
        ],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:kaesespaetzle:007",
        "raw": "Nutmeg",
        "qty": 1,
        "unit": "pinch",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "nutmeg",
          "name": {
            "ru": "Мускатный орех",
            "en": "Nutmeg"
          },
          "quantity": 1,
          "unit": "pinch",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          1
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:kaesespaetzle:008",
        "raw": "Salt",
        "qty": null,
        "unit": "toTaste",
        "note": null,
        "scaling": "fixed",
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
        "tracedMethodStepNumbers": [
          1,
          3
        ],
        "ingredientId": null,
        "identityStatus": "source_exact_no_catalog_substitution",
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      }
    ],
    "orderedSteps": [
      {
        "text": {
          "ru": "Смешайте муку, яйца, воду, соль и мускат и бейте тесто ложкой минут пять, пока по поверхности не пойдут пузыри и оно не начнёт тянуться за ложкой.",
          "en": "Mix the flour, eggs, water, salt and nutmeg and beat the dough with a spoon for a good five minutes, until bubbles rise and it starts to string off the spoon."
        },
        "minutes": 8
      },
      {
        "text": {
          "ru": "Пока тесто отдыхает, обжарьте лук в масле на среднем огне до тёмно-золотого цвета. Это двадцать минут, а не пять: за это время сахар в луке карамелизуется.",
          "en": "While the dough rests, fry the onion in butter over medium heat until deep gold. That is twenty minutes, not five — the sugars need the time to caramelise."
        },
        "minutes": 20
      },
      {
        "text": {
          "ru": "Продавите тесто в кипящую подсоленную воду через шпецле-тёрку или дуршлаг с крупными отверстиями. Готовые шпецле всплывают через минуту — вынимайте шумовкой.",
          "en": "Press the dough into boiling salted water through a spätzle grater or a wide-holed colander. They float within a minute; lift them out with a slotted spoon."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Выкладывайте в горячую форму слоями: шпецле, сыр, шпецле, сыр. Тепло самой лапши расплавит сыр — духовка не нужна.",
          "en": "Layer them into a warm dish: spätzle, cheese, spätzle, cheese. The heat of the noodles melts it; no oven is needed."
        },
        "minutes": 3
      },
      {
        "text": {
          "ru": "Засыпьте жареным луком и подавайте сразу. Классический гарнир — зелёный салат с уксусной заправкой, и он здесь не украшение, а противовес.",
          "en": "Bury it under the fried onion and serve at once. The classic side is a green salad with a vinegar dressing, and it is a counterweight rather than a garnish."
        },
        "minutes": null
      }
    ],
    "sourceRecord": {
      "slug": "kaesespaetzle",
      "country": "DE",
      "name": {
        "ru": "Кезешпецле",
        "en": "Käsespätzle"
      },
      "nativeName": "Käsespätzle",
      "summary": {
        "ru": "Швабская яичная лапша, слоями пересыпанная сыром и засыпанная жареным луком.",
        "en": "Swabian egg noodles layered with cheese and buried under fried onion."
      },
      "category": "main",
      "diets": [
        "vegetarian"
      ],
      "difficulty": "medium",
      "baseServings": 4,
      "prepMinutes": 25,
      "cookMinutes": 30,
      "nutritionPerServing": {
        "calories": 720,
        "protein": 30,
        "fat": 32,
        "carbs": 78
      },
      "ingredients": [
        {
          "id": "flour",
          "name": {
            "ru": "Мука",
            "en": "Plain flour"
          },
          "quantity": 400,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "eggs",
          "name": {
            "ru": "Яйца",
            "en": "Eggs"
          },
          "quantity": 4,
          "unit": "piece",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "water",
          "name": {
            "ru": "Вода или молоко",
            "en": "Water or milk"
          },
          "quantity": 150,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "cheese",
          "name": {
            "ru": "Эмменталь или бергкезе",
            "en": "Emmental or Bergkäse"
          },
          "quantity": 250,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "натереть",
            "en": "grated"
          }
        },
        {
          "id": "onions",
          "name": {
            "ru": "Лук",
            "en": "Onions"
          },
          "quantity": 3,
          "unit": "piece",
          "scaling": "linear",
          "note": {
            "ru": "тонкими кольцами",
            "en": "in thin rings"
          }
        },
        {
          "id": "butter",
          "name": {
            "ru": "Сливочное масло",
            "en": "Butter"
          },
          "quantity": 60,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "nutmeg",
          "name": {
            "ru": "Мускатный орех",
            "en": "Nutmeg"
          },
          "quantity": 1,
          "unit": "pinch",
          "scaling": "damped",
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
            "ru": "Смешайте муку, яйца, воду, соль и мускат и бейте тесто ложкой минут пять, пока по поверхности не пойдут пузыри и оно не начнёт тянуться за ложкой.",
            "en": "Mix the flour, eggs, water, salt and nutmeg and beat the dough with a spoon for a good five minutes, until bubbles rise and it starts to string off the spoon."
          },
          "minutes": 8
        },
        {
          "text": {
            "ru": "Пока тесто отдыхает, обжарьте лук в масле на среднем огне до тёмно-золотого цвета. Это двадцать минут, а не пять: за это время сахар в луке карамелизуется.",
            "en": "While the dough rests, fry the onion in butter over medium heat until deep gold. That is twenty minutes, not five — the sugars need the time to caramelise."
          },
          "minutes": 20
        },
        {
          "text": {
            "ru": "Продавите тесто в кипящую подсоленную воду через шпецле-тёрку или дуршлаг с крупными отверстиями. Готовые шпецле всплывают через минуту — вынимайте шумовкой.",
            "en": "Press the dough into boiling salted water through a spätzle grater or a wide-holed colander. They float within a minute; lift them out with a slotted spoon."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "Выкладывайте в горячую форму слоями: шпецле, сыр, шпецле, сыр. Тепло самой лапши расплавит сыр — духовка не нужна.",
            "en": "Layer them into a warm dish: spätzle, cheese, spätzle, cheese. The heat of the noodles melts it; no oven is needed."
          },
          "minutes": 3
        },
        {
          "text": {
            "ru": "Засыпьте жареным луком и подавайте сразу. Классический гарнир — зелёный салат с уксусной заправкой, и он здесь не украшение, а противовес.",
            "en": "Bury it under the fried onion and serve at once. The classic side is a green salad with a vinegar dressing, and it is a counterweight rather than a garnish."
          },
          "minutes": null
        }
      ]
    },
    "recipeReview": {
      "contentTrace": "manual_source_lines_to_steps",
      "proposedDietStatus": "unknown_for_strict_vegetarian_cheese_formulation_unverified",
      "notes": [
        "Base4 retained. Eggs4piece retained, no assumed mass.",
        "Water OR milk150ml remains a choice; step1 names water, not authorization to eliminate milk alternative. Milk allergy must see cheese/butter independently.",
        "Emmental OR Bergkase250g remains a choice, not a cheddar/gruyere proxy.",
        "Step3 boiling salted water is process medium with unspecified pot volume; no purchased quantity invented.",
        "Step5 green salad/vinegar dressing is a classic suggested side with no quantities, not counted as a mandatory meal ingredient or invented grocery list. Dish itself source-category main."
      ],
      "nutritionStatus": "unknown",
      "allergyReview": "positive_findings_only_no_safe_or_free_claim",
      "crossContactUnverified": true,
      "sourceSafetyNotIndependentlyCertified": true
    },
    "pendingReview": true,
    "plannerEligible": false,
    "groceriesEligible": false,
    "manualAddEligible": false,
    "rights": {
      "credit": "UniTools - theunitools.com",
      "sourceUrl": "https://theunitools.com/data/unitools-recipes-v1.json",
      "landingPage": "https://theunitools.com/en/data",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "changes": "Selection, photo omission, namespaced line references and review metadata only; original source lines/methods retained."
    }
  }
};
