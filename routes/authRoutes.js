import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/api/token", authController.login);

export default router;
