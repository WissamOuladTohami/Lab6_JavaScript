const { body, validationResult } = require("express-validator");

const CATEGORIES = ["Électronique", "Vêtements", "Alimentation", "Livres", "Autres"];

exports.validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isLength({ min: 2 })
    .withMessage("Le nom doit contenir au moins 2 caractères"),

  body("price").isFloat({ min: 0 }).withMessage("Le prix doit être un nombre positif"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("La description ne peut pas dépasser 1000 caractères"),

  body("category").optional().isIn(CATEGORIES).withMessage("Catégorie invalide"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("La quantité doit être un nombre entier positif"),

  body("tags")
    .optional()
    .custom((value) => {
      if (typeof value === "string") return true;
      if (Array.isArray(value)) return value.every((tag) => typeof tag === "string");
      return false;
    })
    .withMessage("Format de tags invalide"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    if (req.originalUrl.startsWith("/api")) {
      return res.status(400).json({ errors: errors.array() });
    }

    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join(", ");

    if (req.path.includes("/create")) {
      return res.status(400).render("products/create", {
        title: "Ajouter un produit",
        categories: CATEGORIES,
        product: req.body,
        error: errorMessages,
      });
    }

    return res.status(400).render("products/edit", {
      title: "Modifier le produit",
      categories: CATEGORIES,
      product: { ...req.body, _id: req.params.id },
      error: errorMessages,
    });
  },
];
