import mongoose, { Schema, Types } from "mongoose";
import baseFields, { IBaseFields } from "./basefieldSchema";

// -------------------------------------------------------------------

export interface IBooking extends Document, IBaseFields {
    availabilityId: Types.ObjectId;
    guestEmail: string;
    guestName: string;
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
    guestEmail: {
        type: String,
        trim: true,
        required: true,
    },
    guestName: {
        type: String,
        trim: true,
        required: true,
        default: "unknown",
    },
    ...baseFields,
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;