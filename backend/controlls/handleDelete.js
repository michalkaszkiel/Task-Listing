// import { StatusCodes } from "http-status-codes";
// import Task from "../models/tasks.js";
// export const DeleteTask = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Task.findByIdAndDelete(id);
//         return res.status(StatusCodes.OK).json({ message: "Task deleted" });
//     } catch (error) {
//         return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json({ message: "Error happened", error: error.toString() });
//     }
// };
