import { User } from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email,
            tasks: req.body.tasks,
        });

        // Send a success response with the newly created user
        res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            newUser,
        });
    } catch (error) {
        // Handle errors by sending an error response
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create user",
            error: error.message, // Include the error message for debugging
        });
    }
};
