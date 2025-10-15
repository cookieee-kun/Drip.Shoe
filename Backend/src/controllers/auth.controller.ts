import type { Request, Response } from "express";
import { wrapAsync } from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/cookieOptions.js";


export const register_user = wrapAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Basic validation
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Call service to register user
  const { token, user } = await registerUser(name, email, password);
  req.user = user
  res.cookie("accessToken", token, cookieOptions);

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login_user = wrapAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Basic validation
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Call service to login user
  const { token, user } = await loginUser(email, password);
  req.user = user
  res.cookie("accessToken", token, cookieOptions);

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});