import express from "express";
import {
  createArt,
  getAllArt,
  getArtbyId,
  deleteArtbyId,
  updateArtbyId,
} from "../controllers/artController.js";

// Création d'une instance de Router Express
const router = express.Router();

// Route GET /api/art/
router.get("/", getAllArt);

// Route POST /api/art/
router.post("/", createArt);

// Route GET by ID
router.get("/:id", getArtbyId);

// Route DELETE by ID
router.delete("/:id", deleteArtbyId);

// Route UPDATE by ID
router.patch("/:id", updateArtbyId);

export default router;
