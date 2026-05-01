import { Types } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { addAvailabilityService, getAvailabilityService } from "../services";
import { sendResponse } from "../utils/response";

// ---------------------------------------------------------------

export const addAvailabilityController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = Array.isArray(id) ? id[0] : id;

        const availabilityData = await addAvailabilityService({
            userId: new Types.ObjectId(userId),
            slots: req.body
        });

        return sendResponse({
            res,
            statusCode: 201,
            data: availabilityData,
            status: "success",
            message: "Availability added successfully"
        });

    } catch (err: any) {
        next(err)
    }
};

export const getAvailabilityController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = Array.isArray(id) ? id[0] : id;

        const availabilityData = await getAvailabilityService(userId);

        return sendResponse({
            res,
            statusCode: 200,
            data: availabilityData,
            status: "success",
            message: "Availability retrieved successfully"
        });

    } catch (err: any) {
        next(err)
    }
};


