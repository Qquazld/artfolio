import mongoose from "mongoose";

const artSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  year: { type: Number },
  description: { type: String, default: "", trim: true },
  imageUrl: { type: String },
});

const Art = mongoose.model("Art", artSchema);

export default Art;
