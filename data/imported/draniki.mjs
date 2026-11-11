export default {
  "id": "unitools:draniki",
  "kind": "source-native-fixed-base",
  "name": "Draniki",
  "country": "BY",
  "cuisine": "Belarusian cuisine",
  "baseServings": 4,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": "veg",
  "dietClassificationBasis": {
    "status": "source_as_written_assessment_for_writer_review_not_live_badge",
    "proposedAppClass": "veg",
    "basis": "All six source lines inspected; potato, onion, oil, soured cream, dill, salt and pepper. Dairy present, no meat/fish/egg named. Cream is not treated as vegan or dairy-free. Product additives remain label-specific.",
    "sourceLineRefs": [
      "src:unitools:draniki:001",
      "src:unitools:draniki:002",
      "src:unitools:draniki:003",
      "src:unitools:draniki:004",
      "src:unitools:draniki:005",
      "src:unitools:draniki:006"
    ]
  },
  "sourceDietClaims": [
    "vegetarian",
    "gluten-free"
  ],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 20,
    "cookMinutes": 25,
    "stepMinutesTotal": 49,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:draniki:001",
      "name": "Potatoes",
      "quantity": 1,
      "unit": "kg",
      "note": {
        "ru": "крахмалистых сортов",
        "en": "floury variety"
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
        "quantity": 1,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "крахмалистых сортов",
          "en": "floury variety"
        }
      },
      "methodSteps": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:draniki:002",
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
        1,
        2,
        3,
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:draniki:003",
      "name": "Vegetable oil",
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
          "en": "Vegetable oil"
        },
        "quantity": 100,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        4,
        5
      ]
    },
    {
      "lineRef": "src:unitools:draniki:004",
      "name": "Soured cream",
      "quantity": 200,
      "unit": "ml",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "cream",
        "name": {
          "ru": "Сметана",
          "en": "Soured cream"
        },
        "quantity": 200,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        6
      ]
    },
    {
      "lineRef": "src:unitools:draniki:005",
      "name": "Dill",
      "quantity": 20,
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
        "quantity": 20,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6
      ]
    },
    {
      "lineRef": "src:unitools:draniki:006",
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
        3
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Натрите картофель и лук на мелкой тёрке в одну миску.",
        "en": "Grate the potato and onion finely into the same bowl."
      },
      "minutes": 15
    },
    {
      "text": {
        "ru": "Дайте массе постоять три минуты и слейте отстоявшуюся сверху воду, не трогая осадок.",
        "en": "Let the mass stand three minutes and pour off the water that gathers on top, leaving the sediment."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Посолите и поперчите. Ничего больше не добавляйте.",
        "en": "Season with salt and pepper. Add nothing else."
      },
      "minutes": 2
    },
    {
      "text": {
        "ru": "Разогрейте масло на среднем огне и выкладывайте массу столовой ложкой, приплющивая до толщины в полсантиметра.",
        "en": "Heat the oil over medium and drop the mixture in by the spoonful, flattening it to half a centimetre."
      },
      "minutes": 4
    },
    {
      "text": {
        "ru": "Жарьте по три-четыре минуты с каждой стороны до тёмно-золотой хрустящей корки.",
        "en": "Fry three to four minutes a side, to a deep golden crisp crust."
      },
      "minutes": 20
    },
    {
      "text": {
        "ru": "Выложите на бумагу и подавайте немедленно со сметаной и укропом.",
        "en": "Drain on paper and serve immediately with soured cream and dill."
      },
      "minutes": 3
    }
  ],
  "sourceRecord": {
    "slug": "draniki",
    "country": "BY",
    "name": {
      "ru": "Драники",
      "en": "Draniki"
    },
    "nativeName": "Дранікі",
    "summary": {
      "ru": "Картофельные оладьи из тёртого сырого картофеля, жаренные до хрустящей корки, со сметаной.",
      "en": "Potato pancakes from raw grated potato, fried to a crisp edge and served with soured cream."
    },
    "category": "main",
    "diets": [
      "vegetarian",
      "gluten-free"
    ],
    "difficulty": "easy",
    "baseServings": 4,
    "prepMinutes": 20,
    "cookMinutes": 25,
    "nutritionPerServing": {
      "calories": 390,
      "protein": 8,
      "fat": 22,
      "carbs": 42
    },
    "ingredients": [
      {
        "id": "potato",
        "name": {
          "ru": "Картофель",
          "en": "Potatoes"
        },
        "quantity": 1,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "крахмалистых сортов",
          "en": "floury variety"
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
        "note": null
      },
      {
        "id": "oil",
        "name": {
          "ru": "Растительное масло",
          "en": "Vegetable oil"
        },
        "quantity": 100,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "cream",
        "name": {
          "ru": "Сметана",
          "en": "Soured cream"
        },
        "quantity": 200,
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
        "quantity": 20,
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
          "ru": "Натрите картофель и лук на мелкой тёрке в одну миску.",
          "en": "Grate the potato and onion finely into the same bowl."
        },
        "minutes": 15
      },
      {
        "text": {
          "ru": "Дайте массе постоять три минуты и слейте отстоявшуюся сверху воду, не трогая осадок.",
          "en": "Let the mass stand three minutes and pour off the water that gathers on top, leaving the sediment."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Посолите и поперчите. Ничего больше не добавляйте.",
          "en": "Season with salt and pepper. Add nothing else."
        },
        "minutes": 2
      },
      {
        "text": {
          "ru": "Разогрейте масло на среднем огне и выкладывайте массу столовой ложкой, приплющивая до толщины в полсантиметра.",
          "en": "Heat the oil over medium and drop the mixture in by the spoonful, flattening it to half a centimetre."
        },
        "minutes": 4
      },
      {
        "text": {
          "ru": "Жарьте по три-четыре минуты с каждой стороны до тёмно-золотой хрустящей корки.",
          "en": "Fry three to four minutes a side, to a deep golden crisp crust."
        },
        "minutes": 20
      },
      {
        "text": {
          "ru": "Выложите на бумагу и подавайте немедленно со сметаной и укропом.",
          "en": "Drain on paper and serve immediately with soured cream and dill."
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
    "id": "unitools:draniki",
    "name": "Draniki",
    "nativeRecord": {
      "id": "unitools:draniki",
      "pendingReview": true,
      "sourceRecordSha256": "dd11659098653924f1681647b82b6b1e38cc46438d7ad61d0050251731b8c00f",
      "name": "Draniki",
      "nameTranslations": {
        "ru": "Драники",
        "en": "Draniki"
      },
      "cuisine": "Belarusian cuisine",
      "baseServings": 4,
      "nativeName": "Дранікі",
      "country": "BY",
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
        "calories": 390,
        "protein": 8,
        "fat": 22,
        "carbs": 42
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
          "lineId": "src:unitools:draniki:001",
          "source": {
            "id": "potato",
            "name": {
              "ru": "Картофель",
              "en": "Potatoes"
            },
            "quantity": 1,
            "unit": "kg",
            "scaling": "linear",
            "note": {
              "ru": "крахмалистых сортов",
              "en": "floury variety"
            }
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/171/ingredients/0",
            "source_line_sha256": "df28e6ce06aeab0dd467fca2cdf81ba243418933a5ef04d7d8a37c443cb2f877"
          },
          "catalogMapping": {
            "status": "source_specification_retained",
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
          "reviewNote": "Potatoes 1 kg floury variety retained without converting to piece count"
        },
        {
          "lineId": "src:unitools:draniki:002",
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
            "json_pointer": "/recipes/171/ingredients/1",
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
          "reviewNote": "Onion 1 piece retained; no brown-onion assumption"
        },
        {
          "lineId": "src:unitools:draniki:003",
          "source": {
            "id": "oil",
            "name": {
              "ru": "Растительное масло",
              "en": "Vegetable oil"
            },
            "quantity": 100,
            "unit": "ml",
            "scaling": "linear",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/171/ingredients/2",
            "source_line_sha256": "63ab5db9d76d754250781467472d593264311b999c74d441044c90c8d07cf165"
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
          "reviewNote": "Vegetable oil 100 ml retained, type/consumed fraction unknown"
        },
        {
          "lineId": "src:unitools:draniki:004",
          "source": {
            "id": "cream",
            "name": {
              "ru": "Сметана",
              "en": "Soured cream"
            },
            "quantity": 200,
            "unit": "ml",
            "scaling": "linear",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/171/ingredients/3",
            "source_line_sha256": "470e6f79c3109c6e47f629be9b4bdbbb3c7d12fc56af96f7713b3f1626d37131"
          },
          "catalogMapping": {
            "status": "source_identity_retained",
            "catalogId": null,
            "priorTargetUnverified": "sour_cream"
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
          "reviewNote": "Soured cream 200 ml retained; no guessed fat level or density"
        },
        {
          "lineId": "src:unitools:draniki:005",
          "source": {
            "id": "dill",
            "name": {
              "ru": "Укроп",
              "en": "Dill"
            },
            "quantity": 20,
            "unit": "g",
            "scaling": "damped",
            "note": null
          },
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/171/ingredients/4",
            "source_line_sha256": "4055ce9ef3c7997d29f84e749b5b611647c556ee855e409b069b6d1cce782998"
          },
          "catalogMapping": {
            "status": "source_quantity_retained",
            "catalogId": null,
            "priorTargetUnverified": "dill"
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
          "reviewNote": "Dill 20 g retained"
        },
        {
          "lineId": "src:unitools:draniki:006",
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
          "sourceReference": {
            "dataset_sha256": "41fdc0572b7272ca557d2df22a0fac1cc1f18146e97ebd2c8258c395daf87d8a",
            "json_pointer": "/recipes/171/ingredients/5",
            "source_line_sha256": "e8b06a67c83b5e0e9fdaf906387563bf5afa0a31c9f4f5f80c2ae93d1c6dc994"
          },
          "catalogMapping": {
            "status": "source_composite_retained",
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
          "reviewNote": "Salt and pepper null/toTaste retained, no splitting"
        }
      ],
      "orderedSteps": [
        {
          "text": {
            "ru": "Натрите картофель и лук на мелкой тёрке в одну миску.",
            "en": "Grate the potato and onion finely into the same bowl."
          },
          "minutes": 15
        },
        {
          "text": {
            "ru": "Дайте массе постоять три минуты и слейте отстоявшуюся сверху воду, не трогая осадок.",
            "en": "Let the mass stand three minutes and pour off the water that gathers on top, leaving the sediment."
          },
          "minutes": 5
        },
        {
          "text": {
            "ru": "Посолите и поперчите. Ничего больше не добавляйте.",
            "en": "Season with salt and pepper. Add nothing else."
          },
          "minutes": 2
        },
        {
          "text": {
            "ru": "Разогрейте масло на среднем огне и выкладывайте массу столовой ложкой, приплющивая до толщины в полсантиметра.",
            "en": "Heat the oil over medium and drop the mixture in by the spoonful, flattening it to half a centimetre."
          },
          "minutes": 4
        },
        {
          "text": {
            "ru": "Жарьте по три-четыре минуты с каждой стороны до тёмно-золотой хрустящей корки.",
            "en": "Fry three to four minutes a side, to a deep golden crisp crust."
          },
          "minutes": 20
        },
        {
          "text": {
            "ru": "Выложите на бумагу и подавайте немедленно со сметаной и укропом.",
            "en": "Drain on paper and serve immediately with soured cream and dill."
          },
          "minutes": 3
        }
      ],
      "steps": [
        {
          "text": {
            "ru": "Натрите картофель и лук на мелкой тёрке в одну миску.",
            "en": "Grate the potato and onion finely into the same bowl."
          },
          "minutes": 15
        },
        {
          "text": {
            "ru": "Дайте массе постоять три минуты и слейте отстоявшуюся сверху воду, не трогая осадок.",
            "en": "Let the mass stand three minutes and pour off the water that gathers on top, leaving the sediment."
          },
          "minutes": 5
        },
        {
          "text": {
            "ru": "Посолите и поперчите. Ничего больше не добавляйте.",
            "en": "Season with salt and pepper. Add nothing else."
          },
          "minutes": 2
        },
        {
          "text": {
            "ru": "Разогрейте масло на среднем огне и выкладывайте массу столовой ложкой, приплющивая до толщины в полсантиметра.",
            "en": "Heat the oil over medium and drop the mixture in by the spoonful, flattening it to half a centimetre."
          },
          "minutes": 4
        },
        {
          "text": {
            "ru": "Жарьте по три-четыре минуты с каждой стороны до тёмно-золотой хрустящей корки.",
            "en": "Fry three to four minutes a side, to a deep golden crisp crust."
          },
          "minutes": 20
        },
        {
          "text": {
            "ru": "Выложите на бумагу и подавайте немедленно со сметаной и укропом.",
            "en": "Drain on paper and serve immediately with soured cream and dill."
          },
          "minutes": 3
        }
      ],
      "lines": [
        {
          "lineRef": "src:unitools:draniki:001",
          "raw": "Potatoes",
          "qty": 1,
          "unit": "kg",
          "note": {
            "ru": "крахмалистых сортов",
            "en": "floury variety"
          },
          "scaling": "linear",
          "source": {
            "id": "potato",
            "name": {
              "ru": "Картофель",
              "en": "Potatoes"
            },
            "quantity": 1,
            "unit": "kg",
            "scaling": "linear",
            "note": {
              "ru": "крахмалистых сортов",
              "en": "floury variety"
            }
          }
        },
        {
          "lineRef": "src:unitools:draniki:002",
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
          "lineRef": "src:unitools:draniki:003",
          "raw": "Vegetable oil",
          "qty": 100,
          "unit": "ml",
          "note": null,
          "scaling": "linear",
          "source": {
            "id": "oil",
            "name": {
              "ru": "Растительное масло",
              "en": "Vegetable oil"
            },
            "quantity": 100,
            "unit": "ml",
            "scaling": "linear",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:draniki:004",
          "raw": "Soured cream",
          "qty": 200,
          "unit": "ml",
          "note": null,
          "scaling": "linear",
          "source": {
            "id": "cream",
            "name": {
              "ru": "Сметана",
              "en": "Soured cream"
            },
            "quantity": 200,
            "unit": "ml",
            "scaling": "linear",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:draniki:005",
          "raw": "Dill",
          "qty": 20,
          "unit": "g",
          "note": null,
          "scaling": "damped",
          "source": {
            "id": "dill",
            "name": {
              "ru": "Укроп",
              "en": "Dill"
            },
            "quantity": 20,
            "unit": "g",
            "scaling": "damped",
            "note": null
          }
        },
        {
          "lineRef": "src:unitools:draniki:006",
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
          }
        }
      ],
      "sourceRecord": {
        "slug": "draniki",
        "country": "BY",
        "name": {
          "ru": "Драники",
          "en": "Draniki"
        },
        "nativeName": "Дранікі",
        "summary": {
          "ru": "Картофельные оладьи из тёртого сырого картофеля, жаренные до хрустящей корки, со сметаной.",
          "en": "Potato pancakes from raw grated potato, fried to a crisp edge and served with soured cream."
        },
        "category": "main",
        "diets": [
          "vegetarian",
          "gluten-free"
        ],
        "difficulty": "easy",
        "baseServings": 4,
        "prepMinutes": 20,
        "cookMinutes": 25,
        "nutritionPerServing": {
          "calories": 390,
          "protein": 8,
          "fat": 22,
          "carbs": 42
        },
        "ingredients": [
          {
            "id": "potato",
            "name": {
              "ru": "Картофель",
              "en": "Potatoes"
            },
            "quantity": 1,
            "unit": "kg",
            "scaling": "linear",
            "note": {
              "ru": "крахмалистых сортов",
              "en": "floury variety"
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
            "note": null
          },
          {
            "id": "oil",
            "name": {
              "ru": "Растительное масло",
              "en": "Vegetable oil"
            },
            "quantity": 100,
            "unit": "ml",
            "scaling": "linear",
            "note": null
          },
          {
            "id": "cream",
            "name": {
              "ru": "Сметана",
              "en": "Soured cream"
            },
            "quantity": 200,
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
            "quantity": 20,
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
              "ru": "Натрите картофель и лук на мелкой тёрке в одну миску.",
              "en": "Grate the potato and onion finely into the same bowl."
            },
            "minutes": 15
          },
          {
            "text": {
              "ru": "Дайте массе постоять три минуты и слейте отстоявшуюся сверху воду, не трогая осадок.",
              "en": "Let the mass stand three minutes and pour off the water that gathers on top, leaving the sediment."
            },
            "minutes": 5
          },
          {
            "text": {
              "ru": "Посолите и поперчите. Ничего больше не добавляйте.",
              "en": "Season with salt and pepper. Add nothing else."
            },
            "minutes": 2
          },
          {
            "text": {
              "ru": "Разогрейте масло на среднем огне и выкладывайте массу столовой ложкой, приплющивая до толщины в полсантиметра.",
              "en": "Heat the oil over medium and drop the mixture in by the spoonful, flattening it to half a centimetre."
            },
            "minutes": 4
          },
          {
            "text": {
              "ru": "Жарьте по три-четыре минуты с каждой стороны до тёмно-золотой хрустящей корки.",
              "en": "Fry three to four minutes a side, to a deep golden crisp crust."
            },
            "minutes": 20
          },
          {
            "text": {
              "ru": "Выложите на бумагу и подавайте немедленно со сметаной и укропом.",
              "en": "Drain on paper and serve immediately with soured cream and dill."
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
        "lineRef": "src:unitools:draniki:001",
        "raw": "Potatoes",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 1,
        "sourceUnit": "kg",
        "sourceNote": {
          "ru": "крахмалистых сортов",
          "en": "floury variety"
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
        "lineRef": "src:unitools:draniki:002",
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
        "lineRef": "src:unitools:draniki:003",
        "raw": "Vegetable oil",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 100,
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
        "lineRef": "src:unitools:draniki:004",
        "raw": "Soured cream",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 200,
        "sourceUnit": "ml",
        "sourceNote": null,
        "sourceScaling": "linear",
        "ingredientId": null,
        "positiveAllergenEvidence": [
          {
            "category": "dairy",
            "labelName": "milk",
            "basis": "Source line says Soured cream; FSANZ dairy risk profile section 1.8 identifies sour cream among fermented milk products, and FSANZ allergen page lists milk",
            "sourceUrls": [
              "https://theunitools.com/data/unitools-recipes-v1.json",
              "https://www.foodstandards.gov.au/sites/default/files/food-standards-code/proposals/Documents/DAR_P296_Dairy_PPPS_Attach_2%20_App%20_1_6.pdf",
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
        "lineRef": "src:unitools:draniki:005",
        "raw": "Dill",
        "identityDecision": "retain_exact_source_name_and_form_no_existing_catalog_selection",
        "quantityDecision": "retain_source_quantity_and_unit_no_density_piece_or_consumed_yield_conversion",
        "sourceQuantity": 20,
        "sourceUnit": "g",
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
        "lineRef": "src:unitools:draniki:006",
        "raw": "Salt and pepper",
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
      "proposedAppClass": "veg",
      "basis": "All six source lines inspected; potato, onion, oil, soured cream, dill, salt and pepper. Dairy present, no meat/fish/egg named. Cream is not treated as vegan or dairy-free. Product additives remain label-specific.",
      "sourceLineRefs": [
        "src:unitools:draniki:001",
        "src:unitools:draniki:002",
        "src:unitools:draniki:003",
        "src:unitools:draniki:004",
        "src:unitools:draniki:005",
        "src:unitools:draniki:006"
      ]
    },
    "workflowState": "pending_writer_review_not_merge_authority"
  }
};
