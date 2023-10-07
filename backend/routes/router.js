import express from "express";
import { CreateTask } from "../controlls/Create-Task.js";
// import { GetItems } from "../controlls/Get-Items.js";
// import { DeleteTask } from "../controlls/handleDelete.js";
// import { UpdateRating } from "../controlls/Update-Rating.js";
// import { UpdateCompleted } from "../controlls/Update-Completed.js";
import { createUser, loginUser } from "../controlls/User-Controller.js";

import { validateFullUserRules, validator } from "../middleware/validator.js";
const router = express.Router();

// router.get("/get-items", GetItems);
router.post("/create-user", validator, validateFullUserRules, createUser);
router.patch("/create-task/:id", CreateTask);
router.post("/login", loginUser);
// router.patch("/update-rating/:id", UpdateRating);
// router.patch("/update-completed/:id", UpdateCompleted);
// router.delete("/delete-task/:id", DeleteTask);
export default router;
