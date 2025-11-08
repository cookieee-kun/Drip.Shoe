import express from 'express'
import { addToCart, getCartItems, removeFromCart, updateCartItem, checkoutCart, webhookHandler } from '../controllers/cart.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get("/", authMiddleware, getCartItems)
router.post("/add", authMiddleware, addToCart)
router.patch("/update", authMiddleware, updateCartItem)
router.delete("/remove", authMiddleware, removeFromCart)
router.post("/create-checkout-session", authMiddleware, checkoutCart)
// router.post("/webhooks", webhookHandler);

export default router