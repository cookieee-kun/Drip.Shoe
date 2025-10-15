import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  [key: string]: any;
}

const getJwtSecret = (): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return process.env.JWT_SECRET;
};

// Sign token
export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "2h" });
};

// Verify token
export const verifyToken = (token: string): string => {
  const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload & { id: string };
  return decoded.id;
};
