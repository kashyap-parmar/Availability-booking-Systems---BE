import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants";
import { Types } from "mongoose";

// --------------------------------------------------------

export const generateToken = (payload: {
    userId: Types.ObjectId;
    role?: string;
}): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d"
    });
};

export const verifyToken = async (token: string) => {
    return jwt.verify(token, JWT_SECRET) as {
        userId: string;
        role?: string;
    };
}; 
