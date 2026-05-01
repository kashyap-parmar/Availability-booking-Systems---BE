import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { generateLinkService } from "../services";
import { sendResponse } from "../utils/response";
import { BOOKING_LINK_GENERATED_SUCCESSFULLY } from "../utils/constants";

// --------------------------------------------------------------------

export const generateLinkController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as any)?.user?.userId;

        const result = await generateLinkService({
            userId: new Types.ObjectId(userId)
        });

        return sendResponse({
            res,
            statusCode: 201,
            status: "success",
            message: BOOKING_LINK_GENERATED_SUCCESSFULLY,
            data: result
        })

    } catch (err) {
        next(err);
    }
};