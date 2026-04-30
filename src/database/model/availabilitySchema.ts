import mongoose, { Schema, Document, Types } from "mongoose";
import baseFields, { IBaseFields } from "./basefieldSchema";

// -------------------------------------------------------------------

export interface IAvailability extends Document, IBaseFields {
    userId: Types.ObjectId;
    startTime: Date;
    endTime: Date;
}

// -------------------------------------------------------------------

const { ObjectId } = Schema.Types;

// -------------------------------------------------------------------

const availabilitySchema = new Schema<IAvailability>({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },

    startTime: {
        type: Date,
        required: true,
    },

    endTime: {
        type: Date,
        required: true,
    },
    ...baseFields
});

const Availability = mongoose.model<IAvailability>("Availability", availabilitySchema);
export default Availability;