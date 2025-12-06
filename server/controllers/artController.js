import Art from "../models/Art.js";
import mongoose from "mongoose";

// @Description: READ all artworks
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

// @Description: CREATE a new artwork
// @Route: POST /api/art
// @Access: Private
export const createArt = async (req, res) => {
  const { title, artist, description, imageUrl, year } = req.body;

  if (!title || !artist || !imageUrl) {
    return res
      .status(400)
      .json({ message: "Title, artist and imageUrl are required." });
  }

  try {
    const newArt = new Art({
      title,
      artist,
      description,
      imageUrl,
      year,
    });
    const savedArt = await newArt.save();
    res.status(201).json(savedArt);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// @desc    READ one artwork by ID
// @route   GET /api/art/:id
// @access  Public
export const getArtbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID." });
  }
  try {
    const artwork = await Art.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found." });
    }
    res.status(200).json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    DELETE one artwork by ID
// @route   DELETE /api/art/:id
// @access  Private
export const deleteArtbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID." });
  }
  try {
    const deletedArt = await Art.findByIdAndDelete(id);
    if (!deletedArt) {
      return res.status(404).json({ message: "Artwork not found." });
    }
    res.status(200).json({ message: "Artwork deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    UPDATE one artwork by ID
// @route   PATCH /api/art/:id
// @access  Private

export const updateArtbyId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Invalid ID." });

  try {
    const updatedArt = await Art.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedArt)
      return res.status(404).json({ message: "Artwork not found." });
    res.status(200).json(updatedArt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
