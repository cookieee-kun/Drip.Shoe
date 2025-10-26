import type { Request, Response } from "express";
import { addToCartService, clearCartService, createCheckoutSession, getCartForStripe, getCartService, removeFromCartService, updateCartItemService } from "../services/cart.service.js";

interface AuthRequest extends Request {
	user?: string;
}

export const getCartItems = async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const userId = req.user;
		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const cart = await getCartService(userId);
		if (!cart) {
			res.status(200).json({
				message: "Cart is empty",
				cart: { items: [] },
			});
			return;
		}
		res.status(200).json({ message: "Cart fetched successfully", cart, });
	} catch (error) {
		console.error("Error getting cart:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const addToCart = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const cart = await addToCartService(userId, req.body);
		res.status(200).json({ message: "Product added to cart", cart });
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
	try {
		const userId = req.user;
		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const { productId, size } = req.body;
		if (!productId) {
			res.status(400).json({ message: "productId is required" });
			return;
		}

		const cart = await removeFromCartService(userId, productId, size);

		res.status(200).json({
			message: "Product removed from cart",
			cart,
		});
	} catch (error: any) {
		console.error("Error removing from cart:", error);
		if (error.message === "Invalid productId") {
			res.status(400).json({ message: error.message });
		} else if (error.message === "Cart not found") {
			res.status(404).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Internal server error" });
		}
	}
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const cart = await updateCartItemService(userId, req.body);
		res.status(200).json({ message: "Cart item updated", cart });
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

export const clearCart = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const cart = await clearCartService(userId);
		res.status(200).json({ message: "Cart cleared", cart });
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

export const checkoutCart = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const products = await getCartForStripe(userId)
		console.log(products)
		if (!products || !Array.isArray(products)) return res.status(400).json({ message: "Products are required" });

		const session = await createCheckoutSession(products);
		res.json({ checkoutUrl: session.url });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
}