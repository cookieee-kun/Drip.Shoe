import Stripe from "stripe";
import { getCartService } from "../services/cart.service.js";
import { saveOrder, getOrderByPaymentIntent } from "../dao/order.dao.js";

export const createOrderFromStripeSession = async (
  session: Stripe.Checkout.Session
) => {
  const paymentIntentId =
    (typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent as Stripe.PaymentIntent | null)?.id) ?? null;

  if (!paymentIntentId) throw new Error("Missing payment_intent on session.");
  const userId = session.metadata?.userId;
  if (!userId) throw new Error("Missing userId in session metadata.");

  const existing = await getOrderByPaymentIntent(paymentIntentId);
  if (existing) return existing;


  const cd = session.customer_details;
  // console.log("session: ", session)
  const sd = session.collected_information?.shipping_details;

  const shippingAddress = sd?.address
    ? {
      fullName: sd.name || "",
      phone: session.customer_details?.phone || "", 
      addressLine1: sd.address.line1 || "",
      addressLine2: sd.address.line2 || "",
      city: sd.address.city || "",
      state: sd.address.state || "",
      postalCode: sd.address.postal_code || "",
      country: sd.address.country || "",
    }
    : undefined;


  // Load cart by userId and snapshot items
  const cart = await getCartService(userId);
  if (!cart || !cart.items || cart.items.length === 0) {
    throw new Error("Cart not found or empty.");
  }

  const items = cart.items.map((ci: any) => ({
    productId: ci.productId._id ?? ci.productId,
    name: ci.productId.name,
    category: ci.productId.category,
    size: ci.size,
    quantity: ci.quantity,
    price: ci.productId.price,
    status: "Pending" as const,
    updatedAt: new Date(),
  }));

  const totalAmount = (session.amount_total ?? 0) / 100; // INR in major units
  const pi = (typeof session.payment_intent === "object"
    ? (session.payment_intent as Stripe.PaymentIntent)
    : null);
  const paymentMethod = session.payment_method_types?.includes("upi") ? "UPI" : "Card";

  const orderData = {
    userId,
    items,
    totalAmount,
    paymentMethod,
    paymentStatus: "Paid",
    shippingAddress,
    trackingId: undefined,
    paymentIntentId,
  };

  const order = await saveOrder(orderData);

  return order;
};