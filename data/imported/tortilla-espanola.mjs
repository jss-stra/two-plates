export default {
  "id": "unitools:tortilla-espanola",
  "kind": "source-native-fixed-base",
  "name": "Spanish tortilla",
  "country": "ES",
  "cuisine": "Spanish cuisine",
  "baseServings": 4,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": "egg",
  "dietClassificationBasis": {
    "status": "source_as_written_assessment_for_writer_review_not_live_badge",
    "proposedAppClass": "egg",
    "basis": "Exhaustively inspected five-line source list: potatoes, onion, eggs, olive oil, salt. Egg present; no meat/fish named. This class describes the source recipe only, not an egg-free/vegan claim.",
    "sourceLineRefs": [
      "src:unitools:tortilla-espanola:001",
      "src:unitools:tortilla-espanola:002",
      "src:unitools:tortilla-espanola:003",
      "src:unitools:tortilla-espanola:004",
      "src:unitools:tortilla-espanola:005"
    ]
  },
  "sourceDietClaims": [
    "vegetarian",
    "gluten-free"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 15,
    "cookMinutes": 35,
    "stepMinutesTotal": 40,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:tortilla-espanola:001",
      "name": "Potatoes",
      "quantity": 600,
      "unit": "g",
      "note": {
        "ru": "нарезать тонкими ломтиками",
        "en": "sliced thin"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "potato",
        "name": {
          "ru": "Картофель",
          "en": "Potatoes"
        },
        "quantity": 600,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "нарезать тонкими ломтиками",
          "en": "sliced thin"
        }
      },
      "methodSteps": [
        1,
        2
      ]
    },
    {
      "lineRef": "src:unitools:tortilla-espanola:002",
      "name": "Onion",
      "quantity": 1,
      "unit": "piece",
      "note": {
        "ru": "тонкими полукольцами",
        "en": "thinly sliced"
      },
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
        "note": {
          "ru": "тонкими полукольцами",
          "en": "thinly sliced"
        }
      },
      "methodSteps": [
        1,
        2
      ]
    },
    {
      "lineRef": "src:unitools:tortilla-espanola:003",
      "name": "Eggs",
      "quantity": 6,
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
        "quantity": 6,
        "unit": "piece",
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
      "lineRef": "src:unitools:tortilla-espanola:004",
      "name": "Olive oil",
      "quantity": 400,
      "unit": "ml",
      "note": {
        "ru": "почти всё сольёте обратно",
        "en": "nearly all of it goes back in the bottle"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "oil",
        "name": {
          "ru": "Оливковое масло",
          "en": "Olive oil"
        },
        "quantity": 400,
        "unit": "ml",
        "scaling": "linear",
        "note": {
          "ru": "почти всё сольёте обратно",
          "en": "nearly all of it goes back in the bottle"
        }
      },
      "methodSteps": [
        1,
        2,
        4
      ]
    },
    {
      "lineRef": "src:unitools:tortilla-espanola:005",
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
        "ru": "Разогрейте масло в глубокой сковороде до негорячего состояния — картофель, брошенный внутрь, должен лениво зашипеть, а не затрещать. Положите картофель с луком и посолите.",
        "en": "Heat the oil in a deep pan until it is warm rather than hot — a slice of potato dropped in should sigh, not crackle. Add the potato and onion and salt them."
      },
      "minutes": 3
    },
    {
      "text": {
        "ru": "Томите двадцать минут, изредка переворачивая лопаткой. Готово, когда ломтик легко разламывается о край сковороды. Слейте масло через дуршлаг, картофель оставьте.",
        "en": "Poach for twenty minutes, turning gently now and then. It is ready when a slice breaks easily against the side of the pan. Drain through a colander, keeping the potato."
      },
      "minutes": 20
    },
    {
      "text": {
        "ru": "Взбейте яйца с щепоткой соли и вмешайте в них тёплый картофель. Дайте постоять десять минут: картофель отдаст крахмал, и тортилья будет держать форму.",
        "en": "Beat the eggs with a pinch of salt and fold the warm potato through them. Let it sit for ten minutes: the potato gives up starch and the tortilla holds together for it."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "На сковороде диаметром 24 см с ложкой масла вылейте смесь и жарьте на среднем огне четыре минуты, подводя края лопаткой к центру.",
        "en": "In a 24 cm pan with a spoon of oil, pour the mixture in and cook over medium heat for four minutes, easing the edges towards the middle with a spatula."
      },
      "minutes": 4
    },
    {
      "text": {
        "ru": "Накройте тарелкой, переверните одним движением и верните в сковороду сырой стороной вниз. Ещё три минуты — и центр останется чуть влажным, как и полагается.",
        "en": "Cover with a plate, flip in one movement and slide it back raw side down. Three minutes more leaves the centre slightly loose, which is how it should be."
      },
      "minutes": 3
    }
  ],
  "sourceRecord": {
    "slug": "tortilla-espanola",
    "country": "ES",
    "name": {
      "ru": "Испанская тортилья",
      "en": "Spanish tortilla"
    },
    "nativeName": "Tortilla española",
    "summary": {
      "ru": "Толстый омлет с картофелем и луком, где картофель не жарят, а томят в масле почти до состояния пюре.",
      "en": "A thick omelette of potato and onion, where the potato is not fried but poached in oil until it is nearly a purée."
    },
    "category": "main",
    "diets": [
      "vegetarian",
      "gluten-free"
    ],
    "difficulty": "medium",
    "baseServings": 4,
    "prepMinutes": 15,
    "cookMinutes": 35,
    "nutritionPerServing": {
      "calories": 430,
      "protein": 15,
      "fat": 28,
      "carbs": 30
    },
    "ingredients": [
      {
        "id": "potato",
        "name": {
          "ru": "Картофель",
          "en": "Potatoes"
        },
        "quantity": 600,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "нарезать тонкими ломтиками",
          "en": "sliced thin"
        }
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
        "note": {
          "ru": "тонкими полукольцами",
          "en": "thinly sliced"
        }
      },
      {
        "id": "eggs",
        "name": {
          "ru": "Яйца",
          "en": "Eggs"
        },
        "quantity": 6,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "oil",
        "name": {
          "ru": "Оливковое масло",
          "en": "Olive oil"
        },
        "quantity": 400,
        "unit": "ml",
        "scaling": "linear",
        "note": {
          "ru": "почти всё сольёте обратно",
          "en": "nearly all of it goes back in the bottle"
        }
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
          "ru": "Разогрейте масло в глубокой сковороде до негорячего состояния — картофель, брошенный внутрь, должен лениво зашипеть, а не затрещать. Положите картофель с луком и посолите.",
          "en": "Heat the oil in a deep pan until it is warm rather than hot — a slice of potato dropped in should sigh, not crackle. Add the potato and onion and salt them."
        },
        "minutes": 3
      },
      {
        "text": {
          "ru": "Томите двадцать минут, изредка переворачивая лопаткой. Готово, когда ломтик легко разламывается о край сковороды. Слейте масло через дуршлаг, картофель оставьте.",
          "en": "Poach for twenty minutes, turning gently now and then. It is ready when a slice breaks easily against the side of the pan. Drain through a colander, keeping the potato."
        },
        "minutes": 20
      },
      {
        "text": {
          "ru": "Взбейте яйца с щепоткой соли и вмешайте в них тёплый картофель. Дайте постоять десять минут: картофель отдаст крахмал, и тортилья будет держать форму.",
          "en": "Beat the eggs with a pinch of salt and fold the warm potato through them. Let it sit for ten minutes: the potato gives up starch and the tortilla holds together for it."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "На сковороде диаметром 24 см с ложкой масла вылейте смесь и жарьте на среднем огне четыре минуты, подводя края лопаткой к центру.",
          "en": "In a 24 cm pan with a spoon of oil, pour the mixture in and cook over medium heat for four minutes, easing the edges towards the middle with a spatula."
        },
        "minutes": 4
      },
      {
        "text": {
          "ru": "Накройте тарелкой, переверните одним движением и верните в сковороду сырой стороной вниз. Ещё три минуты — и центр останется чуть влажным, как и полагается.",
          "en": "Cover with a plate, flip in one movement and slide it back raw side down. Three minutes more leaves the centre slightly loose, which is how it should be."
        },
        "minutes": 3
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
    "id": "unitools:tortilla-espanola",
    "name": "Spanish tortilla",
    "nativeRecord": {
      "id": "unitools:tortilla-espanola",
      "pendingReview": true,
      "sourceRecordSha256": "379e7102c3556369cc04639a2b424a975ba2fa5b1c8eb15a673ef1e9ca5747e4",
      "name": "Spanish tortilla",
      "nameTranslations": {
        "ru": "Испанская тортилья",
        "en": "Spanish tortilla"
      },
      "cuisine": "Spanish cuisine",
      "baseServings": 4,
      "nativeName": "Tortilla española",
      "country": "ES",
      "sourceCategory": "main",
      "mealEligibility": "pending_review",
      "sourceBaseServings": 4,
      "servingScaling": {
        "status": "source_base_only",
        "policy": "No automatic damped/fixed scaling or rounding"
      },
      "sourceDietClaims": [
        "vegetarian",
        "gluten-free"
      ],
      "dietReview": "unknown_not_inferred_vegetarian",
      "sourceNutritionClaimUnverified": {
        "calories": 430,
        "protein": 15,
        "fat": 28,
        "carbs": 30
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
          "lineId": "src:unitools:tortilla-espanola:001",
          "source": {
            "id": "potato",
            "name": {
              "ru": "Картофель",
              "en": "Potatoes"
            },
            "quantity": 600,
            "unit": "g",
            "scaling": "linear",
            "note": {
              "ru": "нарезать тонкими ломтиками",
              "en": "sliced thin"
            }
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/11/ingredients/0",
            "source_line_sha256": "9325cac31b8e34b14cc966853fb40b58c01e4b5de19b783b9f30f0dd87da577b"
          },
          "catalogMapping": {
            "status": "source_quantity_retained",
            "catalogId": null,
            "priorTargetUnverified": "potato"
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
          "reviewNote": "Potatoes 600 g retained; prior 3 pieces assumed 200g per potato"
        },
        {
          "lineId": "src:unitools:tortilla-espanola:002",
          "source": {
            "id": "onion",
            "name": {
              "ru": "Лук",
              "en": "Onion"
            },
            "quantity": 1,
            "unit": "piece",
            "scaling": "linear",
            "note": {
              "ru": "тонкими полукольцами",
              "en": "thinly sliced"
            }
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/11/ingredients/1",
            "source_line_sha256": "632e4beec3b1c264a1a0c613d15417d48e2eb9724f4a1439da5f0c56a139441b"
          },
          "catalogMapping": {
            "status": "mapping_rejected_narrowing",
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
          "reviewNote": "Source Onion does not specify brown; prior target Brown onion narrows source"
        },
        {
          "lineId": "src:unitools:tortilla-espanola:003",
          "source": {
            "id": "eggs",
            "name": {
              "ru": "Яйца",
              "en": "Eggs"
            },
            "quantity": 6,
            "unit": "piece",
            "scaling": "linear",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/11/ingredients/2",
            "source_line_sha256": "48b965fa95ce85f88b1bcfcc7c38a9bbbdd3dc2b0b2ea0fa0d69c1388ecc1443"
          },
          "catalogMapping": {
            "status": "identity_name_match",
            "catalogId": null,
            "priorTargetUnverified": "egg"
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
          "reviewNote": "Eggs 6 piece retained"
        },
        {
          "lineId": "src:unitools:tortilla-espanola:004",
          "source": {
            "id": "oil",
            "name": {
              "ru": "Оливковое масло",
              "en": "Olive oil"
            },
            "quantity": 400,
            "unit": "ml",
            "scaling": "linear",
            "note": {
              "ru": "почти всё сольёте обратно",
              "en": "nearly all of it goes back in the bottle"
            }
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/11/ingredients/3",
            "source_line_sha256": "d71907b579510e8842960ae0cf73db4ef4e4272e5ceaedec8a1af795374edf03"
          },
          "catalogMapping": {
            "status": "purchase_vs_consumed_distinguished",
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
          "reviewNote": "Purchase/cooking input Olive oil 400 ml retained; note says nearly all goes back in bottle; consumed amount UNKNOWN, not assumed 120 ml"
        },
        {
          "lineId": "src:unitools:tortilla-espanola:005",
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
            "json_pointer": "/recipes/11/ingredients/4",
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
          "reviewNote": "Salt null/toTaste retained; old generator dropped line"
        }
      ],
      "orderedSteps": [
        {
          "text": {
            "ru": "Разогрейте масло в глубокой сковороде до негорячего состояния — картофель, брошенный внутрь, должен лениво зашипеть, а не затрещать. Положите картофель с луком и посолите.",
            "en": "Heat the oil in a deep pan until it is warm rather than hot — a slice of potato dropped in should sigh, not crackle. Add the potato and onion and salt them."
          },
          "minutes": 3
        },
        {
          "text": {
            "ru": "Томите двадцать минут, изредка переворачивая лопаткой. Готово, когда ломтик легко разламывается о край сковороды. Слейте масло через дуршлаг, картофель оставьте.",
            "en": "Poach for twenty minutes, turning gently now and then. It is ready when a slice breaks easily against the side of the pan. Drain through a colander, keeping the potato."
          },
          "minutes": 20
        },
        {
          "text": {
            "ru": "Взбейте яйца с щепоткой соли и вмешайте в них тёплый картофель. Дайте постоять десять минут: картофель отдаст крахмал, и тортилья будет держать форму.",
            "en": "Beat the eggs with a pinch of salt and fold the warm potato through them. Let it sit for ten minutes: the potato gives up starch and the tortilla holds together for it."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "На сковороде диаметром 24 см с ложкой масла вылейте смесь и жарьте на среднем огне четыре минуты, подводя края лопаткой к центру.",
            "en": "In a 24 cm pan with a spoon of oil, pour the mixture in and cook over medium heat for four minutes, easing the edges towards the middle with a spatula."
          },
          "minutes": 4
        },
        {
          "text": {
            "ru": "Накройте тарелкой, переверните одним движением и верните в сковороду сырой стороной вниз. Ещё три минуты — и центр останется чуть влажным, как и полагается.",
            "en": "Cover with a plate, flip in one movement and slide it back raw side down. Three minutes more leaves the centre slightly loose, which is how it should be."
          },
          "minutes": 3
        }
      ],
      "steps": [
        {
          "text": {
            "ru": "Разогрейте масло в глубокой сковороде до негорячего состояния — картофель, брошенный внутрь, должен лениво зашипеть, а не затрещать. Положите картофель с луком и посолите.",
            "en": "Heat the oil in a deep pan until it is warm rather than hot — a slice of potato dropped in should sigh, not crackle. Add the potato and onion and salt them."
          },
          "minutes": 3
        },
        {
          "text": {
            "ru": "Томите двадцать минут, изредка переворачивая лопаткой. Готово, когда ломтик легко разламывается о край сковороды. Слейте масло через дуршлаг, картофель оставьте.",
            "en": "Poach for twenty minutes, turning gently now and then. It is ready when a slice breaks easily against the side of the pan. Drain through a colander, keeping the potato."
          },
          "minutes": 20
        },
        {
          "text": {
            "ru": "Взбейте яйца с щепоткой соли и вмешайте в них тёплый картофель. Дайте постоять десять минут: картофель отдаст крахмал, и тортилья будет держать форму.",
            "en": "Beat the eggs with a pinch of salt and fold the warm potato through them. Let it sit for ten minutes: the potato gives up starch and the tortilla holds together for it."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "На сковороде диаметром 24 см с ложкой масла вылейте смесь и жарьте на среднем огне четыре минуты, подводя края лопаткой к центру.",
            "en": "In a 24 cm pan with a spoon of oil, pour the mixture in and cook over medium heat for four minutes, easing the edges towards the middle with a spatula."
          },
          "minutes": 4
        },
        {
          "text": {
            "ru": "Накройте тарелкой, переверните одним движением и верните в сковороду сырой стороной вниз. Ещё три минуты — и центр останется чуть влажным, как и полагается.",
            "en": "Cover with a plate, flip in one movement and slide it back raw side down. Three minutes more leaves the centre slightly loose, which is how it should be."
          },
          "minutes": 3
        }
      ],
      "lines": [
        {
          "lineRef": "src:unitools:tortilla-espanola:001",
          "raw": "Potatoes",
          "qty": 600,
          "unit": "g",
          "note": {
            "ru": "нарезать тонкими ломтиками",
            "en": "sliced thin"
          },
          "scaling": "linear",
          "source": {
            "id": "potato",
            "name": {
              "ru": "Картофель",
              "en": "Potatoes"
            },
            "quantity": 600,
            "unit": "g",
            "scaling": "linear",
            "note": {
              "ru": "нарезать тонкими ломтиками",
              "en": "sliced thin"
            }
          }
        },
        {
          "lineRef": "src:unitools:tortilla-espanola:002",
          "raw": "Onion",
          "qty": 1,
          "unit": "piece",
          "note": {
            "ru": "тонкими полукольцами",
            "en": "thinly sliced"
          },
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
            "note": {
              "ru": "тонкими полукольцами",
              "en": "thinly sliced"
            }
          }
        },
        {
          "lineRef": "src:unitools:tortilla-espanola:003",
          "raw": "Eggs",
          "qty": 6,
          "unit": "piece",
          "note": null,
          "scaling": "linear",
          "source": {
            "id": "eggs",
            "name": {
              "ru": "Яйца",
              "en": "Eggs"
            },
            "quantity": 6,
            "unit": "piece",
            "scaling": "linear",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:tortilla-espanola:004",
          "raw": "Olive oil",
          "qty": 400,
          "unit": "ml",
          "note": {
            "ru": "почти всё сольёте обратно",
            "en": "nearly all of it goes back in the bottle"
          },
          "scaling": "linear",
          "source": {
            "id": "oil",
            "name": {
              "ru": "Оливковое масло",
              "en": "Olive oil"
            },
            "quantity": 400,
            "unit": "ml",
            "scaling": "linear",
            "note": {
              "ru": "почти всё сольёте обратно",
              "en": "nearly all of it goes back in the bottle"
            }
          }
        },
        {
          "lineRef": "src:unitools:tortilla-espanola:005",
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
        "slug": "tortilla-espanola",
        "country": "ES",
        "name": {
          "ru": "Испанская тортилья",
          "en": "Spanish tortilla"
        },
        "nativeName": "Tortilla española",
        "summary": {
          "ru": "Толстый омлет с картофелем и луком, где картофель не жарят, а томят в масле почти до состояния пюре.",
          "en": "A thick omelette of potato and onion, where the potato is not fried but poached in oil until it is nearly a purée."
        },
        "category": "main",
        "diets": [
          "vegetarian",
          "gluten-free"
        ],
        "difficulty": "medium",
        "baseServings": 4,
        "prepMinutes": 15,
        "cookMinutes": 35,
        "nutritionPerServing": {
          "calories": 430,
          "protein": 15,
          "fat": 28,
          "carbs": 30
        },
        "ingredients": [
          {
            "id": "potato",
            "name": {
              "ru": "Картофель",
              "en": "Potatoes"
            },
            "quantity": 600,
            "unit": "g",
            "scaling": "linear",
            "note": {
              "ru": "нарезать тонкими ломтиками",
              "en": "sliced thin"
            }
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
            "note": {
              "ru": "тонкими полукольцами",
              "en": "thinly sliced"
            }
          },
          {
            "id": "eggs",
            "name": {
              "ru": "Яйца",
              "en": "Eggs"
            },
            "quantity": 6,
            "unit": "piece",
            "scaling": "linear",
            "note": null
          },
          {
            "id": "oil",
            "name": {
              "ru": "Оливковое масло",
              "en": "Olive oil"
            },
            "quantity": 400,
            "unit": "ml",
            "scaling": "linear",
            "note": {
              "ru": "почти всё сольёте обратно",
              "en": "nearly all of it goes back in the bottle"
            }
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
              "ru": "Разогрейте масло в глубокой сковороде до негорячего состояния — картофель, брошенный внутрь, должен лениво зашипеть, а не затрещать. Положите картофель с луком и посолите.",
              "en": "Heat the oil in a deep pan until it is warm rather than hot — a slice of potato dropped in should sigh, not crackle. Add the potato and onion and salt them."
            },
            "minutes": 3
          },
          {
            "text": {
              "ru": "Томите двадцать минут, изредка переворачивая лопаткой. Готово, когда ломтик легко разламывается о край сковороды. Слейте масло через дуршлаг, картофель оставьте.",
              "en": "Poach for twenty minutes, turning gently now and then. It is ready when a slice breaks easily against the side of the pan. Drain through a colander, keeping the potato."
            },
            "minutes": 20
          },
          {
            "text": {
              "ru": "Взбейте яйца с щепоткой соли и вмешайте в них тёплый картофель. Дайте постоять десять минут: картофель отдаст крахмал, и тортилья будет держать форму.",
              "en": "Beat the eggs with a pinch of salt and fold the warm potato through them. Let it sit for ten minutes: the potato gives up starch and the tortilla holds together for it."
            },
            "minutes": 10
          },
          {
            "text": {
              "ru": "На сковороде диаметром 24 см с ложкой масла вылейте смесь и жарьте на среднем огне четыре минуты, подводя края лопаткой к центру.",
              "en": "In a 24 cm pan with a spoon of oil, pour the mixture in and cook over medium heat for four minutes, easing the edges towards the middle with a spatula."
            },
            "minutes": 4
          },
          {
            "text": {
              "ru": "Накройте тарелкой, переверните одним движением и верните в сковороду сырой стороной вниз. Ещё три минуты — и центр останется чуть влажным, как и полагается.",
              "en": "Cover with a plate, flip in one movement and slide it back raw side down. Three minutes more leaves the centre slightly loose, which is how it should be."
            },
            "minutes": 3
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
        "sourcePairing": null
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
        "lineRef": "src:unitools:tortilla-espanola:001",
        "raw": "Potatoes",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 600,
        "sourceUnit": "g",
        "sourceNote": {
          "ru": "нарезать тонкими ломтиками",
          "en": "sliced thin"
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
        "lineRef": "src:unitools:tortilla-espanola:002",
        "raw": "Onion",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 1,
        "sourceUnit": "piece",
        "sourceNote": {
          "ru": "тонкими полукольцами",
          "en": "thinly sliced"
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
        "lineRef": "src:unitools:tortilla-espanola:003",
        "raw": "Eggs",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 6,
        "sourceUnit": "piece",
        "sourceNote": null,
        "sourceScaling": "linear",
        "ingredientId": null,
        "positiveAllergenEvidence": [
          {
            "category": "egg",
            "basis": "Source line explicitly Eggs, quantity 6 piece; FARE says eggs and egg products must be avoided for egg allergy; FSANZ lists egg",
            "sourceUrls": [
              "https://theunitools.com/data/unitools-recipes-v1.json",
              "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/egg",
              "https://www.foodstandards.gov.au/consumer/labelling/allergen-labelling"
            ]
          }
        ],
        "unverified": {
          "specificPurchasedProductLabel": true,
          "crossContact": true
        },
        "noAllergenAbsenceClaim": true
      },
      {
        "lineRef": "src:unitools:tortilla-espanola:004",
        "raw": "Olive oil",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 400,
        "sourceUnit": "ml",
        "sourceNote": {
          "ru": "почти всё сольёте обратно",
          "en": "nearly all of it goes back in the bottle"
        },
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
        "lineRef": "src:unitools:tortilla-espanola:005",
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
      "status": "source_as_written_assessment_for_writer_review_not_live_badge",
      "proposedAppClass": "egg",
      "basis": "Exhaustively inspected five-line source list: potatoes, onion, eggs, olive oil, salt. Egg present; no meat/fish named. This class describes the source recipe only, not an egg-free/vegan claim.",
      "sourceLineRefs": [
        "src:unitools:tortilla-espanola:001",
        "src:unitools:tortilla-espanola:002",
        "src:unitools:tortilla-espanola:003",
        "src:unitools:tortilla-espanola:004",
        "src:unitools:tortilla-espanola:005"
      ]
    },
    "workflowState": "pending_writer_review_not_merge_authority",
    "quantityCaveats": [
      "400 ml olive oil is cooking/purchase input. Source drains most and later calls for a spoon in pan. No consumed or additional purchase amount inferred."
    ]
  }
};
