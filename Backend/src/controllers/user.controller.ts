import type { Request, Response } from "express";
import { userModel } from "../models/user.model.js";
import { wrapAsync } from "../utils/tryCatchWrapper.js";

// GET /api/users/:id
export const getUserDetails = wrapAsync(async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; // get user ID from URL

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userModel.findById(userId)
      .select("-passwordHash") // do not return password
      // .populate("wishlist")    // optional: populate wishlist products
      // .populate("orders");     // optional: populate orders

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
})
