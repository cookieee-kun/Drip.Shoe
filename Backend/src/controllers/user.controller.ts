import type { Request, Response } from "express";
import { userModel } from "../models/user.model.js";
import { wrapAsync } from "../utils/tryCatchWrapper.js";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getUserDetails = wrapAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const user = await userModel.findById(userId)
    .select("-passwordHash")
  // .populate("wishlist")
  // .populate("orders");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { passwordHash, ...safeUser } = user.toObject();
  res.status(200).json({
    message: "User details retrieved successfully",
    user: safeUser,
  });
});
