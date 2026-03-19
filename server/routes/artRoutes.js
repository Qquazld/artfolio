import express from "express";
import {
  createArt,
  getAllArt,
  getArtbyId,
  deleteArtbyId,
  updateArtbyId,
} from "../controllers/artController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route GET /api/art/
// @access Public
router.get("/", getAllArt);

// @route POST /api/art/
// @access Private
router.post("/", auth, createArt);

// @route GET by ID /api/art/:id
// @access Public
router.get("/:id", getArtbyId);

// @route DELETE by ID /api/art/:id
// @access Private
router.delete("/:id", auth, deleteArtbyId);

// @route UPDATE by ID /api/art/:id
// @access Private
router.patch("/:id", auth, updateArtbyId);

export default router;
