import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/router.js";
import { __dirname } from "./global.js"; // Import __dirname from global.js
import path from "path"; // Import path module

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());
app.use("/api/task-list", router);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Database connection successful 🤠");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

// Serve static files from the 'build' directory
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
