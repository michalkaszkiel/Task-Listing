import { StatusCodes } from "http-status-codes";
import Task from "../models/tasks.js";

export const UpdateRating = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            { _id: id },
            { $set: { rating: req.body.rating } },
            { new: true }
        );

        // Send the updated task as a JSON response
        return res.status(StatusCodes.OK).json({ updatedTask });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error happened", error: error.toString() });
    }
};
