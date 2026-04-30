import { Schema, Types, model } from "mongoose";

// --------------------------------------------------------------

interface IBookingLink {
    userId: Types.ObjectId;
    linkId: string;
    availabilityIds: Types.ObjectId[];
}

// --------------------------------------------------------------

const bookingLinkSchema = new Schema<IBookingLink>({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },

    linkId: {
        type: String,
        required: true,
        unique: true
    },

    availabilityIds: [
        {
            type: Types.ObjectId,
            ref: "Availability",
            required: true
        }
    ]
});

const BookingLinkModel = model("BookingLink", bookingLinkSchema);
export default BookingLinkModel;