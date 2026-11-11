export default {
  "id": "unitools:chakhokhbili",
  "kind": "source-native-fixed-base",
  "name": "Chakhokhbili",
  "country": "GE",
  "cuisine": "Georgian cuisine",
  "baseServings": 5,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": "nonveg",
  "dietClassificationBasis": {
    "proposedDietStatus": "nonveg_explicit_chicken",
    "notes": [
      "Base5 retained. Chicken1.5kg in pieces stays unspecified cut/bone composition; no breast or boneless conversion.",
      "Step1 dry browning followed by butter50g in step2 retained. Rendered chicken fat used, not assumed discarded.",
      "Tomatoes800g skinned/grated; consumed pulp yield unknown, no reduction of purchased quantity.",
      "Khmeli suneli1tbsp is an unspecified blend, not invented constituents. Separate coriander/purple basil/tarragon/parsley/garlic amounts all retained.",
      "Source30min stewing plus10min off-heat rest is not independent safety clearance. Separate NSW74C poultry guidance recorded for editor review; not silently inserted into source."
    ],
    "sourceSafetyNotIndependentlyCertified": true,
    "nutritionStatus": "unknown",
    "allergyReview": "limited_positive_findings_no_absence_or_cross_contact_clearance"
  },
  "sourceDietClaims": [
    "gluten-free"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 25,
    "cookMinutes": 50,
    "stepMinutesTotal": 97,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:chakhokhbili:001",
      "name": "Chicken",
      "quantity": 1.5,
      "unit": "kg",
      "note": {
        "ru": "кусками",
        "en": "in pieces"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "chicken",
        "name": {
          "ru": "Курица",
          "en": "Chicken"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "кусками",
          "en": "in pieces"
        }
      },
      "methodSteps": [
        1,
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:002",
      "name": "Onions",
      "quantity": 4,
      "unit": "piece",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "onion",
        "name": {
          "ru": "Лук",
          "en": "Onions"
        },
        "quantity": 4,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:003",
      "name": "Tomatoes",
      "quantity": 800,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "tomato",
        "name": {
          "ru": "Помидоры",
          "en": "Tomatoes"
        },
        "quantity": 800,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        3
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:004",
      "name": "Garlic",
      "quantity": 6,
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
        "quantity": 6,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6,
        7
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:005",
      "name": "Coriander",
      "quantity": 60,
      "unit": "g",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "cilantro",
        "name": {
          "ru": "Кинза",
          "en": "Coriander"
        },
        "quantity": 60,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6,
        7
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:006",
      "name": "Purple basil",
      "quantity": 40,
      "unit": "g",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "basil",
        "name": {
          "ru": "Базилик фиолетовый",
          "en": "Purple basil"
        },
        "quantity": 40,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6,
        7
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:007",
      "name": "Tarragon",
      "quantity": 30,
      "unit": "g",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "tarragon",
        "name": {
          "ru": "Эстрагон",
          "en": "Tarragon"
        },
        "quantity": 30,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6,
        7
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:008",
      "name": "Parsley",
      "quantity": 40,
      "unit": "g",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "parsley",
        "name": {
          "ru": "Петрушка",
          "en": "Parsley"
        },
        "quantity": 40,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6,
        7
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:009",
      "name": "Khmeli suneli",
      "quantity": 1,
      "unit": "tbsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "khmelisuneli",
        "name": {
          "ru": "Хмели-сунели",
          "en": "Khmeli suneli"
        },
        "quantity": 1,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        4
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:010",
      "name": "Butter",
      "quantity": 50,
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
        "quantity": 50,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:011",
      "name": "Chilli",
      "quantity": 1,
      "unit": "piece",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "chili",
        "name": {
          "ru": "Перец чили",
          "en": "Chilli"
        },
        "quantity": 1,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        4
      ]
    },
    {
      "lineRef": "src:unitools:chakhokhbili:012",
      "name": "Salt and pepper",
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
          "ru": "Соль и перец",
          "en": "Salt and pepper"
        },
        "quantity": null,
        "unit": "toTaste",
        "scaling": "fixed",
        "note": null
      },
      "methodSteps": [
        4
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Обжарьте куски курицы в сухой толстостенной кастрюле без масла до румяной корки.",
        "en": "Brown the chicken pieces in a dry heavy pot without fat, to a golden crust."
      },
      "minutes": 15
    },
    {
      "text": {
        "ru": "Выньте мясо, положите сливочное масло и обжарьте лук до мягкости в вытопившемся жире.",
        "en": "Lift out the meat, add the butter and soften the onion in the rendered fat."
      },
      "minutes": 12
    },
    {
      "text": {
        "ru": "Снимите с помидоров кожицу, натрите их на тёрке и добавьте к луку.",
        "en": "Skin the tomatoes, grate them and add them to the onion."
      },
      "minutes": 12
    },
    {
      "text": {
        "ru": "Верните курицу, посолите, добавьте хмели-сунели и целый чили и накройте крышкой.",
        "en": "Return the chicken, season, add the khmeli suneli and the whole chilli and cover the pot."
      },
      "minutes": 6
    },
    {
      "text": {
        "ru": "Тушите тридцать минут на слабом огне, ни разу не подливая воду.",
        "en": "Stew thirty minutes on a low heat, never adding water."
      },
      "minutes": 30
    },
    {
      "text": {
        "ru": "Порубите всю зелень и чеснок крупно, но не в кашу.",
        "en": "Chop all the herbs and the garlic coarsely, not to a paste."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Вмешайте зелень с чесноком, накройте, снимите с огня и дайте настояться десять минут.",
        "en": "Stir in the herbs and garlic, cover the pot, take it off the heat and let it stand ten minutes."
      },
      "minutes": 12
    }
  ],
  "sourceRecord": {
    "slug": "chakhokhbili",
    "country": "GE",
    "name": {
      "ru": "Чахохбили",
      "en": "Chakhokhbili"
    },
    "nativeName": "ჩახოხბილი",
    "summary": {
      "ru": "Курица, тушённая без воды в собственном соку с помидорами и горой свежей зелени.",
      "en": "Chicken stewed without water in its own juices with tomatoes and a mountain of fresh herbs."
    },
    "category": "main",
    "diets": [
      "gluten-free"
    ],
    "difficulty": "easy",
    "baseServings": 5,
    "prepMinutes": 25,
    "cookMinutes": 50,
    "nutritionPerServing": {
      "calories": 560,
      "protein": 46,
      "fat": 32,
      "carbs": 20
    },
    "ingredients": [
      {
        "id": "chicken",
        "name": {
          "ru": "Курица",
          "en": "Chicken"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "кусками",
          "en": "in pieces"
        }
      },
      {
        "id": "onion",
        "name": {
          "ru": "Лук",
          "en": "Onions"
        },
        "quantity": 4,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "tomato",
        "name": {
          "ru": "Помидоры",
          "en": "Tomatoes"
        },
        "quantity": 800,
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
        "quantity": 6,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "cilantro",
        "name": {
          "ru": "Кинза",
          "en": "Coriander"
        },
        "quantity": 60,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "basil",
        "name": {
          "ru": "Базилик фиолетовый",
          "en": "Purple basil"
        },
        "quantity": 40,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "tarragon",
        "name": {
          "ru": "Эстрагон",
          "en": "Tarragon"
        },
        "quantity": 30,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "parsley",
        "name": {
          "ru": "Петрушка",
          "en": "Parsley"
        },
        "quantity": 40,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "khmelisuneli",
        "name": {
          "ru": "Хмели-сунели",
          "en": "Khmeli suneli"
        },
        "quantity": 1,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "butter",
        "name": {
          "ru": "Сливочное масло",
          "en": "Butter"
        },
        "quantity": 50,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "chili",
        "name": {
          "ru": "Перец чили",
          "en": "Chilli"
        },
        "quantity": 1,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "salt",
        "name": {
          "ru": "Соль и перец",
          "en": "Salt and pepper"
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
          "ru": "Обжарьте куски курицы в сухой толстостенной кастрюле без масла до румяной корки.",
          "en": "Brown the chicken pieces in a dry heavy pot without fat, to a golden crust."
        },
        "minutes": 15
      },
      {
        "text": {
          "ru": "Выньте мясо, положите сливочное масло и обжарьте лук до мягкости в вытопившемся жире.",
          "en": "Lift out the meat, add the butter and soften the onion in the rendered fat."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Снимите с помидоров кожицу, натрите их на тёрке и добавьте к луку.",
          "en": "Skin the tomatoes, grate them and add them to the onion."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Верните курицу, посолите, добавьте хмели-сунели и целый чили и накройте крышкой.",
          "en": "Return the chicken, season, add the khmeli suneli and the whole chilli and cover the pot."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Тушите тридцать минут на слабом огне, ни разу не подливая воду.",
          "en": "Stew thirty minutes on a low heat, never adding water."
        },
        "minutes": 30
      },
      {
        "text": {
          "ru": "Порубите всю зелень и чеснок крупно, но не в кашу.",
          "en": "Chop all the herbs and the garlic coarsely, not to a paste."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Вмешайте зелень с чесноком, накройте, снимите с огня и дайте настояться десять минут.",
          "en": "Stir in the herbs and garlic, cover the pot, take it off the heat and let it stand ten minutes."
        },
        "minutes": 12
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
    "id": "unitools:chakhokhbili",
    "name": "Chakhokhbili",
    "country": "GE",
    "baseServings": 5,
    "lines": [
      {
        "lineRef": "src:unitools:chakhokhbili:001",
        "raw": "Chicken",
        "qty": 1.5,
        "unit": "kg",
        "note": {
          "ru": "кусками",
          "en": "in pieces"
        },
        "scaling": "linear",
        "source": {
          "id": "chicken",
          "name": {
            "ru": "Курица",
            "en": "Chicken"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "кусками",
            "en": "in pieces"
          }
        },
        "tracedMethodStepNumbers": [
          1,
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
        "lineRef": "src:unitools:chakhokhbili:002",
        "raw": "Onions",
        "qty": 4,
        "unit": "piece",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "onion",
          "name": {
            "ru": "Лук",
            "en": "Onions"
          },
          "quantity": 4,
          "unit": "piece",
          "scaling": "linear",
          "note": null
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
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:chakhokhbili:003",
        "raw": "Tomatoes",
        "qty": 800,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "tomato",
          "name": {
            "ru": "Помидоры",
            "en": "Tomatoes"
          },
          "quantity": 800,
          "unit": "g",
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
        "lineRef": "src:unitools:chakhokhbili:004",
        "raw": "Garlic",
        "qty": 6,
        "unit": "clove",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "garlic",
          "name": {
            "ru": "Чеснок",
            "en": "Garlic"
          },
          "quantity": 6,
          "unit": "clove",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          6,
          7
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
        "lineRef": "src:unitools:chakhokhbili:005",
        "raw": "Coriander",
        "qty": 60,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "cilantro",
          "name": {
            "ru": "Кинза",
            "en": "Coriander"
          },
          "quantity": 60,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          6,
          7
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
        "lineRef": "src:unitools:chakhokhbili:006",
        "raw": "Purple basil",
        "qty": 40,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "basil",
          "name": {
            "ru": "Базилик фиолетовый",
            "en": "Purple basil"
          },
          "quantity": 40,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          6,
          7
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
        "lineRef": "src:unitools:chakhokhbili:007",
        "raw": "Tarragon",
        "qty": 30,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "tarragon",
          "name": {
            "ru": "Эстрагон",
            "en": "Tarragon"
          },
          "quantity": 30,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          6,
          7
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
        "lineRef": "src:unitools:chakhokhbili:008",
        "raw": "Parsley",
        "qty": 40,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "parsley",
          "name": {
            "ru": "Петрушка",
            "en": "Parsley"
          },
          "quantity": 40,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          6,
          7
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
        "lineRef": "src:unitools:chakhokhbili:009",
        "raw": "Khmeli suneli",
        "qty": 1,
        "unit": "tbsp",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "khmelisuneli",
          "name": {
            "ru": "Хмели-сунели",
            "en": "Khmeli suneli"
          },
          "quantity": 1,
          "unit": "tbsp",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          4
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
        "lineRef": "src:unitools:chakhokhbili:010",
        "raw": "Butter",
        "qty": 50,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "butter",
          "name": {
            "ru": "Сливочное масло",
            "en": "Butter"
          },
          "quantity": 50,
          "unit": "g",
          "scaling": "linear",
          "note": null
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
        "productCompositionUnverified": false,
        "positiveAllergenEvidence": [
          {
            "category": "dairy",
            "basis": "Explicit butter line; retrieved FARE Milk lists butter",
            "sourceUrl": "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/milk"
          }
        ],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:chakhokhbili:011",
        "raw": "Chilli",
        "qty": 1,
        "unit": "piece",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "chili",
          "name": {
            "ru": "Перец чили",
            "en": "Chilli"
          },
          "quantity": 1,
          "unit": "piece",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
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
        "lineRef": "src:unitools:chakhokhbili:012",
        "raw": "Salt and pepper",
        "qty": null,
        "unit": "toTaste",
        "note": null,
        "scaling": "fixed",
        "source": {
          "id": "salt",
          "name": {
            "ru": "Соль и перец",
            "en": "Salt and pepper"
          },
          "quantity": null,
          "unit": "toTaste",
          "scaling": "fixed",
          "note": null
        },
        "tracedMethodStepNumbers": [
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
      }
    ],
    "orderedSteps": [
      {
        "text": {
          "ru": "Обжарьте куски курицы в сухой толстостенной кастрюле без масла до румяной корки.",
          "en": "Brown the chicken pieces in a dry heavy pot without fat, to a golden crust."
        },
        "minutes": 15
      },
      {
        "text": {
          "ru": "Выньте мясо, положите сливочное масло и обжарьте лук до мягкости в вытопившемся жире.",
          "en": "Lift out the meat, add the butter and soften the onion in the rendered fat."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Снимите с помидоров кожицу, натрите их на тёрке и добавьте к луку.",
          "en": "Skin the tomatoes, grate them and add them to the onion."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Верните курицу, посолите, добавьте хмели-сунели и целый чили и накройте крышкой.",
          "en": "Return the chicken, season, add the khmeli suneli and the whole chilli and cover the pot."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Тушите тридцать минут на слабом огне, ни разу не подливая воду.",
          "en": "Stew thirty minutes on a low heat, never adding water."
        },
        "minutes": 30
      },
      {
        "text": {
          "ru": "Порубите всю зелень и чеснок крупно, но не в кашу.",
          "en": "Chop all the herbs and the garlic coarsely, not to a paste."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Вмешайте зелень с чесноком, накройте, снимите с огня и дайте настояться десять минут.",
          "en": "Stir in the herbs and garlic, cover the pot, take it off the heat and let it stand ten minutes."
        },
        "minutes": 12
      }
    ],
    "sourceRecord": {
      "slug": "chakhokhbili",
      "country": "GE",
      "name": {
        "ru": "Чахохбили",
        "en": "Chakhokhbili"
      },
      "nativeName": "ჩახოხბილი",
      "summary": {
        "ru": "Курица, тушённая без воды в собственном соку с помидорами и горой свежей зелени.",
        "en": "Chicken stewed without water in its own juices with tomatoes and a mountain of fresh herbs."
      },
      "category": "main",
      "diets": [
        "gluten-free"
      ],
      "difficulty": "easy",
      "baseServings": 5,
      "prepMinutes": 25,
      "cookMinutes": 50,
      "nutritionPerServing": {
        "calories": 560,
        "protein": 46,
        "fat": 32,
        "carbs": 20
      },
      "ingredients": [
        {
          "id": "chicken",
          "name": {
            "ru": "Курица",
            "en": "Chicken"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "кусками",
            "en": "in pieces"
          }
        },
        {
          "id": "onion",
          "name": {
            "ru": "Лук",
            "en": "Onions"
          },
          "quantity": 4,
          "unit": "piece",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "tomato",
          "name": {
            "ru": "Помидоры",
            "en": "Tomatoes"
          },
          "quantity": 800,
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
          "quantity": 6,
          "unit": "clove",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "cilantro",
          "name": {
            "ru": "Кинза",
            "en": "Coriander"
          },
          "quantity": 60,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "basil",
          "name": {
            "ru": "Базилик фиолетовый",
            "en": "Purple basil"
          },
          "quantity": 40,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "tarragon",
          "name": {
            "ru": "Эстрагон",
            "en": "Tarragon"
          },
          "quantity": 30,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "parsley",
          "name": {
            "ru": "Петрушка",
            "en": "Parsley"
          },
          "quantity": 40,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "khmelisuneli",
          "name": {
            "ru": "Хмели-сунели",
            "en": "Khmeli suneli"
          },
          "quantity": 1,
          "unit": "tbsp",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "butter",
          "name": {
            "ru": "Сливочное масло",
            "en": "Butter"
          },
          "quantity": 50,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "chili",
          "name": {
            "ru": "Перец чили",
            "en": "Chilli"
          },
          "quantity": 1,
          "unit": "piece",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "salt",
          "name": {
            "ru": "Соль и перец",
            "en": "Salt and pepper"
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
            "ru": "Обжарьте куски курицы в сухой толстостенной кастрюле без масла до румяной корки.",
            "en": "Brown the chicken pieces in a dry heavy pot without fat, to a golden crust."
          },
          "minutes": 15
        },
        {
          "text": {
            "ru": "Выньте мясо, положите сливочное масло и обжарьте лук до мягкости в вытопившемся жире.",
            "en": "Lift out the meat, add the butter and soften the onion in the rendered fat."
          },
          "minutes": 12
        },
        {
          "text": {
            "ru": "Снимите с помидоров кожицу, натрите их на тёрке и добавьте к луку.",
            "en": "Skin the tomatoes, grate them and add them to the onion."
          },
          "minutes": 12
        },
        {
          "text": {
            "ru": "Верните курицу, посолите, добавьте хмели-сунели и целый чили и накройте крышкой.",
            "en": "Return the chicken, season, add the khmeli suneli and the whole chilli and cover the pot."
          },
          "minutes": 6
        },
        {
          "text": {
            "ru": "Тушите тридцать минут на слабом огне, ни разу не подливая воду.",
            "en": "Stew thirty minutes on a low heat, never adding water."
          },
          "minutes": 30
        },
        {
          "text": {
            "ru": "Порубите всю зелень и чеснок крупно, но не в кашу.",
            "en": "Chop all the herbs and the garlic coarsely, not to a paste."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "Вмешайте зелень с чесноком, накройте, снимите с огня и дайте настояться десять минут.",
            "en": "Stir in the herbs and garlic, cover the pot, take it off the heat and let it stand ten minutes."
          },
          "minutes": 12
        }
      ]
    },
    "sourceDietClaimsUnverified": [
      "gluten-free"
    ],
    "sourceCategory": "main",
    "mealReview": "Source main: chicken, tomatoes and herbs. No starch side is specified; nutrition-target balance not assessed.",
    "recipeReview": {
      "proposedDietStatus": "nonveg_explicit_chicken",
      "notes": [
        "Base5 retained. Chicken1.5kg in pieces stays unspecified cut/bone composition; no breast or boneless conversion.",
        "Step1 dry browning followed by butter50g in step2 retained. Rendered chicken fat used, not assumed discarded.",
        "Tomatoes800g skinned/grated; consumed pulp yield unknown, no reduction of purchased quantity.",
        "Khmeli suneli1tbsp is an unspecified blend, not invented constituents. Separate coriander/purple basil/tarragon/parsley/garlic amounts all retained.",
        "Source30min stewing plus10min off-heat rest is not independent safety clearance. Separate NSW74C poultry guidance recorded for editor review; not silently inserted into source."
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
