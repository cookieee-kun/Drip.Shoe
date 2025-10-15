import express from 'express';
import authRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import { connectDB } from './config/mongo.config.js';

dotenv.config()

const app = express();
const PORT: Number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)
app.use(cookieParser())
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});