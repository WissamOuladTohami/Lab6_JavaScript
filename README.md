# CRUD Produits — Express + MongoDB + Mongoose (EJS)

Une mini-application CRUD (Create / Read / Update / Delete) pour gérer des produits avec une interface web EJS **et** une API REST. ✨

## 🚀 Fonctionnalités

- 🧾 Liste des produits (pagination + filtres + recherche)
- ➕ Création de produits (validation serveur)
- ✏️ Modification de produits (validation serveur)
- 🗑️ Suppression de produits (confirmation + message flash)
- 🌐 API REST JSON (`/api/products`)
- 🧪 Seed de données (insertion automatique de plusieurs produits)
- 🎨 Thème **Golden Black** (style moderne)

## 🧱 Stack

- 🟩 Node.js + Express
- 🗃️ MongoDB + Mongoose
- 🧩 EJS + `express-ejs-layouts`
- ✅ Validation avec `express-validator`

## 📁 Structure du projet

```
crud-express-mongodb/
├─ app.js
├─ db/
│  └─ mongoose.js
├─ models/
│  └─ product.js
├─ services/
│  └─ productService.js
├─ controllers/
│  └─ productController.js
├─ routes/
│  ├─ productRoutes.js
│  └─ api/
│     └─ productRoutes.js
├─ middleware/
│  └─ validators.js
├─ scripts/
│  └─ seedProducts.js
├─ views/
│  ├─ layout.ejs
│  ├─ error.ejs
│  ├─ partials/
│  │  ├─ header.ejs
│  │  └─ footer.ejs
│  └─ products/
│     ├─ index.ejs
│     ├─ details.ejs
│     ├─ create.ejs
│     └─ edit.ejs
└─ public/
   └─ css/
      └─ style.css
```

## ✅ Prérequis

- 🟢 Node.js (LTS recommandé)
- 🐳 Docker Desktop (recommandé pour MongoDB) **ou** MongoDB installé localement

## ⚙️ Configuration

Crée un fichier `.env` à la racine :

```env
MONGODB_URI=mongodb://localhost:27017/crud_app
PORT=3000
SESSION_SECRET=change_me
```

## 📦 Installation

Installe les dépendances :

```bash
npm install
```

## 🐳 Démarrer MongoDB (Docker)

Lance la base :

```bash
docker compose up -d
```

Vérifie la version :

```bash
docker exec -it mongodb mongosh --eval "db.version()"
```

## 🌱 Insérer des produits (Seed)

Insère plusieurs produits (uniquement si la collection est vide) :

```bash
npm run seed
```

## ▶️ Démarrer l’application

```bash
npm start
```

Ouvre ensuite :

- 🖥️ UI : `http://localhost:3000`
- 🔌 API : `http://localhost:3000/api/products`

## 🔌 API REST (exemples)

### 📥 Lister les produits

```bash
curl "http://localhost:3000/api/products?page=1&limit=10"
```

### 🔎 Détails d’un produit

```bash
curl "http://localhost:3000/api/products/<id>"
```

### ➕ Créer un produit

```bash
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"Produit Test","price":19.99,"category":"Autres","quantity":3,"tags":["test","api"]}'
```

### ✏️ Mettre à jour un produit

```bash
curl -X PUT "http://localhost:3000/api/products/<id>" \
  -H "Content-Type: application/json" \
  -d '{"price":24.99,"quantity":10}'
```

### 🗑️ Supprimer un produit

```bash
curl -X DELETE "http://localhost:3000/api/products/<id>"
```
---

## 🧠 Notes

- 🧷 Les validations sont centralisées dans `middleware/validators.js`.
- 🧾 Les pages EJS utilisent le layout `views/layout.ejs`.
- 💡 Pour que MongoDB fonctionne, assure-toi que le conteneur (ou le service local) écoute sur `27017`.

---

## 🗺️ Prochaines améliorations (idées)

- 🔐 Auth (admin) + gestion des rôles
- 📸 Upload d’images (multer) + stockage (local/S3)
- 🧠 Tests (Jest/Supertest) + CI
- 📦 Dockerisation complète (app + mongo)


