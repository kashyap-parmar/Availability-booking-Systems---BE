import { UserModel } from "../database/model";
import { AppError } from "../utils/appError";
import { INVALID_CREDENTIALS, USER_ALREADY_EXISTS } from "../utils/constants";
import { comparePassword, hashPassword } from "../utils/encription";
import { generateToken } from "../utils/jwt";

// -------------------------------------------------------------

export const register = async (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}) => {
    const exists = await UserModel.findOne({ email: payload.email });

    if (exists) throw new AppError(USER_ALREADY_EXISTS, 400);

    const hashedPassword = await hashPassword(payload.password);

    const userData = await UserModel.create({
        ...payload,
        password: hashedPassword
    });

    const { password, __v, ...user } = userData.toObject();

    const token = generateToken({ userId: user._id, role: user.role });

    return { ...user, token };
};

export const login = async (payload: {
    email: string;
    password: string;
}) => {

    const userExists = await UserModel.findOne({ email: payload.email });

    if (!userExists) throw new AppError(INVALID_CREDENTIALS, 401);

    const isMatch = await comparePassword(payload.password, userExists.password);

    if (!isMatch) throw new AppError(INVALID_CREDENTIALS, 401);

    const { password, __v, ...user } = userExists.toObject();

    const token = generateToken({ userId: user._id, role: user.role });

    return { ...user, token };
};