import express from "express";
import { CreateTask } from "../controlls/Create-Task.js";
const router = express.Router();

router.get("/create-task", CreateTask);

export default router;
