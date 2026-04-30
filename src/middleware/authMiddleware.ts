import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/appError";

// --------------------------------------------------------------------

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role?: string;
    };
}

// --------------------------------------------------------------------

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
};