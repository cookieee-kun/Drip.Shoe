import type { Request, Response } from "express";
import { userModel } from "../models/user.model.js";
import { wrapAsync } from "../utils/tryCatchWrapper.js";
import { toggleWishlist, getWishlist } from "../services/wishList.service.js";


interface AuthenticatedRequest extends Request {
  user?: string;
}

function sendError(res: Response, err: unknown) {
  const code = (err as Error)?.message;
  switch (code) {
    case "USER_NOT_FOUND":
      return res.status(404).json({ message: "User not found" });
    case "PRODUCT_NOT_FOUND":
      return res.status(404).json({ message: "Product not found" });
    default:
      return res.status(500).json({ message: "Server error" });
  }
}

export const getUserDetails = wrapAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const user = await userModel.findById(userId)
    .select("-passwordHash")
    .populate("wishlist")
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

export const toggleWishlistController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!productId) return res.status(400).json({ message: "productId is required" });

    const result = await toggleWishlist(userId, productId);
    return res.status(200).json(result);
  } catch (err) {
    return sendError(res, err);
  }
};

export const getWishlistController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const wishlist = await getWishlist(userId);
    return res.status(200).json({ wishlist });
  } catch (err) {
    return sendError(res, err);
  }
};