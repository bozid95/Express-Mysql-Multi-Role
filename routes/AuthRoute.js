import express from "express";
import { login, me, logout } from "../controllers/AuthController.js";
const router = express.Router();

router.post("/login", login);
router.get("/me", me);
router.delete("/logout", logout);

export default router;
