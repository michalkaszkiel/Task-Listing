import express from "express";
import { CreateTask } from "../controlls/Create-Task.js";
import { GetItems } from "../controlls/Get-Items.js";
import { UpdateRating } from "../controlls/Update-Rating.js";
import { UpdateCompleted } from "../controlls/Update-Completed.js";
import { UpdateTime } from "../controlls/Update-Time.js";
import {
    createUser,
    loginUser,
    logOutUser,
} from "../controlls/User-Controller.js";
import { deleteTask } from "../controlls/deletetask.js";
import {
    authenticateUser,
    validateFullUserRules,
    validator,
} from "../middleware/validator.js";

const router = express.Router();
router.post("/create-user", validator, validateFullUserRules, createUser);
router.post("/logout", logOutUser);
router.post("/login", loginUser);
router.use(authenticateUser);
router.get("/get-items", GetItems);
router.post("/create-task", CreateTask);
router.patch("/update-rating/:id", UpdateRating);
router.patch("/update-completed/:id", UpdateCompleted);
router.delete("/delete/:id", deleteTask);
router.patch("/update-time/:id", UpdateTime);
export default router;
