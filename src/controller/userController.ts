import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { getUserByIdService } from "../services";
import { sendResponse } from "../utils/response";

// ---------------------------------------------------------------

export const getUserByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const userId = Array.isArray(id) ? id[0] : id;

        const user = await getUserByIdService(
            new Types.ObjectId(userId)
        );

        return sendResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "User retrieved successfully",
            data: user
        })
    } catch (err) {
        next(err);
    }
};