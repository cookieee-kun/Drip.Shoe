import { Router } from "express"
import { getAllProducts, addProduct } from "../controllers/product.controller.js"
const router = Router()

router.get("/all", getAllProducts)
router.post("/add", addProduct)	
export default router