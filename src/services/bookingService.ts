import mongoose, { Types } from "mongoose";
import { BookingModel } from "../database/model";
import { AppError } from "../utils/appError";

// -------------------------------------------------------------

export const addBookingService = async ({
    availabilityIds,
    guestEmail,
    guestName
}: {
    availabilityIds: Types.ObjectId[];
    guestEmail: string;
    guestName: string;
}) => {

    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        const bookingDocs = availabilityIds.map((id) => ({
            availabilityId: new Types.ObjectId(id),
            guestEmail,
            guestName
        }));

        const bookings = await BookingModel.insertMany(bookingDocs, {
            // session,
            ordered: true // all-or-nothing
        });

        // await session.commitTransaction();
        // session.endSession();

        return bookings;

    } catch (err: any) {
        // await session.abortTransaction();
        // session.endSession();

        if (err.code === 11000) {
            throw new AppError("One or more slots are already booked", 400);
        }

        throw err;
    }
};