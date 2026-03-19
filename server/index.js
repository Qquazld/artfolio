import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import artRoutes from "./routes/artRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000; // Fallback to 3000 in dev mode
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// Register routes before DB connection
app.use("/api/art", artRoutes);
app.use("/api/auth", authRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Art Gallery API is online!");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected!");

    // Server only starts if DB connection succeeds
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
