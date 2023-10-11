import { User } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
// import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({
        $or: [{ userName: req.body.userName }, { email: req.body.email }],
    });

    if (existingUser) {
        // Determine whether it's a duplicate email or username
        if (existingUser.userName === req.body.userName) {
            // Duplicate username
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Username already exists",
            });
        } else {
            // Duplicate email
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email already exists",
            });
        }
    }

    // If no existing user, proceed with user creation
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
        // Handle other errors by sending an error response
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
                .json({ message: "Combination email/password does not exist" });
        }
        // if exists, compare the password of the user with our hash in the database
        const checkPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (checkPassword) {
            // passwords are matching
            // Create a JSON Web Token (JWT)
            const rememberMe = req.body.rememberMe ? "30d" : "3m";
            const token = jwt.sign({ name: user.userName }, "verySecret", {
                expiresIn: rememberMe,
            });

            // Store the token in both cookies and local storage
            res.status(StatusCodes.OK)
                .cookie("jwtToken", token, { httpOnly: true, secure: true })
                .json({ token });

            // Store the token in local storage as well
            localStorage.setItem("jwtToken", token);
        } else {
            // passwords are not matching
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Combination email/password does not exist" });
        }
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "General error", error: error.toString() });
    }
};

export const logOutUser = (req, res) => {
    try {
        res.status(StatusCodes.OK).json({ message: "Logged out" });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err });
    }
};
