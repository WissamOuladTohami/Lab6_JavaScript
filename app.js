const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
require("dotenv").config();

require("./db/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(ejsLayouts);
app.set("layout", "layout");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.use((req, res, next) => {
  res.locals.flashMessage = req.session.flashMessage;
  delete req.session.flashMessage;
  next();
});

const productRoutes = require("./routes/productRoutes");
const apiProductRoutes = require("./routes/api/productRoutes");

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use("/products", productRoutes);
app.use("/api/products", apiProductRoutes);

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page non trouvée",
    message: "La page que vous recherchez n'existe pas.",
  });
});

app.use((err, req, res, next) => {
  console.error("Erreur non gérée:", err);
  if (req.originalUrl && req.originalUrl.startsWith("/api")) {
    return res.status(500).json({ error: process.env.NODE_ENV === "production" ? "Erreur serveur" : err.message });
  }
  res.status(500).render("error", {
    title: "Erreur serveur",
    message:
      process.env.NODE_ENV === "production"
        ? "Une erreur est survenue sur le serveur."
        : err.message || "Erreur interne du serveur",
  });
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM reçu. Arrêt gracieux du serveur...");
  process.exit(0);
});
