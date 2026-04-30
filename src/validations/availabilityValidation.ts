import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// --------------------------------------------

/**
 * AVAILABILITY VALIDATION MIDDLEWARE
 */
const validateAvailability = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const isoFormat = "YYYY-MM-DDTHH:mm:ss[Z]";

    const strictDate = (value: string, helpers: any) => {
        const isValid = dayjs(value, isoFormat, true).isValid();

        if (!isValid) {
            return helpers.error("date.invalid");
        }

        return value;
    };

    const availabilitySchema = Joi.object({
        startTime: Joi.string()
            .required()
            .custom(strictDate)
            .messages({
                "date.invalid": "Invalid startTime date"
            }),

        endTime: Joi.string()
            .required()
            .custom(strictDate)
            .messages({
                "date.invalid": "Invalid endTime date"
            })
    })
        .custom((value, helpers) => {
            const start = new Date(value.startTime);
            const end = new Date(value.endTime);

            if (end <= start) {
                return helpers.error("date.order");
            }

            return value;
        })
        .messages({
            "date.order": "End time must be greater than start time"
        });

    const { error, value } = availabilitySchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const errors = error.details.map((err) => ({
            message: err.message,
            key: err.context?.key
        }));

        return sendResponse({
            res,
            statusCode: 400,
            message: "Validation failed",
            status: 'error',
            error: errors
        })
    }

    req.body = value;
    next();
};

export default validateAvailability;   