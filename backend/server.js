import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 10000;
const corsOptions = {
    origin: "*", //allow all origins * = wildcard
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE"],
    credentials: true, //allow cookies to be sent with requests
};
app.use(cors(corsOptions));

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Database connected! 😃");
        app.listen(port, () => {
            console.log(`🥦The server is listening on port ${port}🥦`);
        });
    })
    .catch((error) => {
        console.log(error.message);
        console.log("🤨");
    });

app.get("/check", (req, res) => {
    res.send("Server is awake!");
});
app.use("/api/task-list", router);
