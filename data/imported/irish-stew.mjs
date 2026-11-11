export default {
  "id": "unitools:irish-stew",
  "kind": "source-native-fixed-base",
  "name": "Irish stew",
  "country": "IE",
  "cuisine": "Irish cuisine",
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
    "proposedDietStatus": "nonveg_explicit_lamb",
    "notes": [
      "Base6 retained. Lamb1.2kg is bone-in neck OR shoulder, not edible boneless weight or mutton substitute.",
      "Floury potatoes500g first lot and waxy potatoes700g second lot remain separate identities and stage timings. First lot thickens broth, second stays in chunks.",
      "Lamb OR vegetable stock1.2l remains a choice; selecting vegetable stock does not make lamb stew vegetarian. Formulation, salt and allergens unknown.",
      "Method uses meat raw then boils/simmers90min plus40min and rests15min. No standalone browning fat invented. These are source timings, not independently guaranteed safety or elapsed finish time.",
      "Nutrition unknown, including bone yield; milky white broth is a potato effect in source, not evidence of milk."
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
    "prepMinutes": 20,
    "cookMinutes": 150,
    "stepMinutesTotal": 166,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:irish-stew:001",
      "name": "Lamb neck or shoulder",
      "quantity": 1.2,
      "unit": "kg",
      "note": {
        "ru": "на кости, крупными кусками",
        "en": "on the bone, in large pieces"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "lamb",
        "name": {
          "ru": "Баранья шея или лопатка",
          "en": "Lamb neck or shoulder"
        },
        "quantity": 1.2,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "на кости, крупными кусками",
          "en": "on the bone, in large pieces"
        }
      },
      "methodSteps": [
        1,
        2
      ]
    },
    {
      "lineRef": "src:unitools:irish-stew:002",
      "name": "Floury potatoes",
      "quantity": 500,
      "unit": "g",
      "note": {
        "ru": "первая партия",
        "en": "first lot"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "potatofirst",
        "name": {
          "ru": "Рассыпчатый картофель",
          "en": "Floury potatoes"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "первая партия",
          "en": "first lot"
        }
      },
      "methodSteps": [
        1,
        2,
        3
      ]
    },
    {
      "lineRef": "src:unitools:irish-stew:003",
      "name": "Waxy potatoes",
      "quantity": 700,
      "unit": "g",
      "note": {
        "ru": "вторая партия",
        "en": "second lot"
      },
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "potatosecond",
        "name": {
          "ru": "Восковой картофель",
          "en": "Waxy potatoes"
        },
        "quantity": 700,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "вторая партия",
          "en": "second lot"
        }
      },
      "methodSteps": [
        4
      ]
    },
    {
      "lineRef": "src:unitools:irish-stew:004",
      "name": "Onions",
      "quantity": 3,
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
        "quantity": 3,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        2
      ]
    },
    {
      "lineRef": "src:unitools:irish-stew:005",
      "name": "Carrots",
      "quantity": 3,
      "unit": "piece",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "carrot",
        "name": {
          "ru": "Морковь",
          "en": "Carrots"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        2
      ]
    },
    {
      "lineRef": "src:unitools:irish-stew:006",
      "name": "Lamb or vegetable stock",
      "quantity": 1.2,
      "unit": "l",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "stock",
        "name": {
          "ru": "Бараний или овощной бульон",
          "en": "Lamb or vegetable stock"
        },
        "quantity": 1.2,
        "unit": "l",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        2
      ]
    },
    {
      "lineRef": "src:unitools:irish-stew:007",
      "name": "Parsley",
      "quantity": 20,
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
        "quantity": 20,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        5
      ]
    },
    {
      "lineRef": "src:unitools:irish-stew:008",
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
        5
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Уложите мясо в кастрюлю сырым, добавьте лук, морковь и первую партию картофеля, нарезанную крупно.",
        "en": "Put the meat into the pot raw, add the onion, carrot and the first lot of potatoes cut large."
      },
      "minutes": 10
    },
    {
      "text": {
        "ru": "Залейте бульоном, доведите до кипения, снимите пену и томите под крышкой полтора часа на самом слабом огне.",
        "en": "Pour in the stock, bring it to the boil, skim and cook covered for an hour and a half on the lowest heat."
      },
      "minutes": 95
    },
    {
      "text": {
        "ru": "Разомните разварившийся картофель о стенку кастрюли — бульон загустеет и станет молочно-белым.",
        "en": "Crush the collapsed potato against the side of the pot: the broth thickens and turns milky white."
      },
      "minutes": 5
    },
    {
      "text": {
        "ru": "Добавьте вторую партию картофеля крупными кусками и варите ещё сорок минут.",
        "en": "Add the second lot of potatoes in large pieces and cook another forty minutes."
      },
      "minutes": 40
    },
    {
      "text": {
        "ru": "Посолите, поперчите и дайте постоять пятнадцать минут. Посыпьте петрушкой перед подачей.",
        "en": "Season, and let it stand fifteen minutes. Scatter parsley over before serving."
      },
      "minutes": 16
    }
  ],
  "sourceRecord": {
    "slug": "irish-stew",
    "country": "IE",
    "name": {
      "ru": "Ирландское рагу",
      "en": "Irish stew"
    },
    "nativeName": "Irish stew",
    "summary": {
      "ru": "Баранина с картофелем и луком, томлённая без обжарки. Мясо не подрумянивают — в этом весь смысл.",
      "en": "Lamb with potato and onion, stewed without browning. The meat is never seared, and that is the whole point."
    },
    "category": "main",
    "diets": [
      "gluten-free"
    ],
    "difficulty": "easy",
    "baseServings": 6,
    "prepMinutes": 20,
    "cookMinutes": 150,
    "nutritionPerServing": {
      "calories": 620,
      "protein": 42,
      "fat": 28,
      "carbs": 48
    },
    "ingredients": [
      {
        "id": "lamb",
        "name": {
          "ru": "Баранья шея или лопатка",
          "en": "Lamb neck or shoulder"
        },
        "quantity": 1.2,
        "unit": "kg",
        "scaling": "linear",
        "note": {
          "ru": "на кости, крупными кусками",
          "en": "on the bone, in large pieces"
        }
      },
      {
        "id": "potatofirst",
        "name": {
          "ru": "Рассыпчатый картофель",
          "en": "Floury potatoes"
        },
        "quantity": 500,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "первая партия",
          "en": "first lot"
        }
      },
      {
        "id": "potatosecond",
        "name": {
          "ru": "Восковой картофель",
          "en": "Waxy potatoes"
        },
        "quantity": 700,
        "unit": "g",
        "scaling": "linear",
        "note": {
          "ru": "вторая партия",
          "en": "second lot"
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
        "note": null
      },
      {
        "id": "carrot",
        "name": {
          "ru": "Морковь",
          "en": "Carrots"
        },
        "quantity": 3,
        "unit": "piece",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "stock",
        "name": {
          "ru": "Бараний или овощной бульон",
          "en": "Lamb or vegetable stock"
        },
        "quantity": 1.2,
        "unit": "l",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "parsley",
        "name": {
          "ru": "Петрушка",
          "en": "Parsley"
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
          "ru": "Уложите мясо в кастрюлю сырым, добавьте лук, морковь и первую партию картофеля, нарезанную крупно.",
          "en": "Put the meat into the pot raw, add the onion, carrot and the first lot of potatoes cut large."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Залейте бульоном, доведите до кипения, снимите пену и томите под крышкой полтора часа на самом слабом огне.",
          "en": "Pour in the stock, bring it to the boil, skim and cook covered for an hour and a half on the lowest heat."
        },
        "minutes": 95
      },
      {
        "text": {
          "ru": "Разомните разварившийся картофель о стенку кастрюли — бульон загустеет и станет молочно-белым.",
          "en": "Crush the collapsed potato against the side of the pot: the broth thickens and turns milky white."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Добавьте вторую партию картофеля крупными кусками и варите ещё сорок минут.",
          "en": "Add the second lot of potatoes in large pieces and cook another forty minutes."
        },
        "minutes": 40
      },
      {
        "text": {
          "ru": "Посолите, поперчите и дайте постоять пятнадцать минут. Посыпьте петрушкой перед подачей.",
          "en": "Season, and let it stand fifteen minutes. Scatter parsley over before serving."
        },
        "minutes": 16
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
    "id": "unitools:irish-stew",
    "name": "Irish stew",
    "country": "IE",
    "baseServings": 6,
    "lines": [
      {
        "lineRef": "src:unitools:irish-stew:001",
        "raw": "Lamb neck or shoulder",
        "qty": 1.2,
        "unit": "kg",
        "note": {
          "ru": "на кости, крупными кусками",
          "en": "on the bone, in large pieces"
        },
        "scaling": "linear",
        "source": {
          "id": "lamb",
          "name": {
            "ru": "Баранья шея или лопатка",
            "en": "Lamb neck or shoulder"
          },
          "quantity": 1.2,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "на кости, крупными кусками",
            "en": "on the bone, in large pieces"
          }
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
        "lineRef": "src:unitools:irish-stew:002",
        "raw": "Floury potatoes",
        "qty": 500,
        "unit": "g",
        "note": {
          "ru": "первая партия",
          "en": "first lot"
        },
        "scaling": "linear",
        "source": {
          "id": "potatofirst",
          "name": {
            "ru": "Рассыпчатый картофель",
            "en": "Floury potatoes"
          },
          "quantity": 500,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "первая партия",
            "en": "first lot"
          }
        },
        "tracedMethodStepNumbers": [
          1,
          2,
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
        "lineRef": "src:unitools:irish-stew:003",
        "raw": "Waxy potatoes",
        "qty": 700,
        "unit": "g",
        "note": {
          "ru": "вторая партия",
          "en": "second lot"
        },
        "scaling": "linear",
        "source": {
          "id": "potatosecond",
          "name": {
            "ru": "Восковой картофель",
            "en": "Waxy potatoes"
          },
          "quantity": 700,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "вторая партия",
            "en": "second lot"
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
        "lineRef": "src:unitools:irish-stew:004",
        "raw": "Onions",
        "qty": 3,
        "unit": "piece",
        "note": null,
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
        "lineRef": "src:unitools:irish-stew:005",
        "raw": "Carrots",
        "qty": 3,
        "unit": "piece",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "carrot",
          "name": {
            "ru": "Морковь",
            "en": "Carrots"
          },
          "quantity": 3,
          "unit": "piece",
          "scaling": "linear",
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
        "lineRef": "src:unitools:irish-stew:006",
        "raw": "Lamb or vegetable stock",
        "qty": 1.2,
        "unit": "l",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "stock",
          "name": {
            "ru": "Бараний или овощной бульон",
            "en": "Lamb or vegetable stock"
          },
          "quantity": 1.2,
          "unit": "l",
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
        "lineRef": "src:unitools:irish-stew:007",
        "raw": "Parsley",
        "qty": 20,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "parsley",
          "name": {
            "ru": "Петрушка",
            "en": "Parsley"
          },
          "quantity": 20,
          "unit": "g",
          "scaling": "damped",
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
        "lineRef": "src:unitools:irish-stew:008",
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
          "ru": "Уложите мясо в кастрюлю сырым, добавьте лук, морковь и первую партию картофеля, нарезанную крупно.",
          "en": "Put the meat into the pot raw, add the onion, carrot and the first lot of potatoes cut large."
        },
        "minutes": 10
      },
      {
        "text": {
          "ru": "Залейте бульоном, доведите до кипения, снимите пену и томите под крышкой полтора часа на самом слабом огне.",
          "en": "Pour in the stock, bring it to the boil, skim and cook covered for an hour and a half on the lowest heat."
        },
        "minutes": 95
      },
      {
        "text": {
          "ru": "Разомните разварившийся картофель о стенку кастрюли — бульон загустеет и станет молочно-белым.",
          "en": "Crush the collapsed potato against the side of the pot: the broth thickens and turns milky white."
        },
        "minutes": 5
      },
      {
        "text": {
          "ru": "Добавьте вторую партию картофеля крупными кусками и варите ещё сорок минут.",
          "en": "Add the second lot of potatoes in large pieces and cook another forty minutes."
        },
        "minutes": 40
      },
      {
        "text": {
          "ru": "Посолите, поперчите и дайте постоять пятнадцать минут. Посыпьте петрушкой перед подачей.",
          "en": "Season, and let it stand fifteen minutes. Scatter parsley over before serving."
        },
        "minutes": 16
      }
    ],
    "sourceRecord": {
      "slug": "irish-stew",
      "country": "IE",
      "name": {
        "ru": "Ирландское рагу",
        "en": "Irish stew"
      },
      "nativeName": "Irish stew",
      "summary": {
        "ru": "Баранина с картофелем и луком, томлённая без обжарки. Мясо не подрумянивают — в этом весь смысл.",
        "en": "Lamb with potato and onion, stewed without browning. The meat is never seared, and that is the whole point."
      },
      "category": "main",
      "diets": [
        "gluten-free"
      ],
      "difficulty": "easy",
      "baseServings": 6,
      "prepMinutes": 20,
      "cookMinutes": 150,
      "nutritionPerServing": {
        "calories": 620,
        "protein": 42,
        "fat": 28,
        "carbs": 48
      },
      "ingredients": [
        {
          "id": "lamb",
          "name": {
            "ru": "Баранья шея или лопатка",
            "en": "Lamb neck or shoulder"
          },
          "quantity": 1.2,
          "unit": "kg",
          "scaling": "linear",
          "note": {
            "ru": "на кости, крупными кусками",
            "en": "on the bone, in large pieces"
          }
        },
        {
          "id": "potatofirst",
          "name": {
            "ru": "Рассыпчатый картофель",
            "en": "Floury potatoes"
          },
          "quantity": 500,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "первая партия",
            "en": "first lot"
          }
        },
        {
          "id": "potatosecond",
          "name": {
            "ru": "Восковой картофель",
            "en": "Waxy potatoes"
          },
          "quantity": 700,
          "unit": "g",
          "scaling": "linear",
          "note": {
            "ru": "вторая партия",
            "en": "second lot"
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
          "note": null
        },
        {
          "id": "carrot",
          "name": {
            "ru": "Морковь",
            "en": "Carrots"
          },
          "quantity": 3,
          "unit": "piece",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "stock",
          "name": {
            "ru": "Бараний или овощной бульон",
            "en": "Lamb or vegetable stock"
          },
          "quantity": 1.2,
          "unit": "l",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "parsley",
          "name": {
            "ru": "Петрушка",
            "en": "Parsley"
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
            "ru": "Уложите мясо в кастрюлю сырым, добавьте лук, морковь и первую партию картофеля, нарезанную крупно.",
            "en": "Put the meat into the pot raw, add the onion, carrot and the first lot of potatoes cut large."
          },
          "minutes": 10
        },
        {
          "text": {
            "ru": "Залейте бульоном, доведите до кипения, снимите пену и томите под крышкой полтора часа на самом слабом огне.",
            "en": "Pour in the stock, bring it to the boil, skim and cook covered for an hour and a half on the lowest heat."
          },
          "minutes": 95
        },
        {
          "text": {
            "ru": "Разомните разварившийся картофель о стенку кастрюли — бульон загустеет и станет молочно-белым.",
            "en": "Crush the collapsed potato against the side of the pot: the broth thickens and turns milky white."
          },
          "minutes": 5
        },
        {
          "text": {
            "ru": "Добавьте вторую партию картофеля крупными кусками и варите ещё сорок минут.",
            "en": "Add the second lot of potatoes in large pieces and cook another forty minutes."
          },
          "minutes": 40
        },
        {
          "text": {
            "ru": "Посолите, поперчите и дайте постоять пятнадцать минут. Посыпьте петрушкой перед подачей.",
            "en": "Season, and let it stand fifteen minutes. Scatter parsley over before serving."
          },
          "minutes": 16
        }
      ]
    },
    "sourceDietClaimsUnverified": [
      "gluten-free"
    ],
    "sourceCategory": "main",
    "mealReview": "Source main with meat, two distinct potato lots and carrots; no additional side required by source.",
    "recipeReview": {
      "proposedDietStatus": "nonveg_explicit_lamb",
      "notes": [
        "Base6 retained. Lamb1.2kg is bone-in neck OR shoulder, not edible boneless weight or mutton substitute.",
        "Floury potatoes500g first lot and waxy potatoes700g second lot remain separate identities and stage timings. First lot thickens broth, second stays in chunks.",
        "Lamb OR vegetable stock1.2l remains a choice; selecting vegetable stock does not make lamb stew vegetarian. Formulation, salt and allergens unknown.",
        "Method uses meat raw then boils/simmers90min plus40min and rests15min. No standalone browning fat invented. These are source timings, not independently guaranteed safety or elapsed finish time.",
        "Nutrition unknown, including bone yield; milky white broth is a potato effect in source, not evidence of milk."
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
