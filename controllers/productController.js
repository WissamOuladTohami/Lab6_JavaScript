const productService = require("../services/productService");

const CATEGORIES = ["Électronique", "Vêtements", "Alimentation", "Livres", "Autres"];

exports.getAllProducts = async (req, res) => {
  try {
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

    res.render("products/index", {
      title: "Liste des produits",
      products: result.products,
      pagination: result.pagination,
      filters: options,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).render("error", {
      title: "Erreur",
      message: error.message || "Une erreur est survenue lors de la récupération des produits",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    res.render("products/details", {
      title: product.name,
      product,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);

    if (error.message === "Produit non trouvé" || error.message === "ID de produit invalide") {
      return res.status(404).render("error", {
        title: "Produit non trouvé",
        message: error.message,
      });
    }

    res.status(500).render("error", {
      title: "Erreur",
      message: "Une erreur est survenue lors de la récupération du produit",
    });
  }
};

exports.showCreateForm = (req, res) => {
  res.render("products/create", {
    title: "Ajouter un produit",
    categories: CATEGORIES,
    product: {},
  });
};

exports.createProduct = async (req, res) => {
  try {
    if (req.body.tags) {
      req.body.tags = req.body.tags.split(",").map((tag) => tag.trim());
    }

    const product = await productService.createProduct(req.body);
    res.redirect(`/products/${product._id}`);
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);

    res.status(400).render("products/create", {
      title: "Ajouter un produit",
      categories: CATEGORIES,
      product: req.body,
      error: error.message,
    });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    res.render("products/edit", {
      title: `Modifier ${product.name}`,
      categories: CATEGORIES,
      product,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);

    if (error.message === "Produit non trouvé" || error.message === "ID de produit invalide") {
      return res.status(404).render("error", {
        title: "Produit non trouvé",
        message: error.message,
      });
    }

    res.status(500).render("error", {
      title: "Erreur",
      message: "Une erreur est survenue lors de la récupération du produit",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.body.tags) {
      req.body.tags = req.body.tags.split(",").map((tag) => tag.trim());
    }

    const product = await productService.updateProduct(req.params.id, req.body);
    res.redirect(`/products/${product._id}`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);

    if (error.message === "Produit non trouvé" || error.message === "ID de produit invalide") {
      return res.status(404).render("error", {
        title: "Produit non trouvé",
        message: error.message,
      });
    }

    res.status(400).render("products/edit", {
      title: "Modifier le produit",
      categories: CATEGORIES,
      product: { ...req.body, _id: req.params.id },
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);

    if (req.session) {
      req.session.flashMessage = { type: "success", text: "Produit supprimé avec succès" };
    }
    res.redirect("/products");
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);

    if (req.session) {
      if (error.message === "Produit non trouvé" || error.message === "ID de produit invalide") {
        req.session.flashMessage = { type: "error", text: error.message };
      } else {
        req.session.flashMessage = { type: "error", text: "Erreur lors de la suppression du produit" };
      }
    }

    res.redirect("/products");
  }
};
