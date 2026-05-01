import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { getUserByIdService } from "../services";
import { sendResponse } from "../utils/response";
import { USER_RETRIEVED_SUCCESSFULLY } from "../utils/constants";

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
            message: USER_RETRIEVED_SUCCESSFULLY,
            data: user
        })
    } catch (err) {
        next(err);
    }
};