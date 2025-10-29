import { saveOrder, getOrderByPaymentIntent } from "../dao/order.dao.js";

export const createOrderFromStripeSession = async (session: any) => {
  const existingOrder = await getOrderByPaymentIntent(session.payment_intent);
  if (existingOrder) return existingOrder; // avoid duplicate webhook calls

  const orderData = {
    userId: session.metadata.userId,
    paymentIntentId: session.payment_intent as string,
    items: JSON.parse(session.metadata.items),
    amount: session.amount_total! / 100,
    currency: session.currency,
    status: "paid"
  };

  return await saveOrder(orderData);
};
