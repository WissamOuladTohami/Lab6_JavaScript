require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product");

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI manquant. Ajoutez-le dans le fichier .env");
  process.exit(1);
}

const products = [
  {
    name: "Casque Audio Noir Or",
    price: 129.99,
    description: "Casque confortable avec son immersif, finition noire mate et accents dorés.",
    category: "Électronique",
    quantity: 24,
    tags: ["audio", "premium", "noir", "or"],
    imageUrl: "https://picsum.photos/seed/headphones/900/600",
  },
  {
    name: "Montre Élégance Dorée",
    price: 199.0,
    description: "Montre minimaliste avec cadran noir profond et boîtier doré.",
    category: "Autres",
    quantity: 12,
    tags: ["style", "accessoire", "or"],
    imageUrl: "https://picsum.photos/seed/watch/900/600",
  },
  {
    name: "Livre: Node.js Pratique",
    price: 29.9,
    description: "Guide moderne pour construire des applications Node.js robustes.",
    category: "Livres",
    quantity: 40,
    tags: ["nodejs", "backend", "apprentissage"],
    imageUrl: "https://picsum.photos/seed/book/900/600",
  },
  {
    name: "Veste Street Noir",
    price: 89.5,
    description: "Veste noire, coupe moderne, parfaite pour un look urbain.",
    category: "Vêtements",
    quantity: 6,
    tags: ["mode", "street", "noir"],
    imageUrl: "https://picsum.photos/seed/jacket/900/600",
  },
  {
    name: "Café Arabica Sélection",
    price: 12.5,
    description: "Grains arabica torréfiés, notes chocolatées et noisette.",
    category: "Alimentation",
    quantity: 0,
    tags: ["café", "aroma", "gourmet"],
    imageUrl: "https://picsum.photos/seed/coffee/900/600",
  },
  {
    name: "Clavier Mécanique Gold Switch",
    price: 149.99,
    description: "Clavier mécanique silencieux, rétroéclairage subtil, esthétique noir & or.",
    category: "Électronique",
    quantity: 18,
    tags: ["clavier", "gaming", "mécanique", "or"],
    imageUrl: "https://picsum.photos/seed/keyboard/900/600",
  },
];

const run = async () => {
  await mongoose.connect(mongoUri);

  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log(`Base déjà peuplée (${existing} produits). Rien à faire.`);
    await mongoose.disconnect();
    return;
  }

  const created = await Product.insertMany(products);
  console.log(`Seed OK: ${created.length} produits insérés.`);
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error("Seed KO:", err);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
