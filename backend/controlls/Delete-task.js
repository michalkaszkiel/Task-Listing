import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export const DeleteTask = async (req, res) => {
    try {
        const { userName } = req.user;
        const { id } = req.params;

        const findUser = await User.findOneAndUpdate(
            { userName: userName },
            {
                $pull: {
                    tasks: { _id: id },
                },
            },
            { new: true }
        );
        if (!findUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
            });
        }

        console.log(userName);
        return res.status(StatusCodes.OK).json({ message: "Task deleted" });
    } catch (error) {
        console.error("Error delete item:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
