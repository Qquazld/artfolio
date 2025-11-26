import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import artRoutes from "./routes/artRoutes.js";

const app = express();
const port = 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Autorise les requêtes du front
app.use(express.json()); // Permet de lire le JSON // Route test

// 1. Connexion à MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connexion à MongoDB Atlas établie !");

    // 2. Lancement du serveur Express UNIQUEMENT si la connexion DB est OK
    app.listen(port, () => {
      console.log(`🚀 Serveur Express lancé sur http://localhost:${port}`);
    });
    // Express utilise toutes les routes définies dans artRoutes.js pour le chemin /api/art
    app.use("/api/art", artRoutes); // ⬅️ On utilise le routeur ici !

    // Route test (elle reste là car c'est une route globale)
    app.get("/", (req, res) => {
      res.send("API Art Gallery en ligne et connectée à MongoDB !");
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB :", err.message);
    process.exit(1); // Arrête le processus en cas d'erreur
  });
