const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI manquant. Ajoutez-le dans le fichier .env");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connecté");
  })
  .catch((err) => {
    console.error("Erreur de connexion MongoDB:", err);
    process.exit(1);
  });

module.exports = mongoose;
