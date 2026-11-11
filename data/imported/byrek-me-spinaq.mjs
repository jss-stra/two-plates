export default {
  "id": "unitools:byrek-me-spinaq",
  "kind": "source-native-fixed-base",
  "name": "Byrek me spinaq",
  "country": "AL",
  "cuisine": "Albanian cuisine",
  "baseServings": 8,
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
    "proposedDietStatus": "unknown_for_strict_vegetarian_cheese_and_pastry_formulation_unverified",
    "notes": [
      "Base8 retained; source filo500g remains prepared pastry, not assumed sheet size/count or butter recipe.",
      "Method calls for 3 bottom sheets, 2 between fillings and3 top sheets; source500g is purchase amount, sheet dimensions unspecified. Preserve both, do not invent a sheet-weight conversion.",
      "Spinach1kg input is blanched/drained/wrung in step1. Consumed weight/nutrients not equated to purchased raw mass.",
      "Brined white cheese400g remains unspecified cheese, not forced to feta. No milk species, salt percentage or fat-content assumption.",
      "Olive oil180ml retained, no generic oil blend or absorbed fraction.",
      "Spring onion6piece retains damped flag but base serving only; no scaling formula guessed."
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
    "prepMinutes": 35,
    "cookMinutes": 45,
    "stepMinutesTotal": 95,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:byrek-me-spinaq:001",
      "name": "Filo pastry",
      "quantity": 500,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "filo",
        "name": {
          "ru": "Тесто фило",
          "en": "Filo pastry"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        3,
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:byrek-me-spinaq:002",
      "name": "Spinach",
      "quantity": 1,
      "unit": "kg",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "spinach",
        "name": {
          "ru": "Шпинат",
          "en": "Spinach"
        },
        "quantity": 1,
        "unit": "kg",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        2
      ]
    },
    {
      "lineRef": "src:unitools:byrek-me-spinaq:003",
      "name": "Brined white cheese",
      "quantity": 400,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "feta",
        "name": {
          "ru": "Брынза",
          "en": "Brined white cheese"
        },
        "quantity": 400,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2,
        4
      ]
    },
    {
      "lineRef": "src:unitools:byrek-me-spinaq:004",
      "name": "Spring onions",
      "quantity": 6,
      "unit": "piece",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "spring",
        "name": {
          "ru": "Зелёный лук",
          "en": "Spring onions"
        },
        "quantity": 6,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:byrek-me-spinaq:005",
      "name": "Olive oil",
      "quantity": 180,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "oliveoil",
        "name": {
          "ru": "Оливковое масло",
          "en": "Olive oil"
        },
        "quantity": 180,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        3,
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:byrek-me-spinaq:006",
      "name": "Dill",
      "quantity": 30,
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
        "quantity": 30,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:byrek-me-spinaq:007",
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
        2
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Ошпарьте шпинат кипятком, откиньте и отожмите руками досуха.",
        "en": "Scald the spinach with boiling water, drain it and wring it out dry by hand."
      },
      "minutes": 12
    },
    {
      "text": {
        "ru": "Нарежьте шпинат, смешайте с раскрошенной брынзой, зелёным луком, укропом и перцем. Соль добавляйте осторожно — брынза солёная.",
        "en": "Chop the spinach and mix it with the crumbled cheese, spring onion, dill and pepper. Salt cautiously; the cheese is salty."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Смажьте форму маслом и уложите три листа фило, промазывая каждый.",
        "en": "Oil a tin and lay in three sheets of filo, brushing each one."
      },
      "minutes": 6
    },
    {
      "text": {
        "ru": "Распределите треть начинки, накройте двумя листами с маслом и повторите ещё дважды.",
        "en": "Spread a third of the filling, cover with two oiled sheets and repeat twice more."
      },
      "minutes": 12
    },
    {
      "text": {
        "ru": "Закройте тремя листами сверху, подверните края внутрь и щедро смажьте маслом.",
        "en": "Finish with three sheets on top, tuck the edges in and brush generously with oil."
      },
      "minutes": 6
    },
    {
      "text": {
        "ru": "Нарежьте квадратами до низа острым ножом — резать после выпечки не получится.",
        "en": "Score it into squares down to the base with a sharp knife; cutting it after baking will not work."
      },
      "minutes": 4
    },
    {
      "text": {
        "ru": "Пеките при 190 °C сорок пять минут до тёмно-золотой хрустящей корки.",
        "en": "Bake at 190 °C for forty-five minutes, to a deep golden crisp crust."
      },
      "minutes": 45
    }
  ],
  "sourceRecord": {
    "slug": "byrek-me-spinaq",
    "country": "AL",
    "name": {
      "ru": "Бюрек со шпинатом",
      "en": "Byrek me spinaq"
    },
    "nativeName": "Byrek me spinaq",
    "summary": {
      "ru": "Пирог из тонкого теста со шпинатом и брынзой, слоями, залитыми маслом.",
      "en": "A pie of thin pastry layered with spinach and brined cheese, each layer soaked in oil."
    },
    "category": "main",
    "diets": [
      "vegetarian"
    ],
    "difficulty": "easy",
    "baseServings": 8,
    "prepMinutes": 35,
    "cookMinutes": 45,
    "nutritionPerServing": {
      "calories": 480,
      "protein": 16,
      "fat": 30,
      "carbs": 38
    },
    "ingredients": [
      {
        "id": "filo",
        "name": {
          "ru": "Тесто фило",
          "en": "Filo pastry"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "spinach",
        "name": {
          "ru": "Шпинат",
          "en": "Spinach"
        },
        "quantity": 1,
        "unit": "kg",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "feta",
        "name": {
          "ru": "Брынза",
          "en": "Brined white cheese"
        },
        "quantity": 400,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "spring",
        "name": {
          "ru": "Зелёный лук",
          "en": "Spring onions"
        },
        "quantity": 6,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "oliveoil",
        "name": {
          "ru": "Оливковое масло",
          "en": "Olive oil"
        },
        "quantity": 180,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "dill",
        "name": {
          "ru": "Укроп",
          "en": "Dill"
        },
        "quantity": 30,
        "unit": "g",
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
          "ru": "Ошпарьте шпинат кипятком, откиньте и отожмите руками досуха.",
          "en": "Scald the spinach with boiling water, drain it and wring it out dry by hand."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Нарежьте шпинат, смешайте с раскрошенной брынзой, зелёным луком, укропом и перцем. Соль добавляйте осторожно — брынза солёная.",
          "en": "Chop the spinach and mix it with the crumbled cheese, spring onion, dill and pepper. Salt cautiously; the cheese is salty."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Смажьте форму маслом и уложите три листа фило, промазывая каждый.",
          "en": "Oil a tin and lay in three sheets of filo, brushing each one."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Распределите треть начинки, накройте двумя листами с маслом и повторите ещё дважды.",
          "en": "Spread a third of the filling, cover with two oiled sheets and repeat twice more."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Закройте тремя листами сверху, подверните края внутрь и щедро смажьте маслом.",
          "en": "Finish with three sheets on top, tuck the edges in and brush generously with oil."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Нарежьте квадратами до низа острым ножом — резать после выпечки не получится.",
          "en": "Score it into squares down to the base with a sharp knife; cutting it after baking will not work."
        },
        "minutes": 4
      },
      {
        "text": {
          "ru": "Пеките при 190 °C сорок пять минут до тёмно-золотой хрустящей корки.",
          "en": "Bake at 190 °C for forty-five minutes, to a deep golden crisp crust."
        },
        "minutes": 45
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
    "id": "unitools:byrek-me-spinaq",
    "name": "Byrek me spinaq",
    "cuisine": "Albanian cuisine",
    "country": "AL",
    "baseServings": 8,
    "sourceTimes": {
      "prepMinutes": 35,
      "cookMinutes": 45,
      "guaranteedElapsedTime": false
    },
    "sourceDietClaimsUnverified": [
      "vegetarian"
    ],
    "sourceCategory": "main",
    "mealReview": "Source main: spinach and brined-cheese filo pie. No invented recipe for packaged pastry.",
    "lines": [
      {
        "lineRef": "src:unitools:byrek-me-spinaq:001",
        "raw": "Filo pastry",
        "qty": 500,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "filo",
          "name": {
            "ru": "Тесто фило",
            "en": "Filo pastry"
          },
          "quantity": 500,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          3,
          4,
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
        "productCompositionUnverified": true,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:byrek-me-spinaq:002",
        "raw": "Spinach",
        "qty": 1,
        "unit": "kg",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "spinach",
          "name": {
            "ru": "Шпинат",
            "en": "Spinach"
          },
          "quantity": 1,
          "unit": "kg",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          1,
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
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:byrek-me-spinaq:003",
        "raw": "Brined white cheese",
        "qty": 400,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "feta",
          "name": {
            "ru": "Брынза",
            "en": "Brined white cheese"
          },
          "quantity": 400,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          2,
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
            "basis": "Explicit Brined white cheese line; retrieved FARE names this food class for allergen avoidance",
            "sourceUrl": "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/milk"
          }
        ],
        "productCompositionUnverified": true,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:byrek-me-spinaq:004",
        "raw": "Spring onions",
        "qty": 6,
        "unit": "piece",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "spring",
          "name": {
            "ru": "Зелёный лук",
            "en": "Spring onions"
          },
          "quantity": 6,
          "unit": "piece",
          "scaling": "damped",
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
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:byrek-me-spinaq:005",
        "raw": "Olive oil",
        "qty": 180,
        "unit": "ml",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "oliveoil",
          "name": {
            "ru": "Оливковое масло",
            "en": "Olive oil"
          },
          "quantity": 180,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          3,
          4,
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
        "lineRef": "src:unitools:byrek-me-spinaq:006",
        "raw": "Dill",
        "qty": 30,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "dill",
          "name": {
            "ru": "Укроп",
            "en": "Dill"
          },
          "quantity": 30,
          "unit": "g",
          "scaling": "damped",
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
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:byrek-me-spinaq:007",
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
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      }
    ],
    "orderedSteps": [
      {
        "text": {
          "ru": "Ошпарьте шпинат кипятком, откиньте и отожмите руками досуха.",
          "en": "Scald the spinach with boiling water, drain it and wring it out dry by hand."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Нарежьте шпинат, смешайте с раскрошенной брынзой, зелёным луком, укропом и перцем. Соль добавляйте осторожно — брынза солёная.",
          "en": "Chop the spinach and mix it with the crumbled cheese, spring onion, dill and pepper. Salt cautiously; the cheese is salty."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Смажьте форму маслом и уложите три листа фило, промазывая каждый.",
          "en": "Oil a tin and lay in three sheets of filo, brushing each one."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Распределите треть начинки, накройте двумя листами с маслом и повторите ещё дважды.",
          "en": "Spread a third of the filling, cover with two oiled sheets and repeat twice more."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Закройте тремя листами сверху, подверните края внутрь и щедро смажьте маслом.",
          "en": "Finish with three sheets on top, tuck the edges in and brush generously with oil."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Нарежьте квадратами до низа острым ножом — резать после выпечки не получится.",
          "en": "Score it into squares down to the base with a sharp knife; cutting it after baking will not work."
        },
        "minutes": 4
      },
      {
        "text": {
          "ru": "Пеките при 190 °C сорок пять минут до тёмно-золотой хрустящей корки.",
          "en": "Bake at 190 °C for forty-five minutes, to a deep golden crisp crust."
        },
        "minutes": 45
      }
    ],
    "sourceRecord": {
      "slug": "byrek-me-spinaq",
      "country": "AL",
      "name": {
        "ru": "Бюрек со шпинатом",
        "en": "Byrek me spinaq"
      },
      "nativeName": "Byrek me spinaq",
      "summary": {
        "ru": "Пирог из тонкого теста со шпинатом и брынзой, слоями, залитыми маслом.",
        "en": "A pie of thin pastry layered with spinach and brined cheese, each layer soaked in oil."
      },
      "category": "main",
      "diets": [
        "vegetarian"
      ],
      "difficulty": "easy",
      "baseServings": 8,
      "prepMinutes": 35,
      "cookMinutes": 45,
      "nutritionPerServing": {
        "calories": 480,
        "protein": 16,
        "fat": 30,
        "carbs": 38
      },
      "ingredients": [
        {
          "id": "filo",
          "name": {
            "ru": "Тесто фило",
            "en": "Filo pastry"
          },
          "quantity": 500,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "spinach",
          "name": {
            "ru": "Шпинат",
            "en": "Spinach"
          },
          "quantity": 1,
          "unit": "kg",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "feta",
          "name": {
            "ru": "Брынза",
            "en": "Brined white cheese"
          },
          "quantity": 400,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "spring",
          "name": {
            "ru": "Зелёный лук",
            "en": "Spring onions"
          },
          "quantity": 6,
          "unit": "piece",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "oliveoil",
          "name": {
            "ru": "Оливковое масло",
            "en": "Olive oil"
          },
          "quantity": 180,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "dill",
          "name": {
            "ru": "Укроп",
            "en": "Dill"
          },
          "quantity": 30,
          "unit": "g",
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
            "ru": "Ошпарьте шпинат кипятком, откиньте и отожмите руками досуха.",
            "en": "Scald the spinach with boiling water, drain it and wring it out dry by hand."
          },
          "minutes": 12
        },
        {
          "text": {
            "ru": "Нарежьте шпинат, смешайте с раскрошенной брынзой, зелёным луком, укропом и перцем. Соль добавляйте осторожно — брынза солёная.",
            "en": "Chop the spinach and mix it with the crumbled cheese, spring onion, dill and pepper. Salt cautiously; the cheese is salty."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "Смажьте форму маслом и уложите три листа фило, промазывая каждый.",
            "en": "Oil a tin and lay in three sheets of filo, brushing each one."
          },
          "minutes": 6
        },
        {
          "text": {
            "ru": "Распределите треть начинки, накройте двумя листами с маслом и повторите ещё дважды.",
            "en": "Spread a third of the filling, cover with two oiled sheets and repeat twice more."
          },
          "minutes": 12
        },
        {
          "text": {
            "ru": "Закройте тремя листами сверху, подверните края внутрь и щедро смажьте маслом.",
            "en": "Finish with three sheets on top, tuck the edges in and brush generously with oil."
          },
          "minutes": 6
        },
        {
          "text": {
            "ru": "Нарежьте квадратами до низа острым ножом — резать после выпечки не получится.",
            "en": "Score it into squares down to the base with a sharp knife; cutting it after baking will not work."
          },
          "minutes": 4
        },
        {
          "text": {
            "ru": "Пеките при 190 °C сорок пять минут до тёмно-золотой хрустящей корки.",
            "en": "Bake at 190 °C for forty-five minutes, to a deep golden crisp crust."
          },
          "minutes": 45
        }
      ]
    },
    "recipeReview": {
      "contentTrace": "manual_source_lines_to_steps",
      "proposedDietStatus": "unknown_for_strict_vegetarian_cheese_and_pastry_formulation_unverified",
      "notes": [
        "Base8 retained; source filo500g remains prepared pastry, not assumed sheet size/count or butter recipe.",
        "Method calls for 3 bottom sheets, 2 between fillings and3 top sheets; source500g is purchase amount, sheet dimensions unspecified. Preserve both, do not invent a sheet-weight conversion.",
        "Spinach1kg input is blanched/drained/wrung in step1. Consumed weight/nutrients not equated to purchased raw mass.",
        "Brined white cheese400g remains unspecified cheese, not forced to feta. No milk species, salt percentage or fat-content assumption.",
        "Olive oil180ml retained, no generic oil blend or absorbed fraction.",
        "Spring onion6piece retains damped flag but base serving only; no scaling formula guessed."
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
