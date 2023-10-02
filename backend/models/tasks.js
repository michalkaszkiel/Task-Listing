import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Set the type to Date and default to Date.now
    deadLine: { type: Number, default: 0 },
    priority: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
