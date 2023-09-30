import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    deadLine: { type: Number, default: 0 },
    priority: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
});
const Task = model("Task", TaskSchema);
export default Task;
