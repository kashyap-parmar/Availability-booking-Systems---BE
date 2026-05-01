import { NextFunction, Request, Response } from "express";
import { register, login } from "../services";
import { sendResponse } from "../utils/response";
import { USER_LOGGED_IN_SUCCESSFULLY, USER_REGISTERED_SUCCESSFULLY } from "../utils/constants";

// ---------------------------------------------------------------

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await register(req.body);

        return sendResponse({
            res,
            status: 'success',
            statusCode: 201,
            message: USER_REGISTERED_SUCCESSFULLY,
            data: result
        })

    } catch (err: any) {
        next(err)
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await login(req.body);

        return sendResponse({
            res,
            status: 'success',
            statusCode: 200,
            message: USER_LOGGED_IN_SUCCESSFULLY,
            data: result
        })

    } catch (err: any) {
        next(err)
    }
};
