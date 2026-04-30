import mongoose, { Schema, Types } from "mongoose";
import baseFields, { IBaseFields } from "./basefieldsSchema";

// -------------------------------------------------------------------

export interface IBooking extends Document, IBaseFields {
    availabilityId: Types.ObjectId;
    bookedBy?: Types.ObjectId;
}

// -------------------------------------------------------------------

const { ObjectId } = Schema.Types;

// -------------------------------------------------------------------

const bookingSchema = new Schema<IBooking>({
    availabilityId: {
        type: ObjectId,
        ref: "Availability",
        required: true,
        unique: true,
    },

    bookedBy: {
        type: ObjectId,
        ref: "User",
        default: null,
    },

    ...baseFields,
});

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);