import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";
import { VALIDATION_FAILED } from "../utils/constants";

// --------------------------------------------

/**
 * BOOKING VALIDATION MIDDLEWARE
 */
const validateBooking = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const bookingSchema = Joi.object({
        guestName: Joi.string().trim().required().messages({
            "any.required": "Last name is required",
            "string.base": "Last name must be a string",
        }),

        guestEmail: Joi.string().email().required().strict().messages({
            "any.required": "Email is required",
            "string.email": "Invalid email format",
        }),
        availabilities: Joi.array()
            .items(
                Joi.string()
                    .required()
                    .pattern(/^[0-9a-fA-F]{24}$/) // ObjectId validation
                    .messages({
                        "string.base": "Availability ID must be a string",
                        "string.empty": "Availability ID cannot be empty",
                        "string.pattern.base": "Invalid availability ID format"
                    })
            )
            .min(1)
            .required()
            .messages({
                "array.base": "Availabilities must be an array",
                "array.min": "At least one availability is required",
                "any.required": "Availabilities are required"
            })
    });

    const { error, value } = bookingSchema.validate(req.body, {
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
            message: VALIDATION_FAILED,
            status: 'error',
            error: errors
        })
    }

    req.body = value;
    next();
};

export default validateBooking;