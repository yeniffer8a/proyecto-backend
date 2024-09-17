import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/database.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
connectDB();

app.use(express.json());

// const newavatar = path.join(import.meta.dirname, "avatar/ImgUser");

// if (!fs.existsSync(newavatar)) {
//   fs.mkdirSync(newavatar, { recursive: true });
// }

app.use(userRoutes);
app.use(authRoutes);
app.use(orderRoutes);
app.use(productRoutes);

//servidor en escucha
app.listen(process.env.APP_PORT, () => {
  console.log(`[Server] Server running at ${process.env.APP_PORT} port`);
});
