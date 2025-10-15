import mongoose, { Schema, Types, model, Model } from "mongoose";
import type { HydratedDocument } from "mongoose";

import bcrypt from "bcryptjs";

// --------------------
// Address type
// --------------------
export interface IAddress {
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  default?: boolean;
}

// --------------------
// User fields
// --------------------
export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  profilePicture?: string;
  wishlist?: Types.ObjectId[];
  addresses?: IAddress[];
  orders?: Types.ObjectId[];
  role: "User" | "Admin";
  createdAt: Date;
  updatedAt: Date;
}

// --------------------
// Instance methods
// --------------------
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// --------------------
// Document type
// --------------------
export type UserDocument = HydratedDocument<IUser, IUserMethods>;

// --------------------
// Model type with statics
// --------------------
export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findByEmail(email: string): Promise<UserDocument | null>;
}

// --------------------
// Address Schema
// --------------------
const AddressSchema = new Schema<IAddress>({
  label: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  default: Boolean,
});

// --------------------
// User Schema
// --------------------
const UserSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: String,
    profilePicture: String,
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    addresses: [AddressSchema],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  { timestamps: true }
);

// --------------------
// Pre-save hook: hash password
// --------------------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// --------------------
// Instance method: comparePassword
// --------------------
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// --------------------
// Export model
// --------------------
export const userModel = model<IUser, IUserModel>("User", UserSchema);
