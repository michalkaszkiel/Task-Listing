import { StatusCodes } from "http-status-codes";
// import Task from "../models/tasks.js";
import { User } from "../models/User.js";

export const GetItems = async (req, res) => {
    try {
        // Extract the user's username from req.user
        const { userName } = req.user;

        // Find the user in the database by their username
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
            });
        }

        // Access the user's tasks (assuming tasks is an array property in your User model)
        const userTasks = user.tasks;

        // Respond with the user's tasks
        res.status(StatusCodes.OK).json({
            message: "User tasks retrieved successfully",
            tasks: userTasks,
        });
    } catch (error) {
        // Handle errors (e.g., token validation errors)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while retrieving user tasks.",
            error: error.message,
        });
    }
};
