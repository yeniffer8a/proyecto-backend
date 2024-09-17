import orderController from "../controllers/orderController.js";
import express from "express";
import { expressjwt } from "express-jwt";
import Order from "../models/Order.js";
import adminValidation from "../middlewares/adminValidation.js";

const router = express.Router();

function checkJwt() {
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });
}

router.get(
  "/api/orders",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  orderController.getAll
);
router.get(
  "/api/orders/:id",
  checkJwt,
  adminValidation,
  orderController.getOrderById
);
router.post(
  "/api/orders",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  orderController.createOrder
);
router.patch(
  "/api/orders/:id",
  adminValidation,
  checkJwt,
  orderController.updateOrder
);
router.delete(
  "/api/orders/:id",
  adminValidation,
  checkJwt,
  orderController.destroyOrder
);

export default router;
