import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { BookingLinkModel, AvailabilityModel } from "../database/model";
import { AppError } from "../utils/appError";

// --------------------------------------------------------------------

export const generateLinkService = async ({
    userId
}: {
    userId: Types.ObjectId;
}) => {

    // fetch all availability of user
    const availability = await AvailabilityModel.find({
        userId,
        isDeleted: false
    }).select("_id");

    if (!availability.length) {
        throw new AppError("No availability found to generate link", 400);
    }

    const linkId = uuidv4();

    const bookingLink = await BookingLinkModel.create({
        userId,
        linkId,
        availabilityIds: availability.map(a => a._id)
    });

    return bookingLink;
};