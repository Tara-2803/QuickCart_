import express from "express";
import { login, logout, signup, refreshToken, getProfile, guestLogin } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/guest", guestLogin);
router.post("/logout", logout);
router.get("/refresh", refreshToken);
router.get("/profile", protectRoute, getProfile);

export default router;
