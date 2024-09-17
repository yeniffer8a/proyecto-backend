import express from "express";
import userController from "../controllers/userController.js";
import upload from "../config/multer.js";
import { expressjwt } from "express-jwt";

const router = express.Router();

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:id", userController.getUserById);
router.post("/api/users", upload.single("imgUser"), userController.createUser);
router.patch("/api/users/:id", userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);
// router.get(
//   "/api/my-orders",
//   expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
//   userController.myOrders
// );

export default router;
