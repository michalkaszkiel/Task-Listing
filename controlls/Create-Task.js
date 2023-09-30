import Task from "../models/tasks.js";
import { StatusCodes } from "http-status-codes";

export const CreateTask = async (req, res) => {
    const { name, date, deadLine, priority, completed } = req.body;
    try {
        const newTask = await Task.create({
            name,
            date,
            deadLine,
            priority,
            completed,
        });
        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Task created", newTask });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error happened", error: error.toString() });
    }
};
