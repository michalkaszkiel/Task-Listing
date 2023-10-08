import express from "express";
import { CreateTask } from "../controlls/Create-Task.js";
import { GetItems } from "../controlls/Get-Items.js";
import { UpdateRating } from "../controlls/Update-Rating.js";
import { UpdateCompleted } from "../controlls/Update-Completed.js";
import { createUser, loginUser } from "../controlls/User-Controller.js";
import { DeleteTask } from "../controlls/Delete-task.js";
import {
    authenticateUser,
    validateFullUserRules,
    validator,
} from "../middleware/validator.js";

const router = express.Router();

router.get("/get-items", authenticateUser, GetItems);
router.post("/create-user", validator, validateFullUserRules, createUser);
router.post("/create-task", authenticateUser, CreateTask);
router.post("/login", loginUser);
router.patch("/update-rating/:id", authenticateUser, UpdateRating);
router.patch("/update-completed/:id", authenticateUser, UpdateCompleted);
router.patch("/delete-task/:id", authenticateUser, DeleteTask);
export default router;
