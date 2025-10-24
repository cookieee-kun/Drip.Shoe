import { Router } from 'express'
import { register_user, login_user } from '../controllers/auth.controller.js'

const router = Router()

router.post("/register", register_user)
router.post("/login", login_user)

export default router 