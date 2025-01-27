import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./lib/dbConnect.js";

import productRoutes from "./routes/product.route.js";
import paymentRoutes from "./routes/paymentIntent.route.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  dbConnect();
});
