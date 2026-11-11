export default {
  "id": "unitools:jollof-rice",
  "kind": "source-native-fixed-base",
  "name": "Jollof rice",
  "country": "NG",
  "cuisine": "Nigerian cuisine",
  "baseServings": 6,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": null,
  "dietClassificationBasis": "Ingredient formulation and cross-contact unverified; source diet tags are claims, not independent clearance",
  "sourceDietClaims": [
    "vegetarian",
    "vegan",
    "gluten-free"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 20,
    "cookMinutes": 60,
    "stepMinutesTotal": 80,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:jollof-rice:001",
      "name": "Long-grain rice",
      "quantity": 500,
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
        "id": "rice",
        "name": {
          "ru": "Длиннозёрный рис",
          "en": "Long-grain rice"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "промыть",
          "en": "rinsed"
        }
      },
      "methodSteps": [
        5
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 5,
          "text": {
            "ru": "Всыпьте промытый рис, перемешайте один раз, накройте фольгой и крышкой и варите на самом слабом огне двадцать пять минут. Не открывайте и не мешайте.",
            "en": "Stir in the rinsed rice once, cover with foil and a lid, and cook on the lowest heat for twenty-five minutes. Do not lift the lid or stir."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:002",
      "name": "Tomatoes",
      "quantity": 600,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "tomatoes",
        "name": {
          "ru": "Помидоры",
          "en": "Tomatoes"
        },
        "quantity": 600,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        3
      ],
      "traceStatus": "named_then_puree",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 1,
          "text": {
            "ru": "Пробейте помидоры, перец, одну луковицу и скотч-боннет в блендере до гладкости.",
            "en": "Blend the tomatoes, peppers, one onion and the scotch bonnet until smooth."
          }
        },
        {
          "stepNumber": 3,
          "text": {
            "ru": "Влейте пюре и уваривайте двадцать пять минут на среднем огне, помешивая. Соус потемнеет, загустеет, и масло начнёт отделяться по краям.",
            "en": "Pour in the purée and reduce it for twenty-five minutes over medium heat, stirring. It darkens, thickens and the oil begins separating at the edges."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:003",
      "name": "Red peppers",
      "quantity": 2,
      "unit": "piece",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "redpepper",
        "name": {
          "ru": "Красный сладкий перец",
          "en": "Red peppers"
        },
        "quantity": 2,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        3
      ],
      "traceStatus": "named_then_puree",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 1,
          "text": {
            "ru": "Пробейте помидоры, перец, одну луковицу и скотч-боннет в блендере до гладкости.",
            "en": "Blend the tomatoes, peppers, one onion and the scotch bonnet until smooth."
          }
        },
        {
          "stepNumber": 3,
          "text": {
            "ru": "Влейте пюре и уваривайте двадцать пять минут на среднем огне, помешивая. Соус потемнеет, загустеет, и масло начнёт отделяться по краям.",
            "en": "Pour in the purée and reduce it for twenty-five minutes over medium heat, stirring. It darkens, thickens and the oil begins separating at the edges."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:004",
      "name": "Onions",
      "quantity": 2,
      "unit": "piece",
      "note": null,
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
        "quantity": 2,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        2,
        3
      ],
      "traceStatus": "explicit_first_and_second_onions",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 1,
          "text": {
            "ru": "Пробейте помидоры, перец, одну луковицу и скотч-боннет в блендере до гладкости.",
            "en": "Blend the tomatoes, peppers, one onion and the scotch bonnet until smooth."
          }
        },
        {
          "stepNumber": 2,
          "text": {
            "ru": "Обжарьте вторую луковицу в масле до мягкости, добавьте томатную пасту и жарьте пять минут, пока она не потемнеет.",
            "en": "Fry the second onion in the oil until soft, add the tomato paste and cook five minutes, until it darkens."
          }
        },
        {
          "stepNumber": 3,
          "text": {
            "ru": "Влейте пюре и уваривайте двадцать пять минут на среднем огне, помешивая. Соус потемнеет, загустеет, и масло начнёт отделяться по краям.",
            "en": "Pour in the purée and reduce it for twenty-five minutes over medium heat, stirring. It darkens, thickens and the oil begins separating at the edges."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:005",
      "name": "Scotch bonnet",
      "quantity": 1,
      "unit": "piece",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "scotchbonnet",
        "name": {
          "ru": "Скотч-боннет",
          "en": "Scotch bonnet"
        },
        "quantity": 1,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        1,
        3
      ],
      "traceStatus": "named_then_puree",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 1,
          "text": {
            "ru": "Пробейте помидоры, перец, одну луковицу и скотч-боннет в блендере до гладкости.",
            "en": "Blend the tomatoes, peppers, one onion and the scotch bonnet until smooth."
          }
        },
        {
          "stepNumber": 3,
          "text": {
            "ru": "Влейте пюре и уваривайте двадцать пять минут на среднем огне, помешивая. Соус потемнеет, загустеет, и масло начнёт отделяться по краям.",
            "en": "Pour in the purée and reduce it for twenty-five minutes over medium heat, stirring. It darkens, thickens and the oil begins separating at the edges."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:006",
      "name": "Tomato paste",
      "quantity": 3,
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
        "quantity": 3,
        "unit": "tbsp",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 2,
          "text": {
            "ru": "Обжарьте вторую луковицу в масле до мягкости, добавьте томатную пасту и жарьте пять минут, пока она не потемнеет.",
            "en": "Fry the second onion in the oil until soft, add the tomato paste and cook five minutes, until it darkens."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:007",
      "name": "Curry powder",
      "quantity": 2,
      "unit": "tsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "curry",
        "name": {
          "ru": "Порошок карри",
          "en": "Curry powder"
        },
        "quantity": 2,
        "unit": "tsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        4
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 4,
          "text": {
            "ru": "Добавьте карри, тимьян, лавровый лист и бульон, посолите и доведите до кипения.",
            "en": "Add the curry powder, thyme, bay and stock, season and bring it to the boil."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:008",
      "name": "Dried thyme",
      "quantity": 1,
      "unit": "tsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "thyme",
        "name": {
          "ru": "Сушёный тимьян",
          "en": "Dried thyme"
        },
        "quantity": 1,
        "unit": "tsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        4
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 4,
          "text": {
            "ru": "Добавьте карри, тимьян, лавровый лист и бульон, посолите и доведите до кипения.",
            "en": "Add the curry powder, thyme, bay and stock, season and bring it to the boil."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:009",
      "name": "Bay leaves",
      "quantity": 2,
      "unit": "piece",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "bay",
        "name": {
          "ru": "Лавровый лист",
          "en": "Bay leaves"
        },
        "quantity": 2,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        4
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 4,
          "text": {
            "ru": "Добавьте карри, тимьян, лавровый лист и бульон, посолите и доведите до кипения.",
            "en": "Add the curry powder, thyme, bay and stock, season and bring it to the boil."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:010",
      "name": "Chicken stock",
      "quantity": 600,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "stock",
        "name": {
          "ru": "Куриный бульон",
          "en": "Chicken stock"
        },
        "quantity": 600,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        4
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 4,
          "text": {
            "ru": "Добавьте карри, тимьян, лавровый лист и бульон, посолите и доведите до кипения.",
            "en": "Add the curry powder, thyme, bay and stock, season and bring it to the boil."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:011",
      "name": "Neutral oil",
      "quantity": 100,
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
        "quantity": 100,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 2,
          "text": {
            "ru": "Обжарьте вторую луковицу в масле до мягкости, добавьте томатную пасту и жарьте пять минут, пока она не потемнеет.",
            "en": "Fry the second onion in the oil until soft, add the tomato paste and cook five minutes, until it darkens."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:jollof-rice:012",
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
        4
      ],
      "traceStatus": "explicit_ru_salt_en_generic_season",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 4,
          "text": {
            "ru": "Добавьте карри, тимьян, лавровый лист и бульон, посолите и доведите до кипения.",
            "en": "Add the curry powder, thyme, bay and stock, season and bring it to the boil."
          }
        }
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Пробейте помидоры, перец, одну луковицу и скотч-боннет в блендере до гладкости.",
        "en": "Blend the tomatoes, peppers, one onion and the scotch bonnet until smooth."
      },
      "minutes": 6
    },
    {
      "text": {
        "ru": "Обжарьте вторую луковицу в масле до мягкости, добавьте томатную пасту и жарьте пять минут, пока она не потемнеет.",
        "en": "Fry the second onion in the oil until soft, add the tomato paste and cook five minutes, until it darkens."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Влейте пюре и уваривайте двадцать пять минут на среднем огне, помешивая. Соус потемнеет, загустеет, и масло начнёт отделяться по краям.",
        "en": "Pour in the purée and reduce it for twenty-five minutes over medium heat, stirring. It darkens, thickens and the oil begins separating at the edges."
      },
      "minutes": 25
    },
    {
      "text": {
        "ru": "Добавьте карри, тимьян, лавровый лист и бульон, посолите и доведите до кипения.",
        "en": "Add the curry powder, thyme, bay and stock, season and bring it to the boil."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Всыпьте промытый рис, перемешайте один раз, накройте фольгой и крышкой и варите на самом слабом огне двадцать пять минут. Не открывайте и не мешайте.",
        "en": "Stir in the rinsed rice once, cover with foil and a lid, and cook on the lowest heat for twenty-five minutes. Do not lift the lid or stir."
      },
      "minutes": 27
    },
    {
      "text": {
        "ru": "Снимите с огня и дайте постоять десять минут. Перемешайте вилкой снизу вверх, поднимая нижний слой.",
        "en": "Take it off and let it stand ten minutes. Fork it through from the bottom up, lifting the lower layer."
      },
      "minutes": 12
    }
  ],
  "sourceRecord": {
    "slug": "jollof-rice",
    "country": "NG",
    "name": {
      "ru": "Джоллоф рис",
      "en": "Jollof rice"
    },
    "nativeName": "Jollof rice",
    "summary": {
      "ru": "Рис, сваренный в густом соусе из помидоров, перца и лука. Соус уваривают до тёмного цвета до закладки риса.",
      "en": "Rice cooked in a thick sauce of tomato, pepper and onion. The sauce is reduced dark before the rice goes in."
    },
    "category": "main",
    "diets": [
      "vegetarian",
      "vegan",
      "gluten-free"
    ],
    "difficulty": "medium",
    "baseServings": 6,
    "prepMinutes": 20,
    "cookMinutes": 60,
    "nutritionPerServing": {
      "calories": 520,
      "protein": 10,
      "fat": 18,
      "carbs": 80
    },
    "ingredients": [
      {
        "id": "rice",
        "name": {
          "ru": "Длиннозёрный рис",
          "en": "Long-grain rice"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "промыть",
          "en": "rinsed"
        }
      },
      {
        "id": "tomatoes",
        "name": {
          "ru": "Помидоры",
          "en": "Tomatoes"
        },
        "quantity": 600,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "redpepper",
        "name": {
          "ru": "Красный сладкий перец",
          "en": "Red peppers"
        },
        "quantity": 2,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "onions",
        "name": {
          "ru": "Лук",
          "en": "Onions"
        },
        "quantity": 2,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "scotchbonnet",
        "name": {
          "ru": "Скотч-боннет",
          "en": "Scotch bonnet"
        },
        "quantity": 1,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "tomatopaste",
        "name": {
          "ru": "Томатная паста",
          "en": "Tomato paste"
        },
        "quantity": 3,
        "unit": "tbsp",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "curry",
        "name": {
          "ru": "Порошок карри",
          "en": "Curry powder"
        },
        "quantity": 2,
        "unit": "tsp",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "thyme",
        "name": {
          "ru": "Сушёный тимьян",
          "en": "Dried thyme"
        },
        "quantity": 1,
        "unit": "tsp",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "bay",
        "name": {
          "ru": "Лавровый лист",
          "en": "Bay leaves"
        },
        "quantity": 2,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "stock",
        "name": {
          "ru": "Куриный бульон",
          "en": "Chicken stock"
        },
        "quantity": 600,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "oil",
        "name": {
          "ru": "Растительное масло",
          "en": "Neutral oil"
        },
        "quantity": 100,
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
          "ru": "Пробейте помидоры, перец, одну луковицу и скотч-боннет в блендере до гладкости.",
          "en": "Blend the tomatoes, peppers, one onion and the scotch bonnet until smooth."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Обжарьте вторую луковицу в масле до мягкости, добавьте томатную пасту и жарьте пять минут, пока она не потемнеет.",
          "en": "Fry the second onion in the oil until soft, add the tomato paste and cook five minutes, until it darkens."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Влейте пюре и уваривайте двадцать пять минут на среднем огне, помешивая. Соус потемнеет, загустеет, и масло начнёт отделяться по краям.",
          "en": "Pour in the purée and reduce it for twenty-five minutes over medium heat, stirring. It darkens, thickens and the oil begins separating at the edges."
        },
        "minutes": 25
      },
      {
        "text": {
          "ru": "Добавьте карри, тимьян, лавровый лист и бульон, посолите и доведите до кипения.",
          "en": "Add the curry powder, thyme, bay and stock, season and bring it to the boil."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Всыпьте промытый рис, перемешайте один раз, накройте фольгой и крышкой и варите на самом слабом огне двадцать пять минут. Не открывайте и не мешайте.",
          "en": "Stir in the rinsed rice once, cover with foil and a lid, and cook on the lowest heat for twenty-five minutes. Do not lift the lid or stir."
        },
        "minutes": 27
      },
      {
        "text": {
          "ru": "Снимите с огня и дайте постоять десять минут. Перемешайте вилкой снизу вверх, поднимая нижний слой.",
          "en": "Take it off and let it stand ten minutes. Fork it through from the bottom up, lifting the lower layer."
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
    "changes": "Photo omitted; source-local references, verbatim method evidence and review metadata added; quantities and method unchanged."
  },
  "review": {
    "productionApproved": false,
    "contentFidelityAcceptedByWriter": false,
    "catalogMappingReviewed": false,
    "dietIndependentlyReviewed": false,
    "crossContactKnown": false
  },
  "scopedReviewEvidence": {
    "scope": "Complete bilingual objects/notes/alternatives and methods read, primary step evidence per line; not a cooking test",
    "sourceCategory": "main",
    "limits": [
      "Read all notes: rice500g rinsed; others null. No cooked-rice substitution or dry-to-rinsed mass correction. Method adds rice toboilingstock and cooks25min.",
      "Chicken stock600ml explicit, never substitutevegetablestock or promotevegetarian. Source also has100ml neutraloil untouched.",
      "Two onions explicitly allocated one inblend/second fried, no guessed split. Peppers2piece, scotchbonnet1piece preserved.",
      "Stockformulation,currypowder and crosscontact unknown; no allergenabsenceclaim.",
      "Serveas source main(base6) without invented meataccompaniment. Rice-safety separate note may follow existing rapidcool/reheat pattern, not source recipe ingredient/method rewrite."
    ],
    "allergenAbsenceClaim": false
  }
};
