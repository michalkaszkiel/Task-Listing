import { Schema, model } from "mongoose";
import { TaskSchema } from "../models/tasks.js";
const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    tasks: [TaskSchema],
});

export const User = model("User", userSchema);
