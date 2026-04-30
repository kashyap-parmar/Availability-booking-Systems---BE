import { Types } from "mongoose";
import { UserModel, AvailabilityModel, BookingModel } from "../database/model";
import { AppError } from "../utils/appError";
import { BookingLinkModel } from "../database/model";

// -------------------------------------------------------------

export const addAvailabilityService = async ({
    userId,
    startTime,
    endTime
}: {
    userId: Types.ObjectId;
    startTime: Date;
    endTime: Date;
}) => {
    const userExists = await UserModel.findById(userId);

    if (!userExists) throw new AppError("User not found", 404);

    const exists = await AvailabilityModel.findOne({
        userId,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
    });

    if (exists) {
        throw new Error("Time slot already exists or overlaps");
    }

    const availability = await AvailabilityModel.create({
        userId,
        startTime,
        endTime
    });

    return availability;
};

export const getAvailabilityService = async (linkId: string) => {
    const link = await BookingLinkModel.findOne({ linkId });

    if (!link) throw new Error("Invalid link");

    const user = await UserModel.findById(link.userId).lean();

    const availability = await AvailabilityModel.find({
        _id: { $in: link.availabilityIds },
        isDeleted: false
    }).lean();

    const booked = await BookingModel.find({
        availabilityId: { $in: link.availabilityIds }
    }).select("availabilityId");

    const bookedIds = booked.map(b => b.availabilityId.toString());

    const availableSlots = availability.filter(
        slot => !bookedIds.includes(slot._id.toString())
    );

    return {
        user,
        availability: availableSlots
    };
};

