import { NextFunction, Request, Response } from "express";
import { addBookingService } from "../services";
import { sendResponse } from "../utils/response";
import { YOUR_BOOKING_IS_SUCCESSFULLY_ADDED } from "../utils/constants";

// ---------------------------------------------------------------

export const addBookingController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { availabilities } = req.body;

        const result = await addBookingService({
            availabilityIds: availabilities,
            guestEmail: req.body.guestEmail,
            guestName: req.body.guestName
        });

        return sendResponse({
            res,
            statusCode: 201,
            data: result,
            status: "success",
            message: YOUR_BOOKING_IS_SUCCESSFULLY_ADDED
        });

    } catch (err: any) {
        next(err)
    }
};