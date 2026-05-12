const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productService = require("../../services/productService");
const { validateProduct } = require("../../middleware/validators");

const asyncHandler =
  (fn) =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID invalide" });
  }
  next();
};

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      category: req.query.category,
      inStock: req.query.inStock,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      search: req.query.search,
    };

    const result = await productService.getAllProducts(options);
    res.json(result);
  })
);

router.get(
  "/:id",
  validateObjectId,
  asyncHandler(async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      if (error.message === "Produit non trouvé") {
        return res.status(404).json({ error: "Produit non trouvé" });
      }
      throw error;
    }
  })
);

router.post(
  "/",
  validateProduct,
  asyncHandler(async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  })
);

router.put(
  "/:id",
  validateObjectId,
  validateProduct,
  asyncHandler(async (req, res) => {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      if (error.message === "Produit non trouvé") {
        return res.status(404).json({ error: "Produit non trouvé" });
      }
      throw error;
    }
  })
);

router.delete(
  "/:id",
  validateObjectId,
  asyncHandler(async (req, res) => {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({ message: "Produit supprimé avec succès" });
    } catch (error) {
      if (error.message === "Produit non trouvé") {
        return res.status(404).json({ error: "Produit non trouvé" });
      }
      throw error;
    }
  })
);

module.exports = router;
