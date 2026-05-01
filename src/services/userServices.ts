import { Types } from "mongoose";
import { UserModel } from "../database/model";
import { AppError } from "../utils/appError";
import { USER_NOT_FOUND } from "../utils/constants";

// -------------------------------------------------------------------------

export const getUserByIdService = async (userId: Types.ObjectId) => {
    const user = await UserModel.findById(userId).select("-password -__v");

    if (!user) {
        throw new AppError(USER_NOT_FOUND, 404);
    }

    return user;
};