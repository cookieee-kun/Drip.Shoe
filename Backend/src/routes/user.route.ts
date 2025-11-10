import express from "express"
import { getUserDetails, toggleWishlistController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/details", authMiddleware, getUserDetails)
router.post("/toggleProductInWishlist", authMiddleware, toggleWishlistController)

export default router;