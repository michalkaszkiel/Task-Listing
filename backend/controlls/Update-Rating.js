import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export const UpdateRating = async (req, res) => {
    const { id } = req.params;
    const { priority } = req.body;
    const { userName } = req.user;
    try {
        const updatedTask = await User.findOneAndUpdate(
            { userName: userName, "tasks._id": id },
            {
                $set: {
                    "tasks.$.priority": priority,
                },
            },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
            });
        }
        // Send the updated task as a JSON response
        return res.status(StatusCodes.OK).json({ updatedTask });
    } catch (error) {
        console.error("Error updating rating:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
