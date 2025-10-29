import Order  from "../models/order.model.js";

export const saveOrder = async (orderData: any) => {
	return await Order.create(orderData);
};

export const getOrderByPaymentIntent = async (paymentIntentId: string) => {
	return await Order.findOne({ paymentIntentId });
};
