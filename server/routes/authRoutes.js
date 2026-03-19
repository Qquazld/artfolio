import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @access  Public
router.post("/register", register);

// @route   POST /api/auth/login
// @access  Public
router.post("/login", login);

export default router;
