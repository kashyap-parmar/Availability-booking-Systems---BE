import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";
import { VALIDATION_FAILED } from "../utils/constants";

// --------------------------------------------

/**
 * REGISTER VALIDATION MIDDLEWARE
 */
const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const registerSchema = Joi.object({
        firstName: Joi.string().trim().required().messages({
            "any.required": "First name is required",
            "string.base": "First name must be a string",
        }),

        lastName: Joi.string().trim().required().messages({
            "any.required": "Last name is required",
            "string.base": "Last name must be a string",
        }),

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

        role: Joi.string().valid("host", "admin", "user").required().messages({
            "any.only": "Role must be one of 'host', 'admin', or 'user'",
            "any.required": "Role is required"
        })
    });

    const { error, value } = registerSchema.validate(req.body, {
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

export default validateRegister;