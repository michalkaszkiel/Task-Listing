import { User } from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const CreateTask = async (req, res) => {
    try {
        const { userName } = req.user;
        const newTask = await User.findOneAndUpdate(
            { userName: userName },
            {
                $push: {
                    tasks: {
                        name: req.body.name,
                        date: req.body.date,
                        deadLine: req.body.deadLine,
                        priority: req.body.priority,
                        completed: req.body.completed,
                    },
                },
            },
            { new: true }
        );
        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Task created", newTask });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error happened", error: error.toString() });
    }
};
