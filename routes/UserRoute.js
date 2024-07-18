import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController.js";
import { verifyUser, adminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/users", verifyUser, getUsers);
router.get("/user/:id", verifyUser, getUserById);
router.post("/user", createUser);
router.patch("/user/:id", verifyUser, updateUser);
router.delete("/user/:id", verifyUser, adminOnly, deleteUser);

export default router;
