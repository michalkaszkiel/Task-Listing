import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";
import { __dirname } from "./global.js"; // Import __dirname from global.js
import path from "path"; // Import path module

const app = express();
dotenv.config();
app.use(cookieParser());
const port = process.env.PORT || 10000;

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
    })
    .catch((error) => {
        console.log(error.message);
        console.log("🤨");
    });
// Serve static files from the 'build' directory
const corsOptions = {
    origin: "*",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE"],
    credentials: true, //allow cookies to be sent with requests
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/task-list", router);
app.use(express.static(path.join(__dirname, "build")));

// Handle all routes and serve the index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Handle invalid paths with a 500 status
app.all("*", (req, res) => {
    res.status(500).send("Invalid path");
});

app.listen(port, () => {
    console.log(`The server is listening 🐒 on port ${port}`);
});
app.get("/check", (req, res) => {
    res.send("Server is awake!");
});
