import { Types } from "mongoose";
import { UserModel, AvailabilityModel, BookingModel } from "../database/model";
import { AppError } from "../utils/appError";
import { BookingLinkModel } from "../database/model";

// -------------------------------------------------------------

export const addAvailabilityService = async ({
    userId,
    slots,
}: {
    userId: Types.ObjectId;
    slots: { startTime: Date; endTime: Date }[];
}) => {
    const userExists = await UserModel.findById(userId);

    if (!userExists) throw new AppError("User not found", 404);

    for (const slot of slots) {
        const exists = await AvailabilityModel.findOne({
            userId,
            startTime: { $lt: slot.endTime },
            endTime: { $gt: slot.startTime },
        });

        if (exists) {
            throw new AppError(
                "This slot is already booked or overlaps with an existing slot",
                400
            );
        }
    }

    const formattedSlots = slots.map((slot) => ({
        userId,
        startTime: slot.startTime,
        endTime: slot.endTime,
    }));

    const availability = await AvailabilityModel.insertMany(formattedSlots);

    return availability;
};

export const getAvailabilityService = async (linkId: string) => {
    const link = await BookingLinkModel.findOne({ linkId });

    if (!link) throw new Error("Invalid link");

    const user = await UserModel.findById(link.userId).lean();

    const availability = await AvailabilityModel.aggregate([
        {
            $match: {
                _id: { $in: link.availabilityIds },
                isDeleted: false,
            }
        },

        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$startTime"
                    }
                },
                slots: { $push: "$$ROOT" }
            }
        },

        {
            $sort: { _id: 1 }
        }
    ]);

    const booked = await BookingModel.find({
        availabilityId: { $in: link.availabilityIds }
    }).select("availabilityId");

    const bookedSet = new Set(
        booked.map(b => b.availabilityId.toString())
    );

    const filtered = availability.map(group => {
        return {
            ...group,
            slots: group.slots.filter((slot: any) => !bookedSet.has(slot._id.toString())
            )
        };
    });

    const finalData = filtered.filter(group => group.slots.length > 0);

    return {
        user,
        availability: finalData
    };
};

