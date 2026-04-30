import { Response } from "express";

// ----------------------------------------------

type SuccessResponse = {
    res: Response;
    status: "success";
    message: string;
    statusCode: number;
    data: any;
};

type ErrorResponse = {
    res: Response;
    status: "error";
    message: string;
    statusCode: number;
    error: any;
};

type ResponseType = SuccessResponse | ErrorResponse;

// -----------------------------------------------------

export const sendSuccessResponse = (params: ResponseType) => {

    const { res, status, message, statusCode } = params;

    let responseData: {
        message: string;
        error?: any;
        data?: any;
        is_error: boolean;
    } = {
        message,
        is_error: false
    };

    if (status === "error") {
        responseData.error = params?.error
        responseData.is_error = true
    } else {
        responseData.data = params?.data || []
    }

    return res.status(statusCode || 200).json(responseData);
}