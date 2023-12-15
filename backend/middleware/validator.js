import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export const validateFullUserRules = [
    body("email")
        .trim()
        .normalizeEmail({ gmail_remove_subaddress: true })
        .isEmail()
        .custom(async (value) => {
            console.log("the value is ", value);
            //either user document if not exists null
            const existingUser = await User.findOne({ email: value });

            if (existingUser) {
                throw new Error(
                    "A user already exists with this email address"
                );
            }
        }),
    body("password")
        .isStrongPassword()
        .withMessage(
            "Password needs to contain at least 8 characters, minimum one lower case character, minimum one uppercase character, minimum one number and minimum one symbol."
        ),
    body("userName")
        .trim()
        .isAlpha()
        .withMessage("Username must contain only alphabetical characters"),
];

/**
 * Middleware that catches our errors
 * @returns
 */
export const validator = (req, res, next) => {
    //extract the validation errors from the request object
    const errors = validationResult(req);
    //if there are errors
    if (!errors.isEmpty()) {
        //response code 400
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    next();
};
export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`token: ${token}, decoded token: ${decodedToken}`);
        // Fetch the user from the database based on the decoded user information
        const user = await User.findOne({ userName: decodedToken.name });
        console.log(`user: ${user}`);
        if (!user) {
            // User not found in the database
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Auth failed" });
        }
        // Attach the user object to the request for further use in route handlers
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Auth failed" });
    }
};
