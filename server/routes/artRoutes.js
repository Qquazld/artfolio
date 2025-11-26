import express from "express";
import { getAllArt } from "../controllers/artController";

// Création d'une instance de Router Express
const router = express.Router();

// Route GET /api/art/
router.get("/", getAllArt);

export default router;
