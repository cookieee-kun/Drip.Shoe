import express from "express"
import {getUserDetails} from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/details", authMiddleware, getUserDetails)

export default router;