import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			
			// Check if the userId is a guest ID
			if (decoded.userId.startsWith('guest_')) {
				// For guest users, create a temporary user object
				req.user = {
					_id: decoded.userId,
					name: 'Guest User',
					role: 'guest'
				};
				return next();
			}

			// For regular users, verify the MongoDB ObjectId
			if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
				return res.status(401).json({ message: "Invalid user ID format" });
			}

			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};
