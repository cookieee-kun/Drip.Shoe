import mongoose, { Schema, Document, Types } from "mongoose";

interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  category: "Running" | "Casual" | "Sneaker" | "Slides";
  size: number;
  quantity: number;
  price: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  updatedAt: Date;
}

interface IShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: "Card" | "UPI" | "Cash on Delivery";
  paymentStatus: "Paid" | "Unpaid" | "Refunded";
  shippingAddress: IShippingAddress;
  trackingId?: string;
  paymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["Running", "Casual", "Sneaker", "Slides"] },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  updatedAt: { type: Date, default: Date.now }
});

const ShippingAddressSchema: Schema = new Schema<IShippingAddress>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

const OrderSchema: Schema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Card", "UPI", "Cash on Delivery"], required: true },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid", "Refunded"], default: "Unpaid" },
  shippingAddress: ShippingAddressSchema,
  trackingId: String,
  paymentIntentId: { type: String, unique: true },
},
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
