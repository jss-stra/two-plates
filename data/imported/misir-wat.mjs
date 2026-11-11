export default {
  "id": "unitools:misir-wat",
  "kind": "source-native-fixed-base",
  "name": "Misir wat",
  "country": "ET",
  "cuisine": "Ethiopian cuisine",
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
    "proposedDietStatus": "source_vegan_claim_not_independently_cleared_blend",
    "notes": [
      "Base4 retained. Red lentils300g rinsed input, no cooked-weight substitution; onions600g are a distinct dominant ingredient.",
      "Neutral oil80ml has no named plant source. Berbere2tbsp has no defined formula; no ingredient split, allergy absence or independent vegan certification inferred.",
      "Water900ml explicit; final cook-down to porridge-thick means actual yield unknown.",
      "Step2 prose3min vs metadata4min, step3 prose5min vs metadata6min, step5 metadata6min with no prose duration. Preserve both unchanged; no guaranteed elapsed total.",
      "Injera/flatbread choice not in ingredient array, no weight/recipe/formula invented. Pairing completion remains a separate hold."
    ],
    "sourceSafetyNotIndependentlyCertified": true,
    "nutritionStatus": "unknown",
    "allergyReview": "limited_positive_findings_no_absence_or_cross_contact_clearance"
  },
  "sourceDietClaims": [
    "vegetarian",
    "vegan",
    "gluten-free"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 15,
    "cookMinutes": 70,
    "stepMinutesTotal": 71,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:misir-wat:001",
      "name": "Red lentils",
      "quantity": 300,
      "unit": "g",
      "note": {
        "ru": "промыть",
        "en": "rinsed"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "lentils",
        "name": {
          "ru": "Красная чечевица",
          "en": "Red lentils"
        },
        "quantity": 300,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "промыть",
          "en": "rinsed"
        }
      },
      "methodSteps": [
        4
      ]
    },
    {
      "lineRef": "src:unitools:misir-wat:002",
      "name": "Onions",
      "quantity": 600,
      "unit": "g",
      "note": {
        "ru": "очень мелко нарезать",
        "en": "very finely chopped"
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
        "quantity": 600,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "очень мелко нарезать",
          "en": "very finely chopped"
        }
      },
      "methodSteps": [
        1
      ]
    },
    {
      "lineRef": "src:unitools:misir-wat:003",
      "name": "Berbere",
      "quantity": 2,
      "unit": "tbsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "berbere",
        "name": {
          "ru": "Бербере",
          "en": "Berbere"
        },
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        3
      ]
    },
    {
      "lineRef": "src:unitools:misir-wat:004",
      "name": "Garlic",
      "quantity": 5,
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
        "quantity": 5,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:misir-wat:005",
      "name": "Ginger",
      "quantity": 30,
      "unit": "g",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "ginger",
        "name": {
          "ru": "Имбирь",
          "en": "Ginger"
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
      "lineRef": "src:unitools:misir-wat:006",
      "name": "Tomato paste",
      "quantity": 1,
      "unit": "tbsp",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "tomatopaste",
        "name": {
          "ru": "Томатная паста",
          "en": "Tomato paste"
        },
        "quantity": 1,
        "unit": "tbsp",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        3
      ]
    },
    {
      "lineRef": "src:unitools:misir-wat:007",
      "name": "Neutral oil",
      "quantity": 80,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "oil",
        "name": {
          "ru": "Растительное масло",
          "en": "Neutral oil"
        },
        "quantity": 80,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:misir-wat:008",
      "name": "Water",
      "quantity": 900,
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
        "quantity": 900,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        4
      ]
    },
    {
      "lineRef": "src:unitools:misir-wat:009",
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
        5
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Томите лук в сухой кастрюле тридцать минут на среднем огне, помешивая, пока он не станет тёмной пастой.",
        "en": "Cook the onion dry in a pot for thirty minutes over medium heat, stirring, until it becomes a dark paste."
      },
      "minutes": 30
    },
    {
      "text": {
        "ru": "Влейте масло, добавьте чеснок с имбирём и прогрейте три минуты.",
        "en": "Pour in the oil, add the garlic and ginger and cook three minutes."
      },
      "minutes": 4
    },
    {
      "text": {
        "ru": "Всыпьте бербере и томатную пасту и обжаривайте пять минут — смесь потемнеет и станет ароматной.",
        "en": "Stir in the berbere and tomato paste and fry five minutes: the mixture darkens and turns fragrant."
      },
      "minutes": 6
    },
    {
      "text": {
        "ru": "Добавьте чечевицу, залейте водой и варите двадцать пять минут на слабом огне, помешивая, пока чечевица не разойдётся.",
        "en": "Add the lentils, pour in the water and simmer twenty-five minutes, stirring, until the lentils fall apart."
      },
      "minutes": 25
    },
    {
      "text": {
        "ru": "Посолите в конце, доведите до густоты каши и подавайте с инджерой или лепёшкой.",
        "en": "Season at the end, cook it down to a porridge-thick stew and serve with injera or flatbread."
      },
      "minutes": 6
    }
  ],
  "sourceRecord": {
    "slug": "misir-wat",
    "country": "ET",
    "name": {
      "ru": "Мисир уот",
      "en": "Misir wat"
    },
    "nativeName": "ምስር ወጥ",
    "summary": {
      "ru": "Красная чечевица в соусе с бербере. Постное блюдо, которое в Эфиопии едят в дни поста круглый год.",
      "en": "Red lentils in a berbere sauce. A fasting dish eaten in Ethiopia on fast days all year round."
    },
    "category": "main",
    "diets": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "difficulty": "easy",
    "baseServings": 4,
    "prepMinutes": 15,
    "cookMinutes": 70,
    "nutritionPerServing": {
      "calories": 420,
      "protein": 20,
      "fat": 18,
      "carbs": 48
    },
    "ingredients": [
      {
        "id": "lentils",
        "name": {
          "ru": "Красная чечевица",
          "en": "Red lentils"
        },
        "quantity": 300,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "промыть",
          "en": "rinsed"
        }
      },
      {
        "id": "onions",
        "name": {
          "ru": "Лук",
          "en": "Onions"
        },
        "quantity": 600,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "очень мелко нарезать",
          "en": "very finely chopped"
        }
      },
      {
        "id": "berbere",
        "name": {
          "ru": "Бербере",
          "en": "Berbere"
        },
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "garlic",
        "name": {
          "ru": "Чеснок",
          "en": "Garlic"
        },
        "quantity": 5,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "ginger",
        "name": {
          "ru": "Имбирь",
          "en": "Ginger"
        },
        "quantity": 30,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "tomatopaste",
        "name": {
          "ru": "Томатная паста",
          "en": "Tomato paste"
        },
        "quantity": 1,
        "unit": "tbsp",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "oil",
        "name": {
          "ru": "Растительное масло",
          "en": "Neutral oil"
        },
        "quantity": 80,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "water",
        "name": {
          "ru": "Вода",
          "en": "Water"
        },
        "quantity": 900,
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
          "ru": "Томите лук в сухой кастрюле тридцать минут на среднем огне, помешивая, пока он не станет тёмной пастой.",
          "en": "Cook the onion dry in a pot for thirty minutes over medium heat, stirring, until it becomes a dark paste."
        },
        "minutes": 30
      },
      {
        "text": {
          "ru": "Влейте масло, добавьте чеснок с имбирём и прогрейте три минуты.",
          "en": "Pour in the oil, add the garlic and ginger and cook three minutes."
        },
        "minutes": 4
      },
      {
        "text": {
          "ru": "Всыпьте бербере и томатную пасту и обжаривайте пять минут — смесь потемнеет и станет ароматной.",
          "en": "Stir in the berbere and tomato paste and fry five minutes: the mixture darkens and turns fragrant."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Добавьте чечевицу, залейте водой и варите двадцать пять минут на слабом огне, помешивая, пока чечевица не разойдётся.",
          "en": "Add the lentils, pour in the water and simmer twenty-five minutes, stirring, until the lentils fall apart."
        },
        "minutes": 25
      },
      {
        "text": {
          "ru": "Посолите в конце, доведите до густоты каши и подавайте с инджерой или лепёшкой.",
          "en": "Season at the end, cook it down to a porridge-thick stew and serve with injera or flatbread."
        },
        "minutes": 6
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
    "id": "unitools:misir-wat",
    "name": "Misir wat",
    "country": "ET",
    "baseServings": 4,
    "lines": [
      {
        "lineRef": "src:unitools:misir-wat:001",
        "raw": "Red lentils",
        "qty": 300,
        "unit": "g",
        "note": {
          "ru": "промыть",
          "en": "rinsed"
        },
        "scaling": "linear",
        "source": {
          "id": "lentils",
          "name": {
            "ru": "Красная чечевица",
            "en": "Red lentils"
          },
          "quantity": 300,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "промыть",
            "en": "rinsed"
          }
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
        "lineRef": "src:unitools:misir-wat:002",
        "raw": "Onions",
        "qty": 600,
        "unit": "g",
        "note": {
          "ru": "очень мелко нарезать",
          "en": "very finely chopped"
        },
        "scaling": "linear",
        "source": {
          "id": "onions",
          "name": {
            "ru": "Лук",
            "en": "Onions"
          },
          "quantity": 600,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "очень мелко нарезать",
            "en": "very finely chopped"
          }
        },
        "tracedMethodStepNumbers": [
          1
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
        "lineRef": "src:unitools:misir-wat:003",
        "raw": "Berbere",
        "qty": 2,
        "unit": "tbsp",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "berbere",
          "name": {
            "ru": "Бербере",
            "en": "Berbere"
          },
          "quantity": 2,
          "unit": "tbsp",
          "scaling": "damped",
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
        "productCompositionUnverified": true,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:misir-wat:004",
        "raw": "Garlic",
        "qty": 5,
        "unit": "clove",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "garlic",
          "name": {
            "ru": "Чеснок",
            "en": "Garlic"
          },
          "quantity": 5,
          "unit": "clove",
          "scaling": "damped",
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
        "lineRef": "src:unitools:misir-wat:005",
        "raw": "Ginger",
        "qty": 30,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "ginger",
          "name": {
            "ru": "Имбирь",
            "en": "Ginger"
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
        "lineRef": "src:unitools:misir-wat:006",
        "raw": "Tomato paste",
        "qty": 1,
        "unit": "tbsp",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "tomatopaste",
          "name": {
            "ru": "Томатная паста",
            "en": "Tomato paste"
          },
          "quantity": 1,
          "unit": "tbsp",
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
        "lineRef": "src:unitools:misir-wat:007",
        "raw": "Neutral oil",
        "qty": 80,
        "unit": "ml",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "oil",
          "name": {
            "ru": "Растительное масло",
            "en": "Neutral oil"
          },
          "quantity": 80,
          "unit": "ml",
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
        "productCompositionUnverified": true,
        "positiveAllergenEvidence": [],
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:misir-wat:008",
        "raw": "Water",
        "qty": 900,
        "unit": "ml",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "water",
          "name": {
            "ru": "Вода",
            "en": "Water"
          },
          "quantity": 900,
          "unit": "ml",
          "scaling": "linear",
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
        "lineRef": "src:unitools:misir-wat:009",
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
      }
    ],
    "orderedSteps": [
      {
        "text": {
          "ru": "Томите лук в сухой кастрюле тридцать минут на среднем огне, помешивая, пока он не станет тёмной пастой.",
          "en": "Cook the onion dry in a pot for thirty minutes over medium heat, stirring, until it becomes a dark paste."
        },
        "minutes": 30
      },
      {
        "text": {
          "ru": "Влейте масло, добавьте чеснок с имбирём и прогрейте три минуты.",
          "en": "Pour in the oil, add the garlic and ginger and cook three minutes."
        },
        "minutes": 4
      },
      {
        "text": {
          "ru": "Всыпьте бербере и томатную пасту и обжаривайте пять минут — смесь потемнеет и станет ароматной.",
          "en": "Stir in the berbere and tomato paste and fry five minutes: the mixture darkens and turns fragrant."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Добавьте чечевицу, залейте водой и варите двадцать пять минут на слабом огне, помешивая, пока чечевица не разойдётся.",
          "en": "Add the lentils, pour in the water and simmer twenty-five minutes, stirring, until the lentils fall apart."
        },
        "minutes": 25
      },
      {
        "text": {
          "ru": "Посолите в конце, доведите до густоты каши и подавайте с инджерой или лепёшкой.",
          "en": "Season at the end, cook it down to a porridge-thick stew and serve with injera or flatbread."
        },
        "minutes": 6
      }
    ],
    "sourceRecord": {
      "slug": "misir-wat",
      "country": "ET",
      "name": {
        "ru": "Мисир уот",
        "en": "Misir wat"
      },
      "nativeName": "ምስር ወጥ",
      "summary": {
        "ru": "Красная чечевица в соусе с бербере. Постное блюдо, которое в Эфиопии едят в дни поста круглый год.",
        "en": "Red lentils in a berbere sauce. A fasting dish eaten in Ethiopia on fast days all year round."
      },
      "category": "main",
      "diets": [
        "vegetarian",
        "vegan",
        "gluten-free"
      ],
      "difficulty": "easy",
      "baseServings": 4,
      "prepMinutes": 15,
      "cookMinutes": 70,
      "nutritionPerServing": {
        "calories": 420,
        "protein": 20,
        "fat": 18,
        "carbs": 48
      },
      "ingredients": [
        {
          "id": "lentils",
          "name": {
            "ru": "Красная чечевица",
            "en": "Red lentils"
          },
          "quantity": 300,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "промыть",
            "en": "rinsed"
          }
        },
        {
          "id": "onions",
          "name": {
            "ru": "Лук",
            "en": "Onions"
          },
          "quantity": 600,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "очень мелко нарезать",
            "en": "very finely chopped"
          }
        },
        {
          "id": "berbere",
          "name": {
            "ru": "Бербере",
            "en": "Berbere"
          },
          "quantity": 2,
          "unit": "tbsp",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "garlic",
          "name": {
            "ru": "Чеснок",
            "en": "Garlic"
          },
          "quantity": 5,
          "unit": "clove",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "ginger",
          "name": {
            "ru": "Имбирь",
            "en": "Ginger"
          },
          "quantity": 30,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "tomatopaste",
          "name": {
            "ru": "Томатная паста",
            "en": "Tomato paste"
          },
          "quantity": 1,
          "unit": "tbsp",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "oil",
          "name": {
            "ru": "Растительное масло",
            "en": "Neutral oil"
          },
          "quantity": 80,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "water",
          "name": {
            "ru": "Вода",
            "en": "Water"
          },
          "quantity": 900,
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
            "ru": "Томите лук в сухой кастрюле тридцать минут на среднем огне, помешивая, пока он не станет тёмной пастой.",
            "en": "Cook the onion dry in a pot for thirty minutes over medium heat, stirring, until it becomes a dark paste."
          },
          "minutes": 30
        },
        {
          "text": {
            "ru": "Влейте масло, добавьте чеснок с имбирём и прогрейте три минуты.",
            "en": "Pour in the oil, add the garlic and ginger and cook three minutes."
          },
          "minutes": 4
        },
        {
          "text": {
            "ru": "Всыпьте бербере и томатную пасту и обжаривайте пять минут — смесь потемнеет и станет ароматной.",
            "en": "Stir in the berbere and tomato paste and fry five minutes: the mixture darkens and turns fragrant."
          },
          "minutes": 6
        },
        {
          "text": {
            "ru": "Добавьте чечевицу, залейте водой и варите двадцать пять минут на слабом огне, помешивая, пока чечевица не разойдётся.",
            "en": "Add the lentils, pour in the water and simmer twenty-five minutes, stirring, until the lentils fall apart."
          },
          "minutes": 25
        },
        {
          "text": {
            "ru": "Посолите в конце, доведите до густоты каши и подавайте с инджерой или лепёшкой.",
            "en": "Season at the end, cook it down to a porridge-thick stew and serve with injera or flatbread."
          },
          "minutes": 6
        }
      ]
    },
    "sourceDietClaimsUnverified": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "sourceCategory": "main",
    "mealReview": "Source main stew, but step5 suggests injera OR flatbread without quantity or composition. This review covers stew only; not a complete quantified stew-and-bread meal.",
    "recipeReview": {
      "proposedDietStatus": "source_vegan_claim_not_independently_cleared_blend",
      "notes": [
        "Base4 retained. Red lentils300g rinsed input, no cooked-weight substitution; onions600g are a distinct dominant ingredient.",
        "Neutral oil80ml has no named plant source. Berbere2tbsp has no defined formula; no ingredient split, allergy absence or independent vegan certification inferred.",
        "Water900ml explicit; final cook-down to porridge-thick means actual yield unknown.",
        "Step2 prose3min vs metadata4min, step3 prose5min vs metadata6min, step5 metadata6min with no prose duration. Preserve both unchanged; no guaranteed elapsed total.",
        "Injera/flatbread choice not in ingredient array, no weight/recipe/formula invented. Pairing completion remains a separate hold."
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
