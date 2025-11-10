import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import Product from "../models/product.model.js";

export async function toggleWishlist(userId: string, productId: string) {
  const [user, product] = await Promise.all([
    userModel.findById(userId),
    Product.findById(productId),
  ]);

  if (!user) throw new Error("USER_NOT_FOUND");
  if (!product) throw new Error("PRODUCT_NOT_FOUND");
  console.log(user)

  const idx = user.wishlist!.findIndex((id) => id.toString() === productId);

  let action: "added" | "removed";
  if (idx === -1) {
    user.wishlist!.push(new mongoose.Types.ObjectId(productId));
    action = "added";
  } else {
    user.wishlist!.splice(idx, 1);
    action = "removed";
  }

  await user.save();
  return { action, wishlist: user.wishlist };
}

export async function getWishlist(userId: string) {
  const user = await userModel.findById(userId).populate("wishlist");
  if (!user) throw new Error("USER_NOT_FOUND");
  return user.wishlist;
}
