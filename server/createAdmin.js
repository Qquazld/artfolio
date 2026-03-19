// One-time script to seed an admin user, run manually with: node createAdmin.js
// Credentials are read from .env

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Connection or creation error:", err);
    process.exit(1);
  });
