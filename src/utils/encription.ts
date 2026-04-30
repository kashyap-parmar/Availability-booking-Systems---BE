import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./constants";

// -------------------------------------------------------------

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, Number(SALT_ROUNDS));
};

export const comparePassword = async (
    plain: string,
    hashed: string
): Promise<boolean> => {
    return bcrypt.compare(plain, hashed);
};