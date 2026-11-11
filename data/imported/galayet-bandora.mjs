export default {
  "id": "unitools:galayet-bandora",
  "kind": "source-native-fixed-base",
  "name": "Galayet bandora",
  "country": "JO",
  "cuisine": "Jordanian cuisine",
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
    "status": "unknown_prepared_bread_composition",
    "proposedAppClass": null,
    "basis": "Source declares vegetarian/vegan, but the flatbread formulation is not supplied. Do not promote source claim to a verified badge or choose a bread recipe."
  },
  "sourceDietClaims": [
    "vegetarian",
    "vegan"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 15,
    "cookMinutes": 35,
    "stepMinutesTotal": 60,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:galayet-bandora:001",
      "name": "Tomatoes",
      "quantity": 1.2,
      "unit": "kg",
      "note": {
        "ru": "спелые",
        "en": "ripe"
      },
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
        "quantity": 1.2,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "спелые",
          "en": "ripe"
        }
      },
      "methodSteps": [
        1,
        4,
        5,
        6
      ]
    },
    {
      "lineRef": "src:unitools:galayet-bandora:002",
      "name": "Olive oil",
      "quantity": 120,
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
        "quantity": 120,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:galayet-bandora:003",
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
        3
      ]
    },
    {
      "lineRef": "src:unitools:galayet-bandora:004",
      "name": "Green chilli",
      "quantity": 3,
      "unit": "piece",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "chili",
        "name": {
          "ru": "Зелёный острый перец",
          "en": "Green chilli"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        3
      ]
    },
    {
      "lineRef": "src:unitools:galayet-bandora:005",
      "name": "Onion",
      "quantity": 1,
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
          "en": "Onion"
        },
        "quantity": 1,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:galayet-bandora:006",
      "name": "Flatbreads",
      "quantity": 4,
      "unit": "piece",
      "note": {
        "ru": "к подаче",
        "en": "to serve"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "flatbread",
        "name": {
          "ru": "Лепёшки",
          "en": "Flatbreads"
        },
        "quantity": 4,
        "unit": "piece",
        "scaling": "linear",
        "note": {
          "ru": "к подаче",
          "en": "to serve"
        }
      },
      "methodSteps": [
        7
      ]
    },
    {
      "lineRef": "src:unitools:galayet-bandora:007",
      "name": "Dried mint",
      "quantity": 1,
      "unit": "tsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "mint",
        "name": {
          "ru": "Сушёная мята",
          "en": "Dried mint"
        },
        "quantity": 1,
        "unit": "tsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        7
      ]
    },
    {
      "lineRef": "src:unitools:galayet-bandora:008",
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
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Нарежьте помидоры крупными дольками, не снимая кожуру и не удаляя семена.",
        "en": "Cut the tomatoes into large wedges, skins and seeds left in."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Разогрейте оливковое масло в широкой сковороде и обжарьте лук до мягкости.",
        "en": "Heat the olive oil in a wide pan and soften the onion in it."
      },
      "minutes": 8
    },
    {
      "text": {
        "ru": "Добавьте раздавленный чеснок и зелёный перец целиком и прогрейте минуту.",
        "en": "Add the crushed garlic and the whole green chillies and warm them a minute."
      },
      "minutes": 3
    },
    {
      "text": {
        "ru": "Выложите помидоры, посолите и тушите на среднем огне, изредка помешивая.",
        "en": "Tip in the tomatoes, salt them and stew over a medium heat, stirring now and then."
      },
      "minutes": 15
    },
    {
      "text": {
        "ru": "Разомните помидоры ложкой, когда кожица начнёт отходить от мякоти.",
        "en": "Crush the tomatoes with a spoon once the skins start to lift from the flesh."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Уваривайте ещё пятнадцать минут, пока масло не выступит по краям отдельным слоем.",
        "en": "Reduce it fifteen minutes more, until the oil rises at the edges as a separate layer."
      },
      "minutes": 15
    },
    {
      "text": {
        "ru": "Посыпьте сушёной мятой и подайте прямо в сковороде с лепёшками.",
        "en": "Scatter with dried mint and serve it in the pan with flatbread."
      },
      "minutes": 4
    }
  ],
  "sourceRecord": {
    "slug": "galayet-bandora",
    "country": "JO",
    "name": {
      "ru": "Галает бандора",
      "en": "Galayet bandora"
    },
    "nativeName": "قلاية بندورة",
    "summary": {
      "ru": "Помидоры, уваренные в оливковом масле с чили и чесноком, до состояния густого соуса.",
      "en": "Tomatoes cooked down in olive oil with chilli and garlic to a thick sauce."
    },
    "category": "main",
    "diets": [
      "vegetarian",
      "vegan"
    ],
    "difficulty": "easy",
    "baseServings": 4,
    "prepMinutes": 15,
    "cookMinutes": 35,
    "nutritionPerServing": {
      "calories": 380,
      "protein": 8,
      "fat": 26,
      "carbs": 32
    },
    "ingredients": [
      {
        "id": "tomato",
        "name": {
          "ru": "Помидоры",
          "en": "Tomatoes"
        },
        "quantity": 1.2,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "спелые",
          "en": "ripe"
        }
      },
      {
        "id": "oliveoil",
        "name": {
          "ru": "Оливковое масло",
          "en": "Olive oil"
        },
        "quantity": 120,
        "unit": "ml",
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
        "id": "chili",
        "name": {
          "ru": "Зелёный острый перец",
          "en": "Green chilli"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "onion",
        "name": {
          "ru": "Лук",
          "en": "Onion"
        },
        "quantity": 1,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "flatbread",
        "name": {
          "ru": "Лепёшки",
          "en": "Flatbreads"
        },
        "quantity": 4,
        "unit": "piece",
        "scaling": "linear",
        "note": {
          "ru": "к подаче",
          "en": "to serve"
        }
      },
      {
        "id": "mint",
        "name": {
          "ru": "Сушёная мята",
          "en": "Dried mint"
        },
        "quantity": 1,
        "unit": "tsp",
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
          "ru": "Нарежьте помидоры крупными дольками, не снимая кожуру и не удаляя семена.",
          "en": "Cut the tomatoes into large wedges, skins and seeds left in."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Разогрейте оливковое масло в широкой сковороде и обжарьте лук до мягкости.",
          "en": "Heat the olive oil in a wide pan and soften the onion in it."
        },
        "minutes": 8
      },
      {
        "text": {
          "ru": "Добавьте раздавленный чеснок и зелёный перец целиком и прогрейте минуту.",
          "en": "Add the crushed garlic and the whole green chillies and warm them a minute."
        },
        "minutes": 3
      },
      {
        "text": {
          "ru": "Выложите помидоры, посолите и тушите на среднем огне, изредка помешивая.",
          "en": "Tip in the tomatoes, salt them and stew over a medium heat, stirring now and then."
        },
        "minutes": 15
      },
      {
        "text": {
          "ru": "Разомните помидоры ложкой, когда кожица начнёт отходить от мякоти.",
          "en": "Crush the tomatoes with a spoon once the skins start to lift from the flesh."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Уваривайте ещё пятнадцать минут, пока масло не выступит по краям отдельным слоем.",
          "en": "Reduce it fifteen minutes more, until the oil rises at the edges as a separate layer."
        },
        "minutes": 15
      },
      {
        "text": {
          "ru": "Посыпьте сушёной мятой и подайте прямо в сковороде с лепёшками.",
          "en": "Scatter with dried mint and serve it in the pan with flatbread."
        },
        "minutes": 4
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
    "contentFidelityAcceptedByWriter": true,
    "catalogMappingReviewed": false,
    "dietIndependentlyReviewed": false,
    "crossContactKnown": false
  },
  "scopedReviewEvidence": {
    "id": "unitools:galayet-bandora",
    "name": "Galayet bandora",
    "nativeRecord": {
      "id": "unitools:galayet-bandora",
      "pendingReview": true,
      "sourceRecordSha256": "f9d11429ebd547f1f909c27d3742d941e61f434ea36747add91b52000089b56e",
      "name": "Galayet bandora",
      "nameTranslations": {
        "ru": "Галает бандора",
        "en": "Galayet bandora"
      },
      "cuisine": "Jordanian cuisine",
      "baseServings": 4,
      "nativeName": "قلاية بندورة",
      "country": "JO",
      "sourceCategory": "main",
      "mealEligibility": "pending_review",
      "sourceBaseServings": 4,
      "servingScaling": {
        "status": "source_base_only",
        "policy": "No automatic damped/fixed scaling or rounding"
      },
      "sourceDietClaims": [
        "vegetarian",
        "vegan"
      ],
      "dietReview": "unknown_not_inferred_vegetarian",
      "sourceNutritionClaimUnverified": {
        "calories": 380,
        "protein": 8,
        "fat": 26,
        "carbs": 32
      },
      "computedNutrition": {
        "kcal": null,
        "p": null,
        "c": null,
        "f": null
      },
      "plannerEligibility": "blocked_pending_semantic_review",
      "ingredients": [
        {
          "lineId": "src:unitools:galayet-bandora:001",
          "source": {
            "id": "tomato",
            "name": {
              "ru": "Помидоры",
              "en": "Tomatoes"
            },
            "quantity": 1.2,
            "unit": "kg",
            "scaling": "linear",
            "note": {
              "ru": "спелые",
              "en": "ripe"
            }
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/0",
            "source_line_sha256": "7edab73c84a6750016f3c94c9c2b1d1b599ac275ad4910edae7a7ff14650b5c6"
          },
          "catalogMapping": {
            "status": "source_specification_retained",
            "catalogId": null,
            "priorTargetUnverified": "tomato"
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Tomatoes 1.2 kg ripe retained without piece conversion"
        },
        {
          "lineId": "src:unitools:galayet-bandora:002",
          "source": {
            "id": "oliveoil",
            "name": {
              "ru": "Оливковое масло",
              "en": "Olive oil"
            },
            "quantity": 120,
            "unit": "ml",
            "scaling": "linear",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/1",
            "source_line_sha256": "98a2392f574e7eb240332dfe2b3c7ef071d74d1b3bb80f32384f86c820b53874"
          },
          "catalogMapping": {
            "status": "source_identity_retained",
            "catalogId": null,
            "priorTargetUnverified": "oil"
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Olive oil 120 ml retained without adding canola alternative"
        },
        {
          "lineId": "src:unitools:galayet-bandora:003",
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
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/2",
            "source_line_sha256": "b7e6022e985e1af6ae9c35fc3dbb4daa40efa607d58d565742f304c611726353"
          },
          "catalogMapping": {
            "status": "source_quantity_retained",
            "catalogId": null,
            "priorTargetUnverified": "garlic"
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Garlic 6 clove retained"
        },
        {
          "lineId": "src:unitools:galayet-bandora:004",
          "source": {
            "id": "chili",
            "name": {
              "ru": "Зелёный острый перец",
              "en": "Green chilli"
            },
            "quantity": 3,
            "unit": "piece",
            "scaling": "damped",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/3",
            "source_line_sha256": "286bafa0de8b4aed16c0d8bcc571c12fa6c74e64265da31c4ec3d00619b8a9bd"
          },
          "catalogMapping": {
            "status": "source_quantity_retained",
            "catalogId": null,
            "priorTargetUnverified": "green_chilli"
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Green chilli 3 piece retained without cultivar assumption"
        },
        {
          "lineId": "src:unitools:galayet-bandora:005",
          "source": {
            "id": "onion",
            "name": {
              "ru": "Лук",
              "en": "Onion"
            },
            "quantity": 1,
            "unit": "piece",
            "scaling": "linear",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/4",
            "source_line_sha256": "d610052f95d7064c703591c42d07936e94fa961502b3cf14ad17dba29ef869e8"
          },
          "catalogMapping": {
            "status": "source_identity_retained",
            "catalogId": null,
            "priorTargetUnverified": "onion"
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Onion 1 piece retained without type assumption"
        },
        {
          "lineId": "src:unitools:galayet-bandora:006",
          "source": {
            "id": "flatbread",
            "name": {
              "ru": "Лепёшки",
              "en": "Flatbreads"
            },
            "quantity": 4,
            "unit": "piece",
            "scaling": "linear",
            "note": {
              "ru": "к подаче",
              "en": "to serve"
            }
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/5",
            "source_line_sha256": "05747f242e72c06879335b125da026db70aa6dc33319a2b23100a4139caac523"
          },
          "catalogMapping": {
            "status": "source_composite_retained",
            "catalogId": null,
            "priorTargetUnverified": "flatbread"
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Flatbreads 4 piece to serve retained; no substitution to naan/pita or guessed constituent/allergen list"
        },
        {
          "lineId": "src:unitools:galayet-bandora:007",
          "source": {
            "id": "mint",
            "name": {
              "ru": "Сушёная мята",
              "en": "Dried mint"
            },
            "quantity": 1,
            "unit": "tsp",
            "scaling": "damped",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/6",
            "source_line_sha256": "9546b02c17e6b6e17b400a2420525858bb692552507f1717d18d3a78b587adaf"
          },
          "catalogMapping": {
            "status": "source_specification_retained",
            "catalogId": null,
            "priorTargetUnverified": "mint"
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Dried mint 1 tsp retained, no fresh mint substitution"
        },
        {
          "lineId": "src:unitools:galayet-bandora:008",
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
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/470/ingredients/7",
            "source_line_sha256": "c5e6982bd0035f9dcf83f5bc46a7a31eee0b30e7249788107bd2a47bb41d74d9"
          },
          "catalogMapping": {
            "status": "source_line_restored",
            "catalogId": null,
            "priorTargetUnverified": null
          },
          "nutrition": {
            "kcal": null,
            "p": null,
            "c": null,
            "f": null,
            "status": "unverified_source_food_form"
          },
          "yield": {
            "status": "unknown_not_assumed",
            "edibleFraction": null
          },
          "allergyReview": {
            "status": "unverified_not_safe",
            "evidence": []
          },
          "reviewNote": "Salt null/toTaste retained"
        }
      ],
      "orderedSteps": [
        {
          "text": {
            "ru": "Нарежьте помидоры крупными дольками, не снимая кожуру и не удаляя семена.",
            "en": "Cut the tomatoes into large wedges, skins and seeds left in."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "Разогрейте оливковое масло в широкой сковороде и обжарьте лук до мягкости.",
            "en": "Heat the olive oil in a wide pan and soften the onion in it."
          },
          "minutes": 8
        },
        {
          "text": {
            "ru": "Добавьте раздавленный чеснок и зелёный перец целиком и прогрейте минуту.",
            "en": "Add the crushed garlic and the whole green chillies and warm them a minute."
          },
          "minutes": 3
        },
        {
          "text": {
            "ru": "Выложите помидоры, посолите и тушите на среднем огне, изредка помешивая.",
            "en": "Tip in the tomatoes, salt them and stew over a medium heat, stirring now and then."
          },
          "minutes": 15
        },
        {
          "text": {
            "ru": "Разомните помидоры ложкой, когда кожица начнёт отходить от мякоти.",
            "en": "Crush the tomatoes with a spoon once the skins start to lift from the flesh."
          },
          "minutes": 5
        },
        {
          "text": {
            "ru": "Уваривайте ещё пятнадцать минут, пока масло не выступит по краям отдельным слоем.",
            "en": "Reduce it fifteen minutes more, until the oil rises at the edges as a separate layer."
          },
          "minutes": 15
        },
        {
          "text": {
            "ru": "Посыпьте сушёной мятой и подайте прямо в сковороде с лепёшками.",
            "en": "Scatter with dried mint and serve it in the pan with flatbread."
          },
          "minutes": 4
        }
      ],
      "steps": [
        {
          "text": {
            "ru": "Нарежьте помидоры крупными дольками, не снимая кожуру и не удаляя семена.",
            "en": "Cut the tomatoes into large wedges, skins and seeds left in."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "Разогрейте оливковое масло в широкой сковороде и обжарьте лук до мягкости.",
            "en": "Heat the olive oil in a wide pan and soften the onion in it."
          },
          "minutes": 8
        },
        {
          "text": {
            "ru": "Добавьте раздавленный чеснок и зелёный перец целиком и прогрейте минуту.",
            "en": "Add the crushed garlic and the whole green chillies and warm them a minute."
          },
          "minutes": 3
        },
        {
          "text": {
            "ru": "Выложите помидоры, посолите и тушите на среднем огне, изредка помешивая.",
            "en": "Tip in the tomatoes, salt them and stew over a medium heat, stirring now and then."
          },
          "minutes": 15
        },
        {
          "text": {
            "ru": "Разомните помидоры ложкой, когда кожица начнёт отходить от мякоти.",
            "en": "Crush the tomatoes with a spoon once the skins start to lift from the flesh."
          },
          "minutes": 5
        },
        {
          "text": {
            "ru": "Уваривайте ещё пятнадцать минут, пока масло не выступит по краям отдельным слоем.",
            "en": "Reduce it fifteen minutes more, until the oil rises at the edges as a separate layer."
          },
          "minutes": 15
        },
        {
          "text": {
            "ru": "Посыпьте сушёной мятой и подайте прямо в сковороде с лепёшками.",
            "en": "Scatter with dried mint and serve it in the pan with flatbread."
          },
          "minutes": 4
        }
      ],
      "lines": [
        {
          "lineRef": "src:unitools:galayet-bandora:001",
          "raw": "Tomatoes",
          "qty": 1.2,
          "unit": "kg",
          "note": {
            "ru": "спелые",
            "en": "ripe"
          },
          "scaling": "linear",
          "source": {
            "id": "tomato",
            "name": {
              "ru": "Помидоры",
              "en": "Tomatoes"
            },
            "quantity": 1.2,
            "unit": "kg",
            "scaling": "linear",
            "note": {
              "ru": "спелые",
              "en": "ripe"
            }
          }
        },
        {
          "lineRef": "src:unitools:galayet-bandora:002",
          "raw": "Olive oil",
          "qty": 120,
          "unit": "ml",
          "note": null,
          "scaling": "linear",
          "source": {
            "id": "oliveoil",
            "name": {
              "ru": "Оливковое масло",
              "en": "Olive oil"
            },
            "quantity": 120,
            "unit": "ml",
            "scaling": "linear",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:galayet-bandora:003",
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
          }
        },
        {
          "lineRef": "src:unitools:galayet-bandora:004",
          "raw": "Green chilli",
          "qty": 3,
          "unit": "piece",
          "note": null,
          "scaling": "damped",
          "source": {
            "id": "chili",
            "name": {
              "ru": "Зелёный острый перец",
              "en": "Green chilli"
            },
            "quantity": 3,
            "unit": "piece",
            "scaling": "damped",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:galayet-bandora:005",
          "raw": "Onion",
          "qty": 1,
          "unit": "piece",
          "note": null,
          "scaling": "linear",
          "source": {
            "id": "onion",
            "name": {
              "ru": "Лук",
              "en": "Onion"
            },
            "quantity": 1,
            "unit": "piece",
            "scaling": "linear",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:galayet-bandora:006",
          "raw": "Flatbreads",
          "qty": 4,
          "unit": "piece",
          "note": {
            "ru": "к подаче",
            "en": "to serve"
          },
          "scaling": "linear",
          "source": {
            "id": "flatbread",
            "name": {
              "ru": "Лепёшки",
              "en": "Flatbreads"
            },
            "quantity": 4,
            "unit": "piece",
            "scaling": "linear",
            "note": {
              "ru": "к подаче",
              "en": "to serve"
            }
          }
        },
        {
          "lineRef": "src:unitools:galayet-bandora:007",
          "raw": "Dried mint",
          "qty": 1,
          "unit": "tsp",
          "note": null,
          "scaling": "damped",
          "source": {
            "id": "mint",
            "name": {
              "ru": "Сушёная мята",
              "en": "Dried mint"
            },
            "quantity": 1,
            "unit": "tsp",
            "scaling": "damped",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:galayet-bandora:008",
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
          }
        }
      ],
      "sourceRecord": {
        "slug": "galayet-bandora",
        "country": "JO",
        "name": {
          "ru": "Галает бандора",
          "en": "Galayet bandora"
        },
        "nativeName": "قلاية بندورة",
        "summary": {
          "ru": "Помидоры, уваренные в оливковом масле с чили и чесноком, до состояния густого соуса.",
          "en": "Tomatoes cooked down in olive oil with chilli and garlic to a thick sauce."
        },
        "category": "main",
        "diets": [
          "vegetarian",
          "vegan"
        ],
        "difficulty": "easy",
        "baseServings": 4,
        "prepMinutes": 15,
        "cookMinutes": 35,
        "nutritionPerServing": {
          "calories": 380,
          "protein": 8,
          "fat": 26,
          "carbs": 32
        },
        "ingredients": [
          {
            "id": "tomato",
            "name": {
              "ru": "Помидоры",
              "en": "Tomatoes"
            },
            "quantity": 1.2,
            "unit": "kg",
            "scaling": "linear",
            "note": {
              "ru": "спелые",
              "en": "ripe"
            }
          },
          {
            "id": "oliveoil",
            "name": {
              "ru": "Оливковое масло",
              "en": "Olive oil"
            },
            "quantity": 120,
            "unit": "ml",
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
            "id": "chili",
            "name": {
              "ru": "Зелёный острый перец",
              "en": "Green chilli"
            },
            "quantity": 3,
            "unit": "piece",
            "scaling": "damped",
            "note": null
          },
          {
            "id": "onion",
            "name": {
              "ru": "Лук",
              "en": "Onion"
            },
            "quantity": 1,
            "unit": "piece",
            "scaling": "linear",
            "note": null
          },
          {
            "id": "flatbread",
            "name": {
              "ru": "Лепёшки",
              "en": "Flatbreads"
            },
            "quantity": 4,
            "unit": "piece",
            "scaling": "linear",
            "note": {
              "ru": "к подаче",
              "en": "to serve"
            }
          },
          {
            "id": "mint",
            "name": {
              "ru": "Сушёная мята",
              "en": "Dried mint"
            },
            "quantity": 1,
            "unit": "tsp",
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
              "ru": "Нарежьте помидоры крупными дольками, не снимая кожуру и не удаляя семена.",
              "en": "Cut the tomatoes into large wedges, skins and seeds left in."
            },
            "minutes": 10
          },
          {
            "text": {
              "ru": "Разогрейте оливковое масло в широкой сковороде и обжарьте лук до мягкости.",
              "en": "Heat the olive oil in a wide pan and soften the onion in it."
            },
            "minutes": 8
          },
          {
            "text": {
              "ru": "Добавьте раздавленный чеснок и зелёный перец целиком и прогрейте минуту.",
              "en": "Add the crushed garlic and the whole green chillies and warm them a minute."
            },
            "minutes": 3
          },
          {
            "text": {
              "ru": "Выложите помидоры, посолите и тушите на среднем огне, изредка помешивая.",
              "en": "Tip in the tomatoes, salt them and stew over a medium heat, stirring now and then."
            },
            "minutes": 15
          },
          {
            "text": {
              "ru": "Разомните помидоры ложкой, когда кожица начнёт отходить от мякоти.",
              "en": "Crush the tomatoes with a spoon once the skins start to lift from the flesh."
            },
            "minutes": 5
          },
          {
            "text": {
              "ru": "Уваривайте ещё пятнадцать минут, пока масло не выступит по краям отдельным слоем.",
              "en": "Reduce it fifteen minutes more, until the oil rises at the edges as a separate layer."
            },
            "minutes": 15
          },
          {
            "text": {
              "ru": "Посыпьте сушёной мятой и подайте прямо в сковороде с лепёшками.",
              "en": "Scatter with dried mint and serve it in the pan with flatbread."
            },
            "minutes": 4
          }
        ]
      },
      "omittedFields": [
        "photo"
      ],
      "attribution": {
        "name": "UniTools",
        "url": "https://theunitools.com/en/data",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        "changes": "Photos omitted; ingredient and step text/quantities unchanged; review metadata added."
      }
    },
    "sourceContentReview": {
      "ingredientsAndMethodRead": true,
      "allNamedIngredientLinesTraced": true,
      "baseServings": 4,
      "noCatalogSubstitutions": true,
      "mealBasis": {
        "sourceCategory": "main",
        "sourcePairing": "Flatbreads 4 piece, to serve, explicitly included"
      },
      "status": "reviewed_original_content_not_cooking_test"
    },
    "rights": {
      "sourceLicenseClaim": "CC BY-SA 4.0",
      "credit": "UniTools - theunitools.com",
      "source": "https://theunitools.com/en/data",
      "license": "https://creativecommons.org/licenses/by-sa/4.0/",
      "adaptedDataLicense": "CC BY-SA 4.0",
      "photosIncluded": false,
      "changeNotice": "Recipe selection, photo omission and review metadata only. Original source quantities, names, scaling, notes and methods unchanged."
    },
    "lineReviews": [
      {
        "lineRef": "src:unitools:galayet-bandora:001",
        "raw": "Tomatoes",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 1.2,
        "sourceUnit": "kg",
        "sourceNote": {
          "ru": "спелые",
          "en": "ripe"
        },
        "sourceScaling": "linear",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true
      },
      {
        "lineRef": "src:unitools:galayet-bandora:002",
        "raw": "Olive oil",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 120,
        "sourceUnit": "ml",
        "sourceNote": null,
        "sourceScaling": "linear",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true,
        "consumedFraction": null,
        "consumedFractionStatus": "unknown_no_absorption_assumption"
      },
      {
        "lineRef": "src:unitools:galayet-bandora:003",
        "raw": "Garlic",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 6,
        "sourceUnit": "clove",
        "sourceNote": null,
        "sourceScaling": "damped",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true
      },
      {
        "lineRef": "src:unitools:galayet-bandora:004",
        "raw": "Green chilli",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 3,
        "sourceUnit": "piece",
        "sourceNote": null,
        "sourceScaling": "damped",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true
      },
      {
        "lineRef": "src:unitools:galayet-bandora:005",
        "raw": "Onion",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 1,
        "sourceUnit": "piece",
        "sourceNote": null,
        "sourceScaling": "linear",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true
      },
      {
        "lineRef": "src:unitools:galayet-bandora:006",
        "raw": "Flatbreads",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 4,
        "sourceUnit": "piece",
        "sourceNote": {
          "ru": "к подаче",
          "en": "to serve"
        },
        "sourceScaling": "linear",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true,
          "constituentComposition": true
        },
        "noAllergenAbsenceClaim": true,
        "compositionReview": {
          "status": "unresolved_prepared_component",
          "reason": "Source gives no bread formulation. FARE notes bread commonly includes wheat and can include milk, soy, egg, sesame and nuts; this is not proof of any particular flatbread composition.",
          "sourceUrls": [
            "https://theunitools.com/data/unitools-recipes-v1.json",
            "https://www.foodallergy.org/resources/common-allergens-easter-meals"
          ],
          "noDefiniteAllergenCatsApplied": true
        }
      },
      {
        "lineRef": "src:unitools:galayet-bandora:007",
        "raw": "Dried mint",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 1,
        "sourceUnit": "tsp",
        "sourceNote": null,
        "sourceScaling": "damped",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true
      },
      {
        "lineRef": "src:unitools:galayet-bandora:008",
        "raw": "Salt",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": null,
        "sourceUnit": "toTaste",
        "sourceNote": null,
        "sourceScaling": "fixed",
        "ingredientId": null,
        "positiveAllergenEvidence": [],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true
      }
    ],
    "computedNutrition": {
      "status": "unknown",
      "kcal": null,
      "p": null,
      "c": null,
      "f": null
    },
    "allergyReview": {
      "status": "positive_findings_only_incomplete_for_products_and_cross_contact",
      "allergenFreeClaim": false,
      "assessedPurchasedLabels": false,
      "unknownMustNotPassActiveAllergyFilters": true
    },
    "dietReview": {
      "status": "unknown_prepared_bread_composition",
      "proposedAppClass": null,
      "basis": "Source declares vegetarian/vegan, but the flatbread formulation is not supplied. Do not promote source claim to a verified badge or choose a bread recipe."
    },
    "workflowState": "pending_writer_review_not_merge_authority"
  }
};
