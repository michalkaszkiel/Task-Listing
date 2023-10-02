import express from "express";
import { CreateTask } from "../controlls/Create-Task.js";
import { GetItems } from "../controlls/Get-Items.js";
import { DeleteTask } from "../controlls/handleDelete.js";
import { UpdateRating } from "../controlls/Update-Rating.js";
import { UpdateCompleted } from "../controlls/Update-Completed.js";
const router = express.Router();

router.get("/get-items", GetItems);
router.post("/create-task", CreateTask);
router.patch("/update-rating/:id", UpdateRating);
router.patch("/update-completed/:id", UpdateCompleted);
router.delete("/delete-task/:id", DeleteTask);
export default router;
