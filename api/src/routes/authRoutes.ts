import { Router } from "express";
import { authController } from "../controllers/authController";
import authMiddleware from "../middlewares/auth";

export const router = Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.me);
