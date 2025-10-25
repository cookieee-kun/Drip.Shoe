import express from 'express'
import { addToCart, getCartItems, removeFromCart, updateCartItem } from '../controllers/cart.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(authMiddleware)
router.get("/", getCartItems)
router.post("/add", addToCart)
router.patch("/update", updateCartItem)
router.delete("/remove", removeFromCart)

export default router