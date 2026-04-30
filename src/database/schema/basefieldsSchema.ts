import { Schema, Types } from "mongoose";

// ----------------------------------------------

export interface IBaseFields {
    isDeleted: boolean;

    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    deletedBy?: Types.ObjectId;

    deletedToken?: string;
}

// ----------------------------------------------

const { ObjectId } = Schema.Types;

// ----------------------------------------------

const baseFields = {
    isDeleted: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
    },

    deletedAt: {
        type: Date,
    },

    createdBy: {
        type: ObjectId,
        ref: "User",
    },

    updatedBy: {
        type: ObjectId,
        ref: "User",
    },

    deletedBy: {
        type: ObjectId,
        ref: "User",
    },

    deletedToken: {
        type: String
    }
};

export default baseFields;