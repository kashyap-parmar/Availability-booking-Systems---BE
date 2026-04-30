import mongoose, { Schema, Document } from "mongoose";
import baseFields, { IBaseFields } from "./basefieldsSchema";

// --------------------------------------------------------

export interface IUser extends Document, IBaseFields {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

// --------------------------------------------------------

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },
    ...baseFields
});

export const User = mongoose.model<IUser>("User", userSchema);