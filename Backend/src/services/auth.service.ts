import type { IUser, IUserMethods } from "../models/user.model.js";
import type { HydratedDocument } from "mongoose";
import { createUser, findUserByEmail, findUserByEmailWithPassword } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js"

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already registered");

  const user = await createUser(name, email, password);

  const token = signToken({ id: user._id.toString() });

  return { token, user };
};

export const loginUser = async (email: string, password: string) => {
  const user: HydratedDocument<IUser, IUserMethods> | null = await findUserByEmailWithPassword(email);
	if (!user) throw new Error("Invalid email or password")

	const isPasswordValid = await user.comparePassword(password)
	if (!isPasswordValid) throw new Error("Invalid email or password")

  const token = signToken({ id: user._id.toString() });
  
	return { token, user }  
};
