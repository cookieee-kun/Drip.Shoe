import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  productId: mongoose.Types.ObjectId;
  size?: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: CartItem[];
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        size: { type: Number },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", cartSchema);
