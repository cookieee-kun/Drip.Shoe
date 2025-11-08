import express from 'express';
// Routes
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
// Middlewares
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
// Config Files
import { connectDB } from './config/mongo.config.js';
import { webhookHandler } from './controllers/cart.controller.js'

dotenv.config()

const app = express();
const PORT = 3000;

app.post("/api/cart/webhooks", express.raw({ type: "application/json" }), webhookHandler)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
