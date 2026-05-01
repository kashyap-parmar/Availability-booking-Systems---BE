import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { BookingLinkModel, AvailabilityModel } from "../database/model";
import { AppError } from "../utils/appError";
import { AVAILABILITY_NOT_FOUND } from "../utils/constants";

// --------------------------------------------------------------------

export const generateLinkService = async ({
    userId
}: {
    userId: Types.ObjectId;
}) => {

    const availability = await AvailabilityModel.find({
        userId,
        isDeleted: false
    }).select("_id");

    if (!availability.length) {
        throw new AppError(AVAILABILITY_NOT_FOUND, 400);
    }

    const linkId = uuidv4();

    const bookingLink = await BookingLinkModel.create({
        userId,
        linkId,
        availabilityIds: availability.map(a => a._id)
    });

    return bookingLink;
};