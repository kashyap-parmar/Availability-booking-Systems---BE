import { Types } from "mongoose";
import { UserModel } from "../database/model";
import { AppError } from "../utils/appError";

// -------------------------------------------------------------------------

export const getUserByIdService = async (userId: Types.ObjectId) => {
    const user = await UserModel.findById(userId).select("-password -__v");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};