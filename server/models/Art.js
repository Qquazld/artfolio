import mongoose from "mongoose";

const artSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    year: { type: String, trim: true },
    description: { type: String, default: "", trim: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true },
);

const Art = mongoose.model("Art", artSchema);

export default Art;
