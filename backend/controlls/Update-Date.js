// import { StatusCodes } from "http-status-codes";
// import Task from "../models/tasks.js";
// export const UpdateDate = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { date } = req.body;
//         const updatedTask = await Task.findByIdAndUpdate(
//             id,
//             { date },
//             { new: true }
//         );
//     } catch (error) {
//         return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json({ message: "Error happened", error: error.toString() });
//     }
// };
