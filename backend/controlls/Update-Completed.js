import { StatusCodes } from "http-status-codes";
import Task from "../models/tasks.js";
export const UpdateCompleted = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );
        return res.status(StatusCodes.OK).json({ updatedTask });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error happened", error: error.toString() });
    }
};
