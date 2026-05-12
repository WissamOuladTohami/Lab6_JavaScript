const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateProduct } = require("../middleware/validators");

router.get("/", productController.getAllProducts);
router.get("/create", productController.showCreateForm);
router.post("/create", validateProduct, productController.createProduct);

router.get("/edit/:id", productController.showEditForm);
router.post("/:id/update", validateProduct, productController.updateProduct);
router.post("/:id/delete", productController.deleteProduct);

router.get("/:id", productController.getProductById);

module.exports = router;
