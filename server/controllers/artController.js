import Art from "../models/Art.js";
import mongoose from "mongoose";

// @Description: Récupérer toutes les œuvres d'art
// @Route: GET /api/art
// @Access: Public

export const getAllArt = async (req, res) => {
  try {
    const artworks = await Art.find().sort({ createdAt: -1 });
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
