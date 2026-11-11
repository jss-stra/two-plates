export default {
  "id": "unitools:farikal",
  "kind": "source-native-fixed-base",
  "name": "Fårikål",
  "country": "NO",
  "cuisine": "Norwegian cuisine",
  "baseServings": 6,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": "nonveg",
  "dietClassificationBasis": {
    "proposedDietStatus": "nonveg_explicit_mutton",
    "notes": [
      "Base6 retained. Mutton1.5kg bone-in and cabbage1.5kg retained; no lamb substitution or edible yield assumed.",
      "Plain flour2tbsp is explicitly optional for body. Do not discard optionality, assume its grain, or claim allergen absence if omitted.",
      "Water500ml is explicit; method says halfway up, no higher. Both are preserved; pot dimensions can change level, so no universal hydration guarantee.",
      "Boiled potatoes1kg line is prepared form, not raw purchase conversion; source offers no separate potato boiling instructions.",
      "Source tenderness cue meat away from bone is retained; no safety certification from appearance/two-hour timing."
    ],
    "sourceSafetyNotIndependentlyCertified": true,
    "nutritionStatus": "unknown",
    "allergyReview": "limited_positive_findings_no_absence_or_cross_contact_clearance"
  },
  "sourceDietClaims": [],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 20,
    "cookMinutes": 130,
    "stepMinutesTotal": 142,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:farikal:001",
      "name": "Mutton on the bone",
      "quantity": 1.5,
      "unit": "kg",
      "note": {
        "ru": "крупными кусками",
        "en": "in large pieces"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "mutton",
        "name": {
          "ru": "Баранина на кости",
          "en": "Mutton on the bone"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "крупными кусками",
          "en": "in large pieces"
        }
      },
      "methodSteps": [
        1,
        2,
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:farikal:002",
      "name": "White cabbage",
      "quantity": 1.5,
      "unit": "kg",
      "note": {
        "ru": "крупными дольками",
        "en": "in large wedges"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "cabbage",
        "name": {
          "ru": "Белокочанная капуста",
          "en": "White cabbage"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "крупными дольками",
          "en": "in large wedges"
        }
      },
      "methodSteps": [
        2,
        4
      ]
    },
    {
      "lineRef": "src:unitools:farikal:003",
      "name": "Black peppercorns",
      "quantity": 2,
      "unit": "tbsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "peppercorns",
        "name": {
          "ru": "Чёрный перец горошком",
          "en": "Black peppercorns"
        },
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        1,
        2
      ]
    },
    {
      "lineRef": "src:unitools:farikal:004",
      "name": "Plain flour",
      "quantity": 2,
      "unit": "tbsp",
      "note": {
        "ru": "по желанию, для густоты",
        "en": "optional, for body"
      },
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
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "linear",
        "note": {
          "ru": "по желанию, для густоты",
          "en": "optional, for body"
        }
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:farikal:005",
      "name": "Water",
      "quantity": 500,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "water",
        "name": {
          "ru": "Вода",
          "en": "Water"
        },
        "quantity": 500,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        3
      ]
    },
    {
      "lineRef": "src:unitools:farikal:006",
      "name": "Boiled potatoes",
      "quantity": 1,
      "unit": "kg",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "potato",
        "name": {
          "ru": "Отварной картофель",
          "en": "Boiled potatoes"
        },
        "quantity": 1,
        "unit": "kg",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        5
      ]
    },
    {
      "lineRef": "src:unitools:farikal:007",
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
        2
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Уложите на дно кастрюли слой мяса жиром вниз, посолите и посыпьте горошинами перца.",
        "en": "Lay a layer of meat fat side down in the pot, season it and scatter peppercorns over."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Сверху слой капусты, снова соль и перец, если хотите — присыпьте мукой. Чередуйте слои, пока не кончится всё.",
        "en": "Add a layer of cabbage, more salt and pepper, and a dusting of flour if you want body. Alternate the layers until everything is used."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Влейте воду по стенке — она должна доходить до половины высоты, не выше.",
        "en": "Pour the water down the side; it should reach halfway up, no higher."
      },
      "minutes": 2
    },
    {
      "text": {
        "ru": "Доведите до кипения, накройте и томите два часа на самом слабом огне. Не перемешивайте: слои должны остаться слоями.",
        "en": "Bring it to the boil, cover and cook two hours on the lowest heat. Do not stir: the layers are meant to stay layers."
      },
      "minutes": 120
    },
    {
      "text": {
        "ru": "Готово, когда мясо отходит от кости. Подавайте с отварным картофелем, поливая бульоном из кастрюли.",
        "en": "It is done when the meat comes away from the bone. Serve with boiled potatoes, spooning broth from the pot over."
      },
      "minutes": 5
    }
  ],
  "sourceRecord": {
    "slug": "farikal",
    "country": "NO",
    "name": {
      "ru": "Форикол",
      "en": "Fårikål"
    },
    "nativeName": "Fårikål",
    "summary": {
      "ru": "Баранина с капустой, слоями, с целым перцем горошком. Всего четыре ингредиента и два часа времени.",
      "en": "Mutton and cabbage in layers with whole peppercorns. Four ingredients and two hours."
    },
    "category": "main",
    "diets": [],
    "difficulty": "easy",
    "baseServings": 6,
    "prepMinutes": 20,
    "cookMinutes": 130,
    "nutritionPerServing": {
      "calories": 640,
      "protein": 46,
      "fat": 34,
      "carbs": 34
    },
    "ingredients": [
      {
        "id": "mutton",
        "name": {
          "ru": "Баранина на кости",
          "en": "Mutton on the bone"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "крупными кусками",
          "en": "in large pieces"
        }
      },
      {
        "id": "cabbage",
        "name": {
          "ru": "Белокочанная капуста",
          "en": "White cabbage"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "крупными дольками",
          "en": "in large wedges"
        }
      },
      {
        "id": "peppercorns",
        "name": {
          "ru": "Чёрный перец горошком",
          "en": "Black peppercorns"
        },
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "flour",
        "name": {
          "ru": "Мука",
          "en": "Plain flour"
        },
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "linear",
        "note": {
          "ru": "по желанию, для густоты",
          "en": "optional, for body"
        }
      },
      {
        "id": "water",
        "name": {
          "ru": "Вода",
          "en": "Water"
        },
        "quantity": 500,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "potato",
        "name": {
          "ru": "Отварной картофель",
          "en": "Boiled potatoes"
        },
        "quantity": 1,
        "unit": "kg",
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
          "ru": "Уложите на дно кастрюли слой мяса жиром вниз, посолите и посыпьте горошинами перца.",
          "en": "Lay a layer of meat fat side down in the pot, season it and scatter peppercorns over."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Сверху слой капусты, снова соль и перец, если хотите — присыпьте мукой. Чередуйте слои, пока не кончится всё.",
          "en": "Add a layer of cabbage, more salt and pepper, and a dusting of flour if you want body. Alternate the layers until everything is used."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Влейте воду по стенке — она должна доходить до половины высоты, не выше.",
          "en": "Pour the water down the side; it should reach halfway up, no higher."
        },
        "minutes": 2
      },
      {
        "text": {
          "ru": "Доведите до кипения, накройте и томите два часа на самом слабом огне. Не перемешивайте: слои должны остаться слоями.",
          "en": "Bring it to the boil, cover and cook two hours on the lowest heat. Do not stir: the layers are meant to stay layers."
        },
        "minutes": 120
      },
      {
        "text": {
          "ru": "Готово, когда мясо отходит от кости. Подавайте с отварным картофелем, поливая бульоном из кастрюли.",
          "en": "It is done when the meat comes away from the bone. Serve with boiled potatoes, spooning broth from the pot over."
        },
        "minutes": 5
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
    "id": "unitools:farikal",
    "name": "Fårikål",
    "country": "NO",
    "baseServings": 6,
    "lines": [
      {
        "lineRef": "src:unitools:farikal:001",
        "raw": "Mutton on the bone",
        "qty": 1.5,
        "unit": "kg",
        "note": {
          "ru": "крупными кусками",
          "en": "in large pieces"
        },
        "scaling": "linear",
        "source": {
          "id": "mutton",
          "name": {
            "ru": "Баранина на кости",
            "en": "Mutton on the bone"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "крупными кусками",
            "en": "in large pieces"
          }
        },
        "tracedMethodStepNumbers": [
          1,
          2,
          4,
          5
        ],
        "ingredientId": null,
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:farikal:002",
        "raw": "White cabbage",
        "qty": 1.5,
        "unit": "kg",
        "note": {
          "ru": "крупными дольками",
          "en": "in large wedges"
        },
        "scaling": "linear",
        "source": {
          "id": "cabbage",
          "name": {
            "ru": "Белокочанная капуста",
            "en": "White cabbage"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "крупными дольками",
            "en": "in large wedges"
          }
        },
        "tracedMethodStepNumbers": [
          2,
          4
        ],
        "ingredientId": null,
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:farikal:003",
        "raw": "Black peppercorns",
        "qty": 2,
        "unit": "tbsp",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "peppercorns",
          "name": {
            "ru": "Чёрный перец горошком",
            "en": "Black peppercorns"
          },
          "quantity": 2,
          "unit": "tbsp",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          1,
          2
        ],
        "ingredientId": null,
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:farikal:004",
        "raw": "Plain flour",
        "qty": 2,
        "unit": "tbsp",
        "note": {
          "ru": "по желанию, для густоты",
          "en": "optional, for body"
        },
        "scaling": "linear",
        "source": {
          "id": "flour",
          "name": {
            "ru": "Мука",
            "en": "Plain flour"
          },
          "quantity": 2,
          "unit": "tbsp",
          "scaling": "linear",
          "note": {
            "ru": "по желанию, для густоты",
            "en": "optional, for body"
          }
        },
        "tracedMethodStepNumbers": [
          2
        ],
        "ingredientId": null,
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "productCompositionUnverified": true,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:farikal:005",
        "raw": "Water",
        "qty": 500,
        "unit": "ml",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "water",
          "name": {
            "ru": "Вода",
            "en": "Water"
          },
          "quantity": 500,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          3
        ],
        "ingredientId": null,
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:farikal:006",
        "raw": "Boiled potatoes",
        "qty": 1,
        "unit": "kg",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "potato",
          "name": {
            "ru": "Отварной картофель",
            "en": "Boiled potatoes"
          },
          "quantity": 1,
          "unit": "kg",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          5
        ],
        "ingredientId": null,
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:farikal:007",
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
          2
        ],
        "ingredientId": null,
        "nutrition": {
          "kcal": null,
          "p": null,
          "c": null,
          "f": null
        },
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      }
    ],
    "orderedSteps": [
      {
        "text": {
          "ru": "Уложите на дно кастрюли слой мяса жиром вниз, посолите и посыпьте горошинами перца.",
          "en": "Lay a layer of meat fat side down in the pot, season it and scatter peppercorns over."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Сверху слой капусты, снова соль и перец, если хотите — присыпьте мукой. Чередуйте слои, пока не кончится всё.",
          "en": "Add a layer of cabbage, more salt and pepper, and a dusting of flour if you want body. Alternate the layers until everything is used."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Влейте воду по стенке — она должна доходить до половины высоты, не выше.",
          "en": "Pour the water down the side; it should reach halfway up, no higher."
        },
        "minutes": 2
      },
      {
        "text": {
          "ru": "Доведите до кипения, накройте и томите два часа на самом слабом огне. Не перемешивайте: слои должны остаться слоями.",
          "en": "Bring it to the boil, cover and cook two hours on the lowest heat. Do not stir: the layers are meant to stay layers."
        },
        "minutes": 120
      },
      {
        "text": {
          "ru": "Готово, когда мясо отходит от кости. Подавайте с отварным картофелем, поливая бульоном из кастрюли.",
          "en": "It is done when the meat comes away from the bone. Serve with boiled potatoes, spooning broth from the pot over."
        },
        "minutes": 5
      }
    ],
    "sourceRecord": {
      "slug": "farikal",
      "country": "NO",
      "name": {
        "ru": "Форикол",
        "en": "Fårikål"
      },
      "nativeName": "Fårikål",
      "summary": {
        "ru": "Баранина с капустой, слоями, с целым перцем горошком. Всего четыре ингредиента и два часа времени.",
        "en": "Mutton and cabbage in layers with whole peppercorns. Four ingredients and two hours."
      },
      "category": "main",
      "diets": [],
      "difficulty": "easy",
      "baseServings": 6,
      "prepMinutes": 20,
      "cookMinutes": 130,
      "nutritionPerServing": {
        "calories": 640,
        "protein": 46,
        "fat": 34,
        "carbs": 34
      },
      "ingredients": [
        {
          "id": "mutton",
          "name": {
            "ru": "Баранина на кости",
            "en": "Mutton on the bone"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "крупными кусками",
            "en": "in large pieces"
          }
        },
        {
          "id": "cabbage",
          "name": {
            "ru": "Белокочанная капуста",
            "en": "White cabbage"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "крупными дольками",
            "en": "in large wedges"
          }
        },
        {
          "id": "peppercorns",
          "name": {
            "ru": "Чёрный перец горошком",
            "en": "Black peppercorns"
          },
          "quantity": 2,
          "unit": "tbsp",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "flour",
          "name": {
            "ru": "Мука",
            "en": "Plain flour"
          },
          "quantity": 2,
          "unit": "tbsp",
          "scaling": "linear",
          "note": {
            "ru": "по желанию, для густоты",
            "en": "optional, for body"
          }
        },
        {
          "id": "water",
          "name": {
            "ru": "Вода",
            "en": "Water"
          },
          "quantity": 500,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "potato",
          "name": {
            "ru": "Отварной картофель",
            "en": "Boiled potatoes"
          },
          "quantity": 1,
          "unit": "kg",
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
            "ru": "Уложите на дно кастрюли слой мяса жиром вниз, посолите и посыпьте горошинами перца.",
            "en": "Lay a layer of meat fat side down in the pot, season it and scatter peppercorns over."
          },
          "minutes": 5
        },
        {
          "text": {
            "ru": "Сверху слой капусты, снова соль и перец, если хотите — присыпьте мукой. Чередуйте слои, пока не кончится всё.",
            "en": "Add a layer of cabbage, more salt and pepper, and a dusting of flour if you want body. Alternate the layers until everything is used."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "Влейте воду по стенке — она должна доходить до половины высоты, не выше.",
            "en": "Pour the water down the side; it should reach halfway up, no higher."
          },
          "minutes": 2
        },
        {
          "text": {
            "ru": "Доведите до кипения, накройте и томите два часа на самом слабом огне. Не перемешивайте: слои должны остаться слоями.",
            "en": "Bring it to the boil, cover and cook two hours on the lowest heat. Do not stir: the layers are meant to stay layers."
          },
          "minutes": 120
        },
        {
          "text": {
            "ru": "Готово, когда мясо отходит от кости. Подавайте с отварным картофелем, поливая бульоном из кастрюли.",
            "en": "It is done when the meat comes away from the bone. Serve with boiled potatoes, spooning broth from the pot over."
          },
          "minutes": 5
        }
      ]
    },
    "sourceDietClaimsUnverified": [],
    "sourceCategory": "main",
    "mealReview": "Source main with explicit boiled-potato serving line; potatoes remain prepared boiled potatoes, not a guessed raw weight.",
    "recipeReview": {
      "proposedDietStatus": "nonveg_explicit_mutton",
      "notes": [
        "Base6 retained. Mutton1.5kg bone-in and cabbage1.5kg retained; no lamb substitution or edible yield assumed.",
        "Plain flour2tbsp is explicitly optional for body. Do not discard optionality, assume its grain, or claim allergen absence if omitted.",
        "Water500ml is explicit; method says halfway up, no higher. Both are preserved; pot dimensions can change level, so no universal hydration guarantee.",
        "Boiled potatoes1kg line is prepared form, not raw purchase conversion; source offers no separate potato boiling instructions.",
        "Source tenderness cue meat away from bone is retained; no safety certification from appearance/two-hour timing."
      ],
      "sourceSafetyNotIndependentlyCertified": true,
      "nutritionStatus": "unknown",
      "allergyReview": "limited_positive_findings_no_absence_or_cross_contact_clearance"
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
      "changes": "Photo omitted; namespaced IDs, traces and review metadata added; source ingredients/methods unchanged."
    }
  }
};
