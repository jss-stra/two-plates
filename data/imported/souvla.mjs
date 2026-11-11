export default {
  "id": "unitools:souvla",
  "kind": "source-native-fixed-base",
  "name": "Souvla",
  "country": "CY",
  "cuisine": "Cypriot cuisine",
  "baseServings": 6,
  "nutrition": {
    "kcal": null,
    "protein": null,
    "carbs": null,
    "fat": null
  },
  "nutritionStatus": "unknown",
  "diet": null,
  "dietClassificationBasis": "Product formulation and cross-contact unverified; no independent diet clearance",
  "sourceDietClaims": [],
  "mainProtein": null,
  "sourceTimes": {
    "prepMinutes": 20,
    "cookMinutes": 130,
    "stepMinutesTotal": 228,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:souvla:001",
      "name": "Pork shoulder",
      "quantity": 2.5,
      "unit": "kg",
      "note": {
        "ru": "кусками по 200 г",
        "en": "in 200 g pieces"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "pork",
        "name": {
          "ru": "Свиная лопатка",
          "en": "Pork shoulder"
        },
        "quantity": 2.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "кусками по 200 г",
          "en": "in 200 g pieces"
        }
      },
      "methodSteps": [
        1,
        2,
        4,
        5,
        7
      ],
      "traceStatus": "named_then_meat",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 1,
          "text": {
            "ru": "Нарежьте мясо крупными кусками граммов по двести, с жиром — он нужен.",
            "en": "Cut the meat into large pieces of about two hundred grams, keeping the fat; it is needed."
          }
        },
        {
          "stepNumber": 2,
          "text": {
            "ru": "Обильно посолите и поперчите со всех сторон и оставьте на полчаса при комнатной температуре.",
            "en": "Salt and pepper them generously all over and leave them half an hour at room temperature."
          }
        },
        {
          "stepNumber": 4,
          "text": {
            "ru": "Нанижите куски на вертел, оставляя между ними по сантиметру.",
            "en": "Thread the pieces onto the spit, leaving a centimetre between them."
          }
        },
        {
          "stepNumber": 5,
          "text": {
            "ru": "Вращайте вертел медленно и непрерывно два часа. Мясо должно потемнеть постепенно, а не схватиться коркой сразу.",
            "en": "Turn the spit slowly and continuously for two hours. The meat should darken gradually rather than crust at once."
          }
        },
        {
          "stepNumber": 7,
          "text": {
            "ru": "Снимите, нарежьте крупно и подавайте в пите с луком, помидорами и петрушкой.",
            "en": "Take it off, cut it coarsely and serve in pita with onion, tomato and parsley."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:souvla:002",
      "name": "Lemons",
      "quantity": 3,
      "unit": "piece",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "lemon",
        "name": {
          "ru": "Лимон",
          "en": "Lemons"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 6,
          "text": {
            "ru": "Посыпьте орегано за десять минут до конца и сбрызните лимоном.",
            "en": "Dust with oregano ten minutes before the end and squeeze lemon over."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:souvla:003",
      "name": "Dried oregano",
      "quantity": 2,
      "unit": "tbsp",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "oregano",
        "name": {
          "ru": "Орегано сушёный",
          "en": "Dried oregano"
        },
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 6,
          "text": {
            "ru": "Посыпьте орегано за десять минут до конца и сбрызните лимоном.",
            "en": "Dust with oregano ten minutes before the end and squeeze lemon over."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:souvla:004",
      "name": "Cypriot pita",
      "quantity": 6,
      "unit": "piece",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "pitabread",
        "name": {
          "ru": "Кипрская пита",
          "en": "Cypriot pita"
        },
        "quantity": 6,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        7
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 7,
          "text": {
            "ru": "Снимите, нарежьте крупно и подавайте в пите с луком, помидорами и петрушкой.",
            "en": "Take it off, cut it coarsely and serve in pita with onion, tomato and parsley."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:souvla:005",
      "name": "Red onion",
      "quantity": 2,
      "unit": "piece",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "onion",
        "name": {
          "ru": "Лук красный",
          "en": "Red onion"
        },
        "quantity": 2,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        7
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 7,
          "text": {
            "ru": "Снимите, нарежьте крупно и подавайте в пите с луком, помидорами и петрушкой.",
            "en": "Take it off, cut it coarsely and serve in pita with onion, tomato and parsley."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:souvla:006",
      "name": "Tomatoes",
      "quantity": 3,
      "unit": "piece",
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
        "quantity": 3,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        7
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 7,
          "text": {
            "ru": "Снимите, нарежьте крупно и подавайте в пите с луком, помидорами и петрушкой.",
            "en": "Take it off, cut it coarsely and serve in pita with onion, tomato and parsley."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:souvla:007",
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
        7
      ],
      "traceStatus": "named",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 7,
          "text": {
            "ru": "Снимите, нарежьте крупно и подавайте в пите с луком, помидорами и петрушкой.",
            "en": "Take it off, cut it coarsely and serve in pita with onion, tomato and parsley."
          }
        }
      ]
    },
    {
      "lineRef": "src:unitools:souvla:008",
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
      ],
      "traceStatus": "named_both",
      "verbatimMethodEvidence": [
        {
          "stepNumber": 2,
          "text": {
            "ru": "Обильно посолите и поперчите со всех сторон и оставьте на полчаса при комнатной температуре.",
            "en": "Salt and pepper them generously all over and leave them half an hour at room temperature."
          }
        }
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Нарежьте мясо крупными кусками граммов по двести, с жиром — он нужен.",
        "en": "Cut the meat into large pieces of about two hundred grams, keeping the fat; it is needed."
      },
      "minutes": 15
    },
    {
      "text": {
        "ru": "Обильно посолите и поперчите со всех сторон и оставьте на полчаса при комнатной температуре.",
        "en": "Salt and pepper them generously all over and leave them half an hour at room temperature."
      },
      "minutes": 32
    },
    {
      "text": {
        "ru": "Разожгите угли и разгребите их к краям, оставив центр свободным. Прямой жар под мясом не нужен.",
        "en": "Light the coals and rake them to the sides, leaving the centre clear. Direct heat under the meat is not wanted."
      },
      "minutes": 30
    },
    {
      "text": {
        "ru": "Нанижите куски на вертел, оставляя между ними по сантиметру.",
        "en": "Thread the pieces onto the spit, leaving a centimetre between them."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Вращайте вертел медленно и непрерывно два часа. Мясо должно потемнеть постепенно, а не схватиться коркой сразу.",
        "en": "Turn the spit slowly and continuously for two hours. The meat should darken gradually rather than crust at once."
      },
      "minutes": 125
    },
    {
      "text": {
        "ru": "Посыпьте орегано за десять минут до конца и сбрызните лимоном.",
        "en": "Dust with oregano ten minutes before the end and squeeze lemon over."
      },
      "minutes": 6
    },
    {
      "text": {
        "ru": "Снимите, нарежьте крупно и подавайте в пите с луком, помидорами и петрушкой.",
        "en": "Take it off, cut it coarsely and serve in pita with onion, tomato and parsley."
      },
      "minutes": 10
    }
  ],
  "sourceRecord": {
    "slug": "souvla",
    "country": "CY",
    "name": {
      "ru": "Сувла",
      "en": "Souvla"
    },
    "nativeName": "Σούβλα",
    "summary": {
      "ru": "Крупные куски свинины или ягнёнка на вертеле, медленно вращающиеся над углями два часа.",
      "en": "Large pieces of pork or lamb on a spit, turning slowly over coals for two hours."
    },
    "category": "main",
    "diets": [],
    "difficulty": "easy",
    "baseServings": 6,
    "prepMinutes": 20,
    "cookMinutes": 130,
    "nutritionPerServing": {
      "calories": 720,
      "protein": 52,
      "fat": 42,
      "carbs": 28
    },
    "ingredients": [
      {
        "id": "pork",
        "name": {
          "ru": "Свиная лопатка",
          "en": "Pork shoulder"
        },
        "quantity": 2.5,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "кусками по 200 г",
          "en": "in 200 g pieces"
        }
      },
      {
        "id": "lemon",
        "name": {
          "ru": "Лимон",
          "en": "Lemons"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "oregano",
        "name": {
          "ru": "Орегано сушёный",
          "en": "Dried oregano"
        },
        "quantity": 2,
        "unit": "tbsp",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "pitabread",
        "name": {
          "ru": "Кипрская пита",
          "en": "Cypriot pita"
        },
        "quantity": 6,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "onion",
        "name": {
          "ru": "Лук красный",
          "en": "Red onion"
        },
        "quantity": 2,
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
        "quantity": 3,
        "unit": "piece",
        "scaling": "linear",
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
          "ru": "Нарежьте мясо крупными кусками граммов по двести, с жиром — он нужен.",
          "en": "Cut the meat into large pieces of about two hundred grams, keeping the fat; it is needed."
        },
        "minutes": 15
      },
      {
        "text": {
          "ru": "Обильно посолите и поперчите со всех сторон и оставьте на полчаса при комнатной температуре.",
          "en": "Salt and pepper them generously all over and leave them half an hour at room temperature."
        },
        "minutes": 32
      },
      {
        "text": {
          "ru": "Разожгите угли и разгребите их к краям, оставив центр свободным. Прямой жар под мясом не нужен.",
          "en": "Light the coals and rake them to the sides, leaving the centre clear. Direct heat under the meat is not wanted."
        },
        "minutes": 30
      },
      {
        "text": {
          "ru": "Нанижите куски на вертел, оставляя между ними по сантиметру.",
          "en": "Thread the pieces onto the spit, leaving a centimetre between them."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Вращайте вертел медленно и непрерывно два часа. Мясо должно потемнеть постепенно, а не схватиться коркой сразу.",
          "en": "Turn the spit slowly and continuously for two hours. The meat should darken gradually rather than crust at once."
        },
        "minutes": 125
      },
      {
        "text": {
          "ru": "Посыпьте орегано за десять минут до конца и сбрызните лимоном.",
          "en": "Dust with oregano ten minutes before the end and squeeze lemon over."
        },
        "minutes": 6
      },
      {
        "text": {
          "ru": "Снимите, нарежьте крупно и подавайте в пите с луком, помидорами и петрушкой.",
          "en": "Take it off, cut it coarsely and serve in pita with onion, tomato and parsley."
        },
        "minutes": 10
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
      "All notes read: porkshoulder2.5kg in200gpieces, allothersnull. Approximate200gcutsize method1 not equal to numericportioncount; preserve2.5kg purchasequantity, do notroundto12/13chunks.",
      "All8ingredientlines explicitmethod use; saltANDpepper2 namedbothlanguages. Lemon3piece juice6, no impliedfourthlemon garnish.",
      "Equipmentspit/charcoal not recipeingredients or extra groceryunits. Rotationandindirectheat require properoutdoorgrillequipment.",
      "Roomtemperature30min source2 beforebarbecue doesnotcancel cumulative2/4hr handlingrule or replace refrigeratedstorage. Source2hourscolour endpoint not validated; a separatelyattributed practical porkcentre71Cprobeguide requiredorhold.",
      "Pita/onion/tomato/parsley source7 servingcomponents, no detailedsaladmethodinvented. Productformulations andcrosscontactunknown; dietunknown."
    ],
    "allergenAbsenceClaim": false
  }
};
