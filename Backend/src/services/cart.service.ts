import Cart from "../models/cart.model.js";
import type { ICart } from "../models/cart.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import stripe from "../config/stripe.config.js";
import Stripe from "stripe";

interface CartItemInput {
	productId: string;
	quantity?: number;
	size: number;
}

export const getCartService = async (userId: string): Promise<ICart> => {
	let cart = await Cart.findOne({ userId }).populate(
		"items.productId",
		"name price category images brand"
	);

	if (!cart) cart = new Cart({ userId, items: [] });
	return cart;
};

export const addToCartService = async (
	userId: string,
	item: CartItemInput
): Promise<ICart> => {
	const { productId, quantity = 1, size } = item;

	const product = await Product.findById(productId);
	if (!product) throw new Error("Product not found");

	const availableQty = product.sizes?.find(s => s.size === size)?.quantity ?? 0;
	if (quantity > availableQty) throw new Error(`Only ${availableQty} items available for size ${size}`);

	let cart = await Cart.findOne({ userId });
	if (!cart) cart = new Cart({ userId, items: [] });

	const existingIndex = cart.items.findIndex(
		i => i.productId.toString() === productId && i.size === size
	);

	if (existingIndex > -1) {
		const existingItem = cart.items[existingIndex];
		if (existingItem) existingItem.quantity += quantity;

	} else {
		cart.items.push({
			productId: new mongoose.Types.ObjectId(productId),
			quantity,
			size
		});
	}

	await cart.save();
	return cart;
};

export const updateCartItemService = async (
	userId: string,
	item: CartItemInput
): Promise<ICart> => {
	const { productId, quantity, size } = item;

	if (!quantity || quantity < 1) throw new Error("Quantity must be at least 1");

	const product = await Product.findById(productId);
	if (!product) throw new Error("Product not found");

	const availableQty = product.sizes?.find(s => s.size === size)?.quantity ?? 0;
	if (quantity > availableQty) throw new Error(`Only ${availableQty} items available for size ${size}`);

	const cart = await Cart.findOne({ userId });
	if (!cart) throw new Error("Cart not found");

	const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId && i.size === size);
	if (itemIndex === -1) throw new Error("Item not found in cart");

	const existingItem = cart.items[itemIndex];
	if (existingItem) existingItem.quantity = quantity;

	await cart.save();
	return cart;
};

export const removeFromCartService = async (
	userId: string,
	productId: string,
	size?: number
): Promise<ICart> => {
	const cart = await Cart.findOne({ userId });
	if (!cart) throw new Error("Cart not found");

	cart.items = cart.items.filter(item => {
		if (size != null) return !(item.productId.toString() === productId && item.size === size);
		return item.productId.toString() !== productId;
	});

	await cart.save();
	return cart;
};

export const clearCartService = async (userId: string): Promise<ICart> => {
	const cart = await Cart.findOne({ userId });
	if (!cart) throw new Error("Cart not found");

	cart.items = [];
	await cart.save();
	return cart;
};

interface CheckoutProduct {
	name: string;
	price: number;
	quantity: number;
}

// export const createCheckoutSession = async (
// 	products: CheckoutProduct[],
// 	userId: string,
// ): Promise<Stripe.Checkout.Session> => {
// 	const cart = await getCartService(userId);

// 	return stripe.checkout.sessions.create({
// 		payment_method_types: ["card"],
// 		mode: "payment",
// 		line_items: products.map((p) => ({
// 			price_data: {
// 				currency: "inr",
// 				product_data: { name: p.name },
// 				unit_amount: p.price * 100,
// 			},
// 			quantity: p.quantity,
// 		})),
// 		metadata: {
// 			userId: userId.toString(),
// 			cartId: cart.id,
// 		},
// 		success_url: "https://example.com/success",
// 		cancel_url: "https://example.com/cancel",

// 	});
// };

export const createCheckoutSession = async (
	products: CheckoutProduct[],
	userId: string,
): Promise<Stripe.Checkout.Session> => {
	const cart = await getCartService(userId);
	return stripe.checkout.sessions.create({
		mode: "payment",
		shipping_address_collection: { allowed_countries: ["IN"] },
		phone_number_collection: { enabled: true },

		line_items: products.map((p) => ({
			price_data: {
				currency: "inr",
				product_data: { name: p.name },
				unit_amount: Math.round(p.price * 100),
			},
			quantity: p.quantity,
		})),

		success_url: `${process.env.APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.APP_URL}/cart`,
		client_reference_id: userId,
		metadata: {
			userId: userId.toString(),
			cartId: cart.id.toString(),
		},
	});
};


export const getCartForStripe = async (userId: string): Promise<CheckoutProduct[]> => {
	const cart = await Cart.findOne({ userId }).populate(
		"items.productId",
		"name category price images brand"
	);

	if (!cart || cart.items.length === 0) {
		throw new Error("Cart not found or empty");
	}

	return cart.items.map((item: any) => ({
		name: item.productId.name,
		category: item.productId.category,
		price: item.productId.price,
		quantity: item.quantity,
	}));
};