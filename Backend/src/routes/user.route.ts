import express from "express"
import {getUserDetails} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/user:id", getUserDetails)

export default router;