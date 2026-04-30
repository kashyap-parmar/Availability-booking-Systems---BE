import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";

// --------------------------------------------

/**
 * LOGIN VALIDATION MIDDLEWARE
 */
const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            "any.required": "Email is required",
            "string.email": "Invalid email format",
        }),
        password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\\d@$!%*?&#^()_+=-]{8,}$"))
            .required()
            .messages({
                "string.pattern.base": "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                "any.required": "Password is required"
            }),
    });

    const { error, value } = loginSchema.validate(req.body, {
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

export default validateLogin;