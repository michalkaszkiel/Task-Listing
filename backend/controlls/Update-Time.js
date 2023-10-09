import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export const UpdateTime = async (req, res) => {
    const { id } = req.params;
    const { time } = req.body;
    const { userName } = req.user;

    try {
        // Find the user and update the time of the specified task
        const findUser = await User.findOneAndUpdate(
            { userName: userName, "tasks._id": id },
            {
                $set: {
                    "tasks.$.time": time,
                },
            },
            { new: true }
        );

        if (!findUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
            });
        }

        // Successfully updated the time
        return res.status(StatusCodes.OK).json({
            message: "Time updated successfully.",
        });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error happened", error: error.toString() });
    }
};
