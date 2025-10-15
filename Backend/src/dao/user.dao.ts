import type { IUser, IUserMethods, UserDocument } from "../models/user.model.js";
import { userModel } from "../models/user.model.js";

export const findUserById = async (userId: string): Promise<UserDocument | null> => {
	return await userModel.findById(userId);
}

export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
	return await userModel.findOne({ email });
};

export const findUserByEmailWithPassword = async (email: string): Promise<UserDocument | null> => {
	return await userModel.findOne({ email }).select("+passwordHash") as UserDocument | null;
};

export const createUser = async (name: string, email: string, password: string) => {
	const newUser = new userModel({ name, email, passwordHash: password })
	await newUser.save()
	return newUser
}
