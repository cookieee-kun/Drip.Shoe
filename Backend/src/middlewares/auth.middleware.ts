import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helper.js";

interface AuthenticatedRequest extends Request {
	user?: any;
	token?: string;
}

export const authMiddleware = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log("cookiee:", req.cookies)
		const token = req.cookies.accessToken;

		if (!token) {
			return res.status(401).json({ message: "No token found in cookies" });
		}

		const decoded = verifyToken(token)
		req.user = decoded;

		next();
	} catch (error) {
		console.error("Auth Middleware Error:", error);
		res.status(403).json({ message: "Invalid or expired token" });
	}
};
