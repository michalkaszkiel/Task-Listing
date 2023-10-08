import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export const UpdateCompleted = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const { userName } = req.user;
    try {
        console.log("userName:", userName);
        console.log("taskId:", id);
        const findUser = await User.findOneAndUpdate(
            { userName: userName, "tasks._id": id },
            {
                $set: {
                    "tasks.$.completed": completed,
                },
            },
            { new: true }
        );
        if (!findUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
            });
        }
        return res.status(StatusCodes.OK).json({ message: "Task updated" });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error happened", error: error.toString() });
    }
};
