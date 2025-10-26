import express from 'express'
import { addToCart, getCartItems, removeFromCart, updateCartItem, checkoutCart } from '../controllers/cart.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(authMiddleware)
router.get("/", getCartItems)
router.post("/add", addToCart)
router.patch("/update", updateCartItem)
router.delete("/remove", removeFromCart)
router.post("/create-checkout-session", checkoutCart)

export default router