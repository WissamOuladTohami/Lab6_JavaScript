const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est obligatoire"],
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
    },
    price: {
      type: Number,
      required: [true, "Le prix est obligatoire"],
      min: [0, "Le prix ne peut pas être négatif"],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "La description ne peut pas dépasser 1000 caractères"],
    },
    category: {
      type: String,
      enum: {
        values: ["Électronique", "Vêtements", "Alimentation", "Livres", "Autres"],
        message: "{VALUE} n'est pas une catégorie valide",
      },
      default: "Autres",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    imageUrl: {
      type: String,
      default: "default-product.jpg",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ price: 1 });

productSchema.virtual("formattedPrice").get(function () {
  return `${this.price.toFixed(2)} €`;
});

productSchema.methods.isLowStock = function () {
  return this.quantity < 5 && this.inStock;
};

productSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

productSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.inStock = false;
  }
  next();
});

productSchema.post("save", function (doc) {
  console.log(`Produit sauvegardé: ${doc.name}`);
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
