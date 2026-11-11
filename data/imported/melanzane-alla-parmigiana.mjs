export default {
  "id": "unitools:melanzane-alla-parmigiana",
  "kind": "source-native-fixed-base",
  "name": "Melanzane alla parmigiana",
  "country": "IT",
  "cuisine": "Italian cuisine",
  "baseServings": 6,
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
    "proposedDietStatus": "unknown_for_strict_vegetarian_cheese_formulation_unverified",
    "notes": [
      "Base6 retained; source0.2l olive oil stays200ml, never capped to120ml.",
      "Aubergines1.5kg retained, not guessed piece count. Tinned tomatoes800g not narrowed to diced.",
      "Source mozzarella and parmesan retained, not light/grated substitutes. Ingredient-level cheese rennet/additives remain label-specific; no strict vegetarian badge.",
      "Aubergine salted/pressed30min, fried2min per side, cheese drained10min, bake40min and rest20min all preserved. Source prep/cook fields not asserted to be guaranteed elapsed runtime.",
      "Absorbed frying oil and drained cheese liquid unknown, hence all nutrition null."
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
    "prepMinutes": 50,
    "cookMinutes": 60,
    "stepMinutesTotal": 174,
    "guaranteedElapsedTime": false
  },
  "lines": [
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:001",
      "name": "Aubergines",
      "quantity": 1.5,
      "unit": "kg",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "aubergine",
        "name": {
          "ru": "Баклажаны",
          "en": "Aubergines"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        1,
        2,
        3,
        6
      ]
    },
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:002",
      "name": "Tinned tomatoes",
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
          "ru": "Томаты в собственном соку",
          "en": "Tinned tomatoes"
        },
        "quantity": 800,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        4,
        6
      ]
    },
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:003",
      "name": "Mozzarella",
      "quantity": 400,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "mozzarella",
        "name": {
          "ru": "Моцарелла",
          "en": "Mozzarella"
        },
        "quantity": 400,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        5,
        6
      ]
    },
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:004",
      "name": "Parmesan",
      "quantity": 150,
      "unit": "g",
      "note": null,
      "scaling": "linear",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "parmesan",
        "name": {
          "ru": "Пармезан",
          "en": "Parmesan"
        },
        "quantity": 150,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        6
      ]
    },
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:005",
      "name": "Basil",
      "quantity": 30,
      "unit": "g",
      "note": null,
      "scaling": "damped",
      "catalogId": null,
      "massGrams": null,
      "nutritionStatus": "unknown",
      "source": {
        "id": "basil",
        "name": {
          "ru": "Базилик",
          "en": "Basil"
        },
        "quantity": 30,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        6
      ]
    },
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:006",
      "name": "Garlic",
      "quantity": 3,
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
        "quantity": 3,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      "methodSteps": [
        4
      ]
    },
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:007",
      "name": "Olive oil",
      "quantity": 200,
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
        "quantity": 200,
        "unit": "ml",
        "scaling": "linear",
        "note": null
      },
      "methodSteps": [
        3,
        4
      ]
    },
    {
      "lineRef": "src:unitools:melanzane-alla-parmigiana:008",
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
        1,
        4
      ]
    }
  ],
  "steps": [
    {
      "text": {
        "ru": "Нарежьте баклажаны вдоль ломтями в полсантиметра, посолите и оставьте под грузом на полчаса.",
        "en": "Slice the aubergines lengthways half a centimetre thick, salt them and press them under a weight for half an hour."
      },
      "minutes": 35
    },
    {
      "text": {
        "ru": "Обсушите ломти насухо бумагой — на мокрых масло будет брызгать, а корка не образуется.",
        "en": "Pat the slices completely dry; wet ones spit in the oil and never crust."
      },
      "minutes": 8
    },
    {
      "text": {
        "ru": "Обжарьте баклажаны партиями в оливковом масле по две минуты с каждой стороны и выложите на решётку.",
        "en": "Fry the aubergine in batches in olive oil, two minutes a side, and drain them on a rack."
      },
      "minutes": 25
    },
    {
      "text": {
        "ru": "Обжарьте чеснок, добавьте томаты и варите соус двадцать минут до густоты, посолив в конце.",
        "en": "Fry the garlic, add the tomatoes and cook the sauce twenty minutes to thicken, salting at the end."
      },
      "minutes": 20
    },
    {
      "text": {
        "ru": "Нарежьте моцареллу и оставьте на бумаге стекать десять минут.",
        "en": "Slice the mozzarella and leave it on paper to drain for ten minutes."
      },
      "minutes": 12
    },
    {
      "text": {
        "ru": "Собирайте слоями: соус, баклажаны, моцарелла, пармезан, базилик — и так четыре раза.",
        "en": "Layer it: sauce, aubergine, mozzarella, parmesan, basil — four times over."
      },
      "minutes": 12
    },
    {
      "text": {
        "ru": "Запекайте при 190 °C сорок минут и дайте постоять двадцать перед нарезкой.",
        "en": "Bake at 190 °C for forty minutes and let it stand twenty before cutting."
      },
      "minutes": 62
    }
  ],
  "sourceRecord": {
    "slug": "melanzane-alla-parmigiana",
    "country": "IT",
    "name": {
      "ru": "Пармиджана из баклажанов",
      "en": "Melanzane alla parmigiana"
    },
    "nativeName": "Melanzane alla parmigiana",
    "summary": {
      "ru": "Слои жареных баклажанов с томатным соусом, моцареллой и пармезаном, запечённые до корки.",
      "en": "Layers of fried aubergine with tomato sauce, mozzarella and parmesan, baked to a crust."
    },
    "category": "main",
    "diets": [
      "vegetarian"
    ],
    "difficulty": "medium",
    "baseServings": 6,
    "prepMinutes": 50,
    "cookMinutes": 60,
    "nutritionPerServing": {
      "calories": 520,
      "protein": 24,
      "fat": 36,
      "carbs": 24
    },
    "ingredients": [
      {
        "id": "aubergine",
        "name": {
          "ru": "Баклажаны",
          "en": "Aubergines"
        },
        "quantity": 1.5,
        "unit": "kg",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "tomato",
        "name": {
          "ru": "Томаты в собственном соку",
          "en": "Tinned tomatoes"
        },
        "quantity": 800,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "mozzarella",
        "name": {
          "ru": "Моцарелла",
          "en": "Mozzarella"
        },
        "quantity": 400,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "parmesan",
        "name": {
          "ru": "Пармезан",
          "en": "Parmesan"
        },
        "quantity": 150,
        "unit": "g",
        "scaling": "linear",
        "note": null
      },
      {
        "id": "basil",
        "name": {
          "ru": "Базилик",
          "en": "Basil"
        },
        "quantity": 30,
        "unit": "g",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "garlic",
        "name": {
          "ru": "Чеснок",
          "en": "Garlic"
        },
        "quantity": 3,
        "unit": "clove",
        "scaling": "damped",
        "note": null
      },
      {
        "id": "oliveoil",
        "name": {
          "ru": "Оливковое масло",
          "en": "Olive oil"
        },
        "quantity": 200,
        "unit": "ml",
        "scaling": "linear",
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
          "ru": "Нарежьте баклажаны вдоль ломтями в полсантиметра, посолите и оставьте под грузом на полчаса.",
          "en": "Slice the aubergines lengthways half a centimetre thick, salt them and press them under a weight for half an hour."
        },
        "minutes": 35
      },
      {
        "text": {
          "ru": "Обсушите ломти насухо бумагой — на мокрых масло будет брызгать, а корка не образуется.",
          "en": "Pat the slices completely dry; wet ones spit in the oil and never crust."
        },
        "minutes": 8
      },
      {
        "text": {
          "ru": "Обжарьте баклажаны партиями в оливковом масле по две минуты с каждой стороны и выложите на решётку.",
          "en": "Fry the aubergine in batches in olive oil, two minutes a side, and drain them on a rack."
        },
        "minutes": 25
      },
      {
        "text": {
          "ru": "Обжарьте чеснок, добавьте томаты и варите соус двадцать минут до густоты, посолив в конце.",
          "en": "Fry the garlic, add the tomatoes and cook the sauce twenty minutes to thicken, salting at the end."
        },
        "minutes": 20
      },
      {
        "text": {
          "ru": "Нарежьте моцареллу и оставьте на бумаге стекать десять минут.",
          "en": "Slice the mozzarella and leave it on paper to drain for ten minutes."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Собирайте слоями: соус, баклажаны, моцарелла, пармезан, базилик — и так четыре раза.",
          "en": "Layer it: sauce, aubergine, mozzarella, parmesan, basil — four times over."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Запекайте при 190 °C сорок минут и дайте постоять двадцать перед нарезкой.",
          "en": "Bake at 190 °C for forty minutes and let it stand twenty before cutting."
        },
        "minutes": 62
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
    "id": "unitools:melanzane-alla-parmigiana",
    "name": "Melanzane alla parmigiana",
    "cuisine": "Italian cuisine",
    "country": "IT",
    "baseServings": 6,
    "sourceTimes": {
      "prepMinutes": 50,
      "cookMinutes": 60,
      "guaranteedElapsedTime": false
    },
    "sourceDietClaimsUnverified": [
      "vegetarian"
    ],
    "sourceCategory": "main",
    "mealReview": "Source main: layered aubergine/tomato/cheese bake. No invented starch side or protein-target claim.",
    "lines": [
      {
        "lineRef": "src:unitools:melanzane-alla-parmigiana:001",
        "raw": "Aubergines",
        "qty": 1.5,
        "unit": "kg",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "aubergine",
          "name": {
            "ru": "Баклажаны",
            "en": "Aubergines"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          1,
          2,
          3,
          6
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
        "lineRef": "src:unitools:melanzane-alla-parmigiana:002",
        "raw": "Tinned tomatoes",
        "qty": 800,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "tomato",
          "name": {
            "ru": "Томаты в собственном соку",
            "en": "Tinned tomatoes"
          },
          "quantity": 800,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          4,
          6
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
        "lineRef": "src:unitools:melanzane-alla-parmigiana:003",
        "raw": "Mozzarella",
        "qty": 400,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "mozzarella",
          "name": {
            "ru": "Моцарелла",
            "en": "Mozzarella"
          },
          "quantity": 400,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          5,
          6
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
            "basis": "Explicit Mozzarella line; retrieved FARE names this food class for allergen avoidance",
            "sourceUrl": "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/milk"
          }
        ],
        "productCompositionUnverified": true,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:melanzane-alla-parmigiana:004",
        "raw": "Parmesan",
        "qty": 150,
        "unit": "g",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "parmesan",
          "name": {
            "ru": "Пармезан",
            "en": "Parmesan"
          },
          "quantity": 150,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          6
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
            "basis": "Explicit Parmesan line; retrieved FARE names this food class for allergen avoidance",
            "sourceUrl": "https://www.foodallergy.org/living-food-allergy/food-allergy-essentials/common-allergens/milk"
          }
        ],
        "productCompositionUnverified": true,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:melanzane-alla-parmigiana:005",
        "raw": "Basil",
        "qty": 30,
        "unit": "g",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "basil",
          "name": {
            "ru": "Базилик",
            "en": "Basil"
          },
          "quantity": 30,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
          6
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
        "lineRef": "src:unitools:melanzane-alla-parmigiana:006",
        "raw": "Garlic",
        "qty": 3,
        "unit": "clove",
        "note": null,
        "scaling": "damped",
        "source": {
          "id": "garlic",
          "name": {
            "ru": "Чеснок",
            "en": "Garlic"
          },
          "quantity": 3,
          "unit": "clove",
          "scaling": "damped",
          "note": null
        },
        "tracedMethodStepNumbers": [
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
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:melanzane-alla-parmigiana:007",
        "raw": "Olive oil",
        "qty": 200,
        "unit": "ml",
        "note": null,
        "scaling": "linear",
        "source": {
          "id": "oliveoil",
          "name": {
            "ru": "Оливковое масло",
            "en": "Olive oil"
          },
          "quantity": 200,
          "unit": "ml",
          "scaling": "linear",
          "note": null
        },
        "tracedMethodStepNumbers": [
          3,
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
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      },
      {
        "lineRef": "src:unitools:melanzane-alla-parmigiana:008",
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
          1,
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
        "positiveAllergenEvidence": [],
        "productCompositionUnverified": false,
        "allergenAbsenceClaim": false
      }
    ],
    "orderedSteps": [
      {
        "text": {
          "ru": "Нарежьте баклажаны вдоль ломтями в полсантиметра, посолите и оставьте под грузом на полчаса.",
          "en": "Slice the aubergines lengthways half a centimetre thick, salt them and press them under a weight for half an hour."
        },
        "minutes": 35
      },
      {
        "text": {
          "ru": "Обсушите ломти насухо бумагой — на мокрых масло будет брызгать, а корка не образуется.",
          "en": "Pat the slices completely dry; wet ones spit in the oil and never crust."
        },
        "minutes": 8
      },
      {
        "text": {
          "ru": "Обжарьте баклажаны партиями в оливковом масле по две минуты с каждой стороны и выложите на решётку.",
          "en": "Fry the aubergine in batches in olive oil, two minutes a side, and drain them on a rack."
        },
        "minutes": 25
      },
      {
        "text": {
          "ru": "Обжарьте чеснок, добавьте томаты и варите соус двадцать минут до густоты, посолив в конце.",
          "en": "Fry the garlic, add the tomatoes and cook the sauce twenty minutes to thicken, salting at the end."
        },
        "minutes": 20
      },
      {
        "text": {
          "ru": "Нарежьте моцареллу и оставьте на бумаге стекать десять минут.",
          "en": "Slice the mozzarella and leave it on paper to drain for ten minutes."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Собирайте слоями: соус, баклажаны, моцарелла, пармезан, базилик — и так четыре раза.",
          "en": "Layer it: sauce, aubergine, mozzarella, parmesan, basil — four times over."
        },
        "minutes": 12
      },
      {
        "text": {
          "ru": "Запекайте при 190 °C сорок минут и дайте постоять двадцать перед нарезкой.",
          "en": "Bake at 190 °C for forty minutes and let it stand twenty before cutting."
        },
        "minutes": 62
      }
    ],
    "sourceRecord": {
      "slug": "melanzane-alla-parmigiana",
      "country": "IT",
      "name": {
        "ru": "Пармиджана из баклажанов",
        "en": "Melanzane alla parmigiana"
      },
      "nativeName": "Melanzane alla parmigiana",
      "summary": {
        "ru": "Слои жареных баклажанов с томатным соусом, моцареллой и пармезаном, запечённые до корки.",
        "en": "Layers of fried aubergine with tomato sauce, mozzarella and parmesan, baked to a crust."
      },
      "category": "main",
      "diets": [
        "vegetarian"
      ],
      "difficulty": "medium",
      "baseServings": 6,
      "prepMinutes": 50,
      "cookMinutes": 60,
      "nutritionPerServing": {
        "calories": 520,
        "protein": 24,
        "fat": 36,
        "carbs": 24
      },
      "ingredients": [
        {
          "id": "aubergine",
          "name": {
            "ru": "Баклажаны",
            "en": "Aubergines"
          },
          "quantity": 1.5,
          "unit": "kg",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "tomato",
          "name": {
            "ru": "Томаты в собственном соку",
            "en": "Tinned tomatoes"
          },
          "quantity": 800,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "mozzarella",
          "name": {
            "ru": "Моцарелла",
            "en": "Mozzarella"
          },
          "quantity": 400,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "parmesan",
          "name": {
            "ru": "Пармезан",
            "en": "Parmesan"
          },
          "quantity": 150,
          "unit": "g",
          "scaling": "linear",
          "note": null
        },
        {
          "id": "basil",
          "name": {
            "ru": "Базилик",
            "en": "Basil"
          },
          "quantity": 30,
          "unit": "g",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "garlic",
          "name": {
            "ru": "Чеснок",
            "en": "Garlic"
          },
          "quantity": 3,
          "unit": "clove",
          "scaling": "damped",
          "note": null
        },
        {
          "id": "oliveoil",
          "name": {
            "ru": "Оливковое масло",
            "en": "Olive oil"
          },
          "quantity": 200,
          "unit": "ml",
          "scaling": "linear",
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
            "ru": "Нарежьте баклажаны вдоль ломтями в полсантиметра, посолите и оставьте под грузом на полчаса.",
            "en": "Slice the aubergines lengthways half a centimetre thick, salt them and press them under a weight for half an hour."
          },
          "minutes": 35
        },
        {
          "text": {
            "ru": "Обсушите ломти насухо бумагой — на мокрых масло будет брызгать, а корка не образуется.",
            "en": "Pat the slices completely dry; wet ones spit in the oil and never crust."
          },
          "minutes": 8
        },
        {
          "text": {
            "ru": "Обжарьте баклажаны партиями в оливковом масле по две минуты с каждой стороны и выложите на решётку.",
            "en": "Fry the aubergine in batches in olive oil, two minutes a side, and drain them on a rack."
          },
          "minutes": 25
        },
        {
          "text": {
            "ru": "Обжарьте чеснок, добавьте томаты и варите соус двадцать минут до густоты, посолив в конце.",
            "en": "Fry the garlic, add the tomatoes and cook the sauce twenty minutes to thicken, salting at the end."
          },
          "minutes": 20
        },
        {
          "text": {
            "ru": "Нарежьте моцареллу и оставьте на бумаге стекать десять минут.",
            "en": "Slice the mozzarella and leave it on paper to drain for ten minutes."
          },
          "minutes": 12
        },
        {
          "text": {
            "ru": "Собирайте слоями: соус, баклажаны, моцарелла, пармезан, базилик — и так четыре раза.",
            "en": "Layer it: sauce, aubergine, mozzarella, parmesan, basil — four times over."
          },
          "minutes": 12
        },
        {
          "text": {
            "ru": "Запекайте при 190 °C сорок минут и дайте постоять двадцать перед нарезкой.",
            "en": "Bake at 190 °C for forty minutes and let it stand twenty before cutting."
          },
          "minutes": 62
        }
      ]
    },
    "recipeReview": {
      "contentTrace": "manual_source_lines_to_steps",
      "proposedDietStatus": "unknown_for_strict_vegetarian_cheese_formulation_unverified",
      "notes": [
        "Base6 retained; source0.2l olive oil stays200ml, never capped to120ml.",
        "Aubergines1.5kg retained, not guessed piece count. Tinned tomatoes800g not narrowed to diced.",
        "Source mozzarella and parmesan retained, not light/grated substitutes. Ingredient-level cheese rennet/additives remain label-specific; no strict vegetarian badge.",
        "Aubergine salted/pressed30min, fried2min per side, cheese drained10min, bake40min and rest20min all preserved. Source prep/cook fields not asserted to be guaranteed elapsed runtime.",
        "Absorbed frying oil and drained cheese liquid unknown, hence all nutrition null."
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
