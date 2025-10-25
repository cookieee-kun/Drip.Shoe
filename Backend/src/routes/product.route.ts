import { Router } from "express"
import { getAllProducts, addProduct, getProductById } from "../controllers/product.controller.js"
const router = Router()

router.get("/all", getAllProducts)
router.post("/add", addProduct)
router.get("/:id", getProductById)

export default router