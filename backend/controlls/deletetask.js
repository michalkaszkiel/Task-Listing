import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName } = req.user;
        const updatedUser = await User.findOneAndUpdate(
            {
                userName: userName,
            },
            {
                $pull: {
                    tasks: { _id: id },
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User or task not found.",
            });
        }

        // Task deleted successfully, return a 200 status
        return res.status(StatusCodes.OK).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
        });
    }
};
