import { User } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
// import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    try {
        const newUser = await User.create({
            userName: req.body.userName,
            password: hashedPassword,
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
export const loginUser = async (req, res) => {
    try {
        // check if the email address doesn't exist
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // user with that email address doesn't exist
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Combination email password does not exist" });
        }
        // if exists, compare the password of the user with our hash in the database
        const checkPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (checkPassword) {
            // passwords are matching
            // Create a JSON Web Token (JWT)
            const token = jwt.sign({ name: user.userName }, "verySecret", {
                expiresIn: "1h",
            });

            // Send the token as part of the response
            res.status(StatusCodes.OK).json({
                message: "Login successful",
                token, // Include the token in the response
            });
        } else {
            // passwords are not matching
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Combination email password does not exist" });
        }
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "General error", error: error.toString() });
    }
};
